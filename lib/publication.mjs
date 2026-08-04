/* Everything a publication record needs before a template can render it.
 *
 * Lives here rather than in build.mjs so the CMS preview can derive the same
 * fields the build does -- otherwise the preview shows no bolded lab members
 * and no short venue, and an editor is looking at something the site will not
 * produce. Same reason lib/project.mjs and lib/people.mjs exist.
 */

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** Trailing equal-contribution markers are not part of the name. */
const normName = (s) => String(s ?? "").toLowerCase().replace(/[*†‡]+$/, "").trim();

/**
 * Build the lookup used to decide which authors are lab members.
 * Accepts the people records; returns a Set of normalised names and aliases.
 */
export function authorRoster(people = []) {
  const roster = new Set();
  for (const p of people) {
    if (p?.name) roster.add(normName(p.name));
    for (const alias of p?.aliases ?? []) roster.add(normName(alias));
  }
  return roster;
}

/** Wrap lab members in <b>. Everything is escaped -- this returns HTML. */
export function boldAuthors(authors = [], roster = new Set()) {
  return authors
    .map((a) => (roster.has(normName(a)) ? `<b>${esc(a)}</b>` : esc(a)))
    .join(", ");
}

/**
 * The short venue name: whatever is in the last parentheses, so
 * "...Very Large Data Bases (Demo@VLDB)" becomes "Demo@VLDB".
 */
export function shortVenue(venue) {
  const m = String(venue ?? "").match(/\(([^)]+)\)\s*$/);
  return m ? m[1] : String(venue ?? "");
}

/** Add the fields templates expect. Safe to call on a half-filled draft. */
export function normalizePublication(p = {}, roster = new Set()) {
  return {
    ...p,
    links: (p.links ?? []).filter((l) => l && l.label && l.url),
    authorsHtml: boldAuthors(p.authors ?? [], roster),
    venueShort: shortVenue(p.venue),
  };
}
