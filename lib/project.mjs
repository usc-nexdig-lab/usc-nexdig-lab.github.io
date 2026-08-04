/* What a half-filled project looks like.
 *
 * Every project field except the slug is optional in the CMS, so an editor can
 * save a project with nothing but an id and fill it in over the following week.
 * This decides what the missing pieces become -- which title stands in, which
 * half-typed list rows are dropped rather than rendered as empty buttons.
 *
 * It lives here, in browser-safe code with no Node imports, because two callers
 * need the same answer: build.mjs when it renders the site, and the CMS preview
 * pane, which runs the site's own templates in the browser. If the preview
 * called its own version of this, the preview would drift from the page.
 */

/** Fill in what an editor left empty. Returns a copy; never mutates the input. */
export function normalizeProject(p = {}) {
  const out = { ...p };

  // Anything that is not explicitly past is current: a project saved before the
  // status was picked still belongs on the Research page.
  out.status = out.status === "past" ? "past" : "current";

  out.title = out.title || out.cardTitle || out.id || "Untitled project";
  out.cardTitle = out.cardTitle || out.title;

  // A row an editor started and abandoned is dropped, not rendered empty.
  out.artifacts = (out.artifacts ?? []).filter((a) => a?.url);
  out.highlights = (out.highlights ?? []).filter((h) => h?.value || h?.label);
  out.sections = (out.sections ?? []).filter((s) => s?.title || s?.body);
  out.citations = (out.citations ?? []).filter((c) => c?.title || c?.bibtex);

  return out;
}
