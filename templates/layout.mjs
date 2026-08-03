import { esc, attr, url } from "../lib/html.mjs";

/* The header and footer exist here and nowhere else. Every page gets the exact
 * same markup; the active link is selected purely by <body class="page-*">, so
 * there is no per-page variation to drift. */

/* Two things this markup gets right, both of which broke the header when absent:
   1. The outer <svg> MUST carry a viewBox. The sprite's viewBox lives on
      <symbol>, so without one here the element has no intrinsic aspect ratio and
      `width:auto` falls back to the CSS default replaced width of 300px, which
      blows the nav out to ~1200px and clips it on narrow windows.
   2. <use> must reference the SAME document. An external "/icons.svg#id" is
      subject to CORS and does not inherit currentColor in several browsers, so
      the icons silently vanish. The sprite is therefore inlined per page. */
const navItem = (viewBoxes) => (item) => {
  const vb = viewBoxes[item.icon];
  const icon = item.icon
    ? `<svg class="nav-icon" viewBox="${attr(vb)}" aria-hidden="true"><use href="#${attr(item.icon)}"/></svg>`
    : "";
  return `
          <a class="nav-link" data-nav="${attr(item.key)}" href="${url(item.href)}">
            <span class="nav-link__inner">${icon}<span class="nav-label">${esc(item.label)}</span></span>
          </a>`;
};

export function layout({ site, pageKey, title, description, body, viewBoxes, sprite }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)}</title>
    <meta name="description" content="${attr(description)}" />
    <link rel="icon" href="/nexdig_logo_small.jpg" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="/site.css" />
    <meta property="og:title" content="${attr(title)}" />
    <meta property="og:description" content="${attr(description)}" />
    <meta property="og:type" content="website" />
  </head>
  <body class="page-${attr(pageKey)}">
${sprite}
    <header class="site-header">
      <a class="site-header__brand" href="/">
        <img class="site-header__logo" src="/assets/logo.svg" alt="NEXDIG" />
      </a>
      <nav class="site-nav">${site.nav.map(navItem(viewBoxes)).join("")}
      </nav>
    </header>

    <main class="page">
      <div class="page__inner">
${body}
      </div>
    </main>

    <footer class="site-footer">${esc(site.footer)}</footer>
  </body>
</html>
`;
}
