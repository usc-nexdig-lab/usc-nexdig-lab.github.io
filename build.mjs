#!/usr/bin/env node
/* NEXDIG Lab static site generator.
 *
 * Uses ONLY Node built-ins -- there is no package.json and no lockfile, so
 * Dependabot's npm ecosystem has nothing to scan. Run with:
 *
 *   node build.mjs            build into _site/
 *   node build.mjs --serve    build, serve on :8000, rebuild on change
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, rmSync, renameSync, copyFileSync, existsSync, watch } from "node:fs";
import { join, dirname, extname } from "node:path";
import { createServer } from "node:http";

const OUT = "_site";
/* Written to during a build, then swapped into place. Two builds running at once
   -- e.g. a manual `node build.mjs` while `--serve` is watching -- would
   otherwise have one rmSync the output directory while the other was mid-copy. */
const TMP = `_site.tmp-${process.pid}`;
const DATA = "data";
const STATIC = "static";
/* Transitional: the photo directories still live under public/ because the CRA
   app also serves them. Phase 7 moves them to static/ and this list goes away. */
const PUBLIC_PASSTHROUGH = ["people_photos", "projects_photos", "team_photos", "assets", "admin", "nexdig_logo_small.jpg", "robots.txt", "manifest.json"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ------------------------------------------------------------------- load */

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    // JSON.parse errors do not name the file; without this the error is useless.
    throw new Error(`${path}: ${e.message}`);
  }
}

const readDir = (dir, ext = ".json") =>
  existsSync(join(DATA, dir))
    ? readdirSync(join(DATA, dir))
        .filter((f) => f.endsWith(ext) && !f.startsWith("_") && !f.startsWith("."))
        .map((f) => ({ file: f, slug: f.slice(0, -ext.length), ...readJson(join(DATA, dir, f)) }))
    : [];

/* --------------------------------------------------------------- validate */

const errors = [];
const need = (cond, file, msg) => { if (!cond) errors.push(`${file}: ${msg}`); };

/* ---------------------------------------------------------------- derive */

/** Bold lab members in an author list, matched against the People roster. */
function boldAuthors(authors, roster) {
  const norm = (s) => s.toLowerCase().replace(/[*†‡]+$/, "").trim();
  return authors
    .map((a) => {
      const isMember = roster.has(norm(a));
      const safe = a.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
      return isMember ? `<b>${safe}</b>` : safe;
    })
    .join(", ");
}

