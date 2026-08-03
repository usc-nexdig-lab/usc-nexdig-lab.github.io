import { esc, attr, url } from "../lib/html.mjs";

/* The header and footer exist here and nowhere else. Every page gets the exact
 * same markup; the active link is selected purely by <body class="page-*">, so
 * there is no per-page variation to drift. */

const navItem = (item) => `
        <a class="nav-link" data-nav="${attr(item.key)}" href="${url(item.href)}">
          <span class="nav-link__inner">
            ${item.icon ? `<svg class="nav-icon" aria-hidden="true"><use href="/icons.svg#${attr(item.icon)}"/></svg>` : ""}
            <span class="nav-label">${esc(item.label)}</span>
          </span>
        </a>`;

export function layout({ site, pageKey, title, description, body }) {
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
    <header class="site-header">
      <div class="site-header__brand">
        <a href="/"><img class="site-header__logo" src="/assets/logo.svg" alt="NEXDIG" /></a>
      </div>${site.nav.map(navItem).join("")}
    </header>

    <main class="page">
      <div class="page__inner">
${body}
      </div>
    </main>

    <footer class="site-footer">${esc(site.footer)}</footer>
    <script src="/site.js" defer></script>
  </body>
</html>
`;
}
