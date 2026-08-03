/* HTML escaping and micro-markdown.
 *
 * Rule for templates: every ${} interpolation must wrap its value in exactly one
 * of esc / attr / url / md / mdInline / raw. `raw` is the identity function and
 * exists only so that `grep -rn 'raw(' templates/` is a complete audit of every
 * unescaped surface on the site.
 */

const ENTITIES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape text for insertion into an element body. Default for all text. */
export const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** Escape text for insertion into an attribute value. */
export const attr = esc;

/** Identity. Exists to be greppable — never add logic here. */
export const raw = (s) => String(s ?? "");

/**
 * Validate a URL before emitting it into href/src. Students paste links from
 * browsers and from chat, so reject anything that is not an ordinary link.
 */
export function url(s) {
  const v = String(s ?? "").trim();
  if (!/^(https?:\/\/|mailto:|\/|#)/i.test(v)) {
    throw new Error(`Refusing to emit unsafe URL: ${JSON.stringify(v)}`);
  }
  return esc(v);
}

/**
 * Inline micro-markdown: [text](url), **bold**, *italic*.
 * Escapes FIRST, so no user input can introduce a tag.
 */
export function mdInline(s) {
  let out = esc(s);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
    let safe;
    try {
      // href came through esc(), so &amp; must be unescaped before validating.
      safe = url(href.replace(/&amp;/g, "&"));
    } catch {
      return text; // drop the link, keep the words
    }
    return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  return out;
}

/** Block micro-markdown: blank lines separate paragraphs. */
export const md = (s) =>
  String(s ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => `<p>${mdInline(p)}</p>`)
    .join("\n");