function load() {
  const site = readJson(join(DATA, "site.json"));
  const homepage = readJson(join(DATA, "homepage.json"));
  const people = readDir("people").sort(
    (a, b) => ["faculty", "phd", "masters", "alumni"].indexOf(a.group) - ["faculty", "phd", "masters", "alumni"].indexOf(b.group) || (a.order ?? 99) - (b.order ?? 99)
  );
  const news = readDir("news")
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((n) => {
      const [y, m, d] = n.date.split("-").map(Number);
      return { ...n, displayDate: `${MONTHS[m - 1]} ${d}, ${y}` };
    });
  const publications = readDir("publications").sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const projects = readDir("projects").sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  /* roster for author bolding: names + aliases */
  const roster = new Set();
  for (const p of people) {
    roster.add(p.name.toLowerCase().trim());
    for (const a of p.aliases ?? []) roster.add(a.toLowerCase().trim());
  }
  const byName = new Map(people.map((p) => [p.name, p]));

  /* validation + derivation */
  for (const p of people) {
    need(p.name, p.file, "missing name");
    need(["faculty", "phd", "masters", "alumni"].includes(p.group), p.file, `bad group ${JSON.stringify(p.group)}`);
    if (p.photo) need(existsSync(join("public/people_photos", p.photo)), p.file, `photo not found: ${p.photo}`);
  }
  for (const n of news) need(/^\d{4}-\d{2}-\d{2}$/.test(n.date), n.file, `date must be YYYY-MM-DD, got ${n.date}`);
  for (const p of publications) {
    need(p.title, p.file, "missing title");
    need(Array.isArray(p.authors) && p.authors.length, p.file, "missing authors");
    p.authorsHtml = boldAuthors(p.authors ?? [], roster);
    // Warn on a near-miss surname: catches the typo that silently un-bolds someone.
    for (const a of p.authors ?? []) {
      const last = a.toLowerCase().replace(/[*†‡]+$/, "").trim().split(/\s+/).pop();
      const hit = [...roster].some((r) => r.split(/\s+/).pop() === last);
      if (hit && !roster.has(a.toLowerCase().replace(/[*†‡]+$/, "").trim()))
        console.warn(`  warn  ${p.file}: "${a}" shares a surname with a lab member but did not match -- typo?`);
    }
  }
  /* Short venue name for the research-page meta line: the text inside the last
     parentheses, e.g. "...Very Large Data Bases (Demo@VLDB)" -> "Demo@VLDB". */
  for (const p of publications) {
    const m = String(p.venue ?? "").match(/\(([^)]+)\)\s*$/);
    p.venueShort = m ? m[1] : p.venue;
    // Plain-text citation, e.g. "A. One, B. Two. Title. Venue, 2025."
    // Trailing equal-contribution markers are dropped -- they mean nothing
    // outside the paper's own author list.
    const authors = (p.authors ?? []).map((a) => a.replace(/[*†‡]+$/, "").trim());
    p.citation = `${authors.join(", ")}. ${p.title}. ${p.venue}, ${p.year}.`;
  }

  const knownProjects = new Set(projects.map((p) => p.id));
  for (const pub of publications)
    for (const id of pub.projects ?? [])
      need(knownProjects.has(id), pub.file, `references unknown project "${id}"`);

  for (const p of projects) {
    need(p.id === p.slug, p.file, `id "${p.id}" must equal the filename "${p.slug}"`);
    need(p.cardImage, p.file, "missing cardImage");
    need(p.hook, p.file, "missing hook (the one-sentence plain-language summary)");
    // Publications already sort newest-first, so this list inherits that order.
    p.resolvedPublications = publications.filter((pub) => (pub.projects ?? []).includes(p.id));
    // Distinct venues, newest first: "VLDB 2025", "Demo@VLDB 2025", ...
    const seen = new Set();
    p.venues = p.resolvedPublications
      .map((pub) => `${pub.venueShort} ${pub.year}`)
      .filter((v) => !seen.has(v) && seen.add(v));
    for (const h of p.highlights ?? [])
      need(h.value && h.label, p.file, "each highlight needs both a value and a label");
    p.resolvedMembers = (p.members ?? []).map((name) => {
      const m = byName.get(name);
      if (!m) errors.push(`${p.file}: member "${name}" is not in data/people/`);
      return m;
    }).filter(Boolean);
    for (const s of p.sections ?? []) need(typeof s.body === "string", p.file, `section "${s.title}" needs a body`);
  }

  for (const f of ["tagline", "mission", "intro", "cta"])
    need(homepage[f], "homepage.json", `missing "${f}"`);
  need(Array.isArray(homepage.photos) && homepage.photos.length, "homepage.json", "needs at least one photo");
  for (const c of [...(homepage.photos ?? []), homepage.heroPhoto].filter(Boolean))
    need(existsSync(join("public", c.src.replace(/^\//, ""))), "homepage.json", `photo not found: ${c.src}`);

  if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
  }
  const years = publications.map((p) => Number(p.year)).filter(Boolean);
  const stats = [
    { value: String(publications.length), label: "publications" },
    { value: String(people.filter((p) => p.group !== "alumni").length), label: "lab members" },
    { value: String(projects.filter((p) => p.status === "current").length), label: "research areas" },
    { value: String(new Set(publications.map((p) => p.venueShort)).size), label: "venues" },
  ];
  if (years.length) stats.push({ value: `since ${Math.min(...years)}`, label: "publishing" });

  return { site, homepage, people, news, publications, projects, stats };
}

/* ---------------------------------------------------------------- render */

const write = (rel, html) => {
  const p = join(TMP, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, `<!-- GENERATED by build.mjs from data/ -- DO NOT EDIT -->\n${html}`);
};

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const e of readdirSync(src, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue; // also skips .DS_Store
    const s = join(src, e.name), d = join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : copyFileSync(s, d);
  }
}

async function build() {
  const { layout } = await import("./templates/layout.mjs?" + Date.now());
  const P = await import("./templates/pages.mjs?" + Date.now());
  const data = load();
  const { site } = data;

  /* Inline the icon sprite into every page and read each symbol's viewBox from
     it, so the sprite file stays the single source of truth for both. */
  const spriteSrc = readFileSync(join(STATIC, "icons.svg"), "utf8");
  const viewBoxes = Object.fromEntries(
    [...spriteSrc.matchAll(/<symbol id="([^"]+)" viewBox="([^"]+)"/g)].map((m) => [m[1], m[2]])
  );
  const sprite = spriteSrc.trim().split("\n").map((l) => "    " + l.trim()).join("\n");
  for (const item of site.nav)
    if (item.icon && !viewBoxes[item.icon])
      errors.push(`site.json: nav item "${item.label}" uses icon "${item.icon}", which is not in static/icons.svg`);
  if (errors.length) {
    console.error(`\n${errors.length} error(s):`);
    for (const e of errors) console.error("  " + e);
    process.exit(1);
  }

  rmSync(TMP, { recursive: true, force: true });
  mkdirSync(TMP, { recursive: true });

  const page = (rel, key, title, description, body, wide = false) =>
    write(rel, layout({ site, pageKey: key, title, description, body, viewBoxes, sprite, wide }));

  page("index.html", "home", "NEXDIG Lab", "Next-generation Data-Intensive Systems Group at USC, led by Ibrahim Sabek.", P.home(data), true);
  page("people/index.html", "people", "People — NEXDIG Lab", "Faculty, students and alumni of the NEXDIG Lab at USC.", P.people(data));
  page("research/index.html", "research", "Research — NEXDIG Lab", "Research projects on learned query optimization, quantum databases, secure data systems and LLM agents.", P.research(data));
  page("publications/index.html", "publications", "Publications — NEXDIG Lab", "Papers published by the NEXDIG Lab at USC.", P.publications(data));
  page("opportunities/index.html", "opportunities", "Opportunities — NEXDIG Lab", "Join the NEXDIG Lab at USC.", P.opportunities(data));
  page("404.html", "none", "Page not found — NEXDIG Lab", "Page not found.", P.notFound());

  for (const p of data.projects)
    page(`project/${p.id}/index.html`, "research", `${p.title} — NEXDIG Lab`, p.cardSummary ?? p.title, P.project({ project: p }));

  /* static assets */
  copyDir(STATIC, TMP);
  for (const item of PUBLIC_PASSTHROUGH) {
    const src = join("public", item);
    if (!existsSync(src)) continue;
    const dest = join(TMP, item);
    if (readdirSync("public", { withFileTypes: true }).find((e) => e.name === item)?.isDirectory()) copyDir(src, dest);
    else copyFileSync(src, dest);
  }
  writeFileSync(join(TMP, "CNAME"), "nexdig.usc.edu\n");
  writeFileSync(join(TMP, ".nojekyll"), "");

  // Swap into place. The window where _site does not exist is now microseconds.
  rmSync(OUT, { recursive: true, force: true });
  renameSync(TMP, OUT);

  const pages = 6 + data.projects.length;
  console.log(`built ${pages} pages -> ${OUT}/  (${data.publications.length} publications, ${data.people.length} people, ${data.news.length} news, ${data.projects.length} projects)`);
}

/* ----------------------------------------------------------------- serve */

const MIME = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".json": "application/json", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".yml": "text/yaml", ".ico": "image/x-icon" };

