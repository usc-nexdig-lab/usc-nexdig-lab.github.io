#!/usr/bin/env node
/* Render every template against incomplete drafts.
 *
 *   node tools/check-previews.mjs
 *
 * The CMS preview pane calls the site's own templates with whatever is in the
 * editor at that moment: a brand-new entry with no fields set, a URL half typed,
 * a cleared section. The build only ever sees finished content, so a template
 * that assumes a field exists looks fine until someone opens the CMS -- or until
 * they clear that field and the next deploy fails.
 *
 * This caught exactly that: templates/pages.mjs read h.cta.heading directly, so
 * clearing the join-us box in the CMS would have taken the build down.
 *
 * Exits 1 if any render throws.
 */

import { readFileSync } from "node:fs";

import { home, publications, news, project, person } from "../templates/pages.mjs";
import { normalizeHomepage } from "../lib/homepage.mjs";
import { normalizePublication } from "../lib/publication.mjs";
import { normalizeNews } from "../lib/news.mjs";
import { normalizeProject } from "../lib/project.mjs";

const J = (p) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), "utf8"));
const NO_ROSTER = new Set();

const cases = [
  // A brand-new entry, the instant it is created.
  ["empty  homepage", () => home({ homepage: normalizeHomepage({}), news: [], publications: [] })],
  ["empty  publication", () => publications({ publications: [normalizePublication({}, NO_ROSTER)] })],
  ["empty  news", () => news({ news: [normalizeNews({})] })],
  ["empty  project", () => project({ project: normalizeProject({}) })],
  ["empty  person", () => person({})],

  // Half-filled, as it looks between keystrokes.
  ["partial homepage, cleared cta", () =>
    home({ homepage: normalizeHomepage({ tagline: "T", intro: "i", cta: { heading: "H" } }), news: [], publications: [] })],
  ["partial homepage, one photo", () =>
    home({ homepage: normalizeHomepage({ tagline: "T", intro: "i", photos: [{ src: "/team_photos/x.jpg" }] }), news: [], publications: [] })],
  ["partial news, bad date + open link", () =>
    news({ news: [normalizeNews({ date: "2026-0", text: "hi [x](http" })] })],
  ["partial publication, link with no url", () =>
    publications({ publications: [normalizePublication({ title: "T", authors: ["A"], links: [{ label: "Paper" }] }, NO_ROSTER)] })],
  ["partial project, section with no body", () =>
    project({ project: normalizeProject({ id: "x", sections: [{ title: "S" }] }) })],

  // Real content, as a regression check on the same path.
  ["real   homepage", () => home({ homepage: normalizeHomepage(J("data/homepage.json")), news: [], publications: [] })],
  ["real   publication", () => publications({ publications: [normalizePublication(J("data/publications/2025-vldb-limao.json"), NO_ROSTER)] })],
  ["real   project", () => project({ project: normalizeProject(J("data/projects/limao.json")) })],
];

let failed = 0;
for (const [name, run] of cases) {
  try {
    const out = run();
    if (typeof out !== "string") throw new Error(`returned ${typeof out}, expected a string`);
    console.log(`  ok    ${name}`);
  } catch (e) {
    console.log(`  FAIL  ${name} -- ${e.message}`);
    failed += 1;
  }
}

console.log(
  failed
    ? `\n${failed} of ${cases.length} template renders failed.`
    : `\nAll ${cases.length} template renders survive incomplete drafts.`
);
process.exit(failed ? 1 : 0);