async function serve() {
  await build();
  let timer;
  for (const dir of [DATA, STATIC, "templates", "lib"])
    if (existsSync(dir))
      watch(dir, { recursive: true }, () => {
        clearTimeout(timer);
        timer = setTimeout(() => build().catch((e) => console.error(e.message)), 100);
      });

  const server = createServer((req, res) => {
    // A rebuild wipes _site/, so a request arriving mid-rebuild can hit a file
    // that briefly does not exist. Never let that take the dev server down.
    try {
      const p = decodeURIComponent(req.url.split("?")[0]);
      // Reproduce GitHub Pages: /people -> 301 /people/ -> people/index.html.
      // Only redirect when the directory exists; otherwise 404, as Pages does.
      if (!extname(p) && !p.endsWith("/") && existsSync(join(OUT, p, "index.html"))) {
        res.writeHead(301, { Location: p + "/" });
        return res.end();
      }
      const f = join(OUT, p.endsWith("/") ? p + "index.html" : p);
      if (existsSync(f)) {
        res.writeHead(200, { "Content-Type": MIME[extname(f)] ?? "application/octet-stream" });
        return res.end(readFileSync(f));
      }
      const notFound = join(OUT, "404.html");
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(existsSync(notFound) ? readFileSync(notFound) : "<h1>404</h1>");
    } catch (e) {
      res.writeHead(503, { "Content-Type": "text/plain" });
      res.end("rebuilding, refresh in a moment\n");
    }
  });

  const portArg = process.argv.indexOf("--port");
  const port = portArg > -1 ? Number(process.argv[portArg + 1]) : 8000;

  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error(
        `\nPort ${port} is already in use -- another preview server is probably still running.\n` +
          `  Reuse it:  open http://localhost:${port}\n` +
          `  Or stop it: lsof -ti:${port} | xargs kill\n` +
          `  Or pick another port: node build.mjs --serve --port 8001\n`
      );
      process.exit(1);
    }
    throw e;
  });

  server.listen(port, () => console.log(`serving http://localhost:${port}  (watching for changes)`));
}

const [major] = process.versions.node.split(".").map(Number);
if (major < 18) {
  console.error(`This site needs Node 18 or newer. You have ${process.versions.node}. Download from nodejs.org.`);
  process.exit(1);
}

(process.argv.includes("--serve") ? serve() : build()).catch((e) => {
  rmSync(TMP, { recursive: true, force: true });
  console.error(e.message);
  process.exit(1);
});
