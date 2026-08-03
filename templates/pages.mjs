import { esc, attr, url, mdInline } from "../lib/html.mjs";
import { markdown } from "../lib/markdown.mjs";

const GROUPS = [
  ["faculty", "Faculty"],
  ["phd", "PhD Students"],
  ["masters", "Master Students"],
  ["alumni", "Alumni"],
];

const OBJECT_POSITION = {
  top: "50% 0%",
  bottom: "50% 100%",
  left: "0% 50%",
  right: "100% 50%",
  center: "50% 50%",
};

/* Shared by headshots, the hero photo and the gallery: uniform tile, with the
   editor choosing which part survives the crop. */
const cropStyle = (crop) =>
  `transform:scale(${Number(crop?.zoom ?? 1)});object-position:${OBJECT_POSITION[crop?.position] ?? OBJECT_POSITION.center}`;

const linkList = (links = []) =>
  links
    .map((l) => `<a href="${url(l.url)}" target="_blank" rel="noopener noreferrer">[${esc(l.label)}]</a>`)
    .join("\n            ");

/* ------------------------------------------------------------------ home */

export const home = ({ homepage: h, news, projects, publications: pubs }) => {
  const featured = projects.filter((p) => p.status === "current").slice(0, 3);

  return `
        <div class="home">

          <section class="band band--hero">
            <div class="container hero">
              <img class="hero__logo" src="/assets/logo.svg" alt="NEXDIG" />
              <p class="hero__tagline">${esc(h.tagline)}</p>
              <h1 class="hero__mission">${esc(h.mission)}</h1>
              <div class="hero__intro">${markdown(h.intro)}</div>
            </div>
          </section>

          <section class="band">
            <div class="container home__section">
              <div class="home__head">
                <h2 class="section-heading">What we work on</h2>
                <a class="home__more" href="/research/">All research &rarr;</a>
              </div>
              <div class="areas">
${featured
  .map(
    (p) => `                <a class="area" href="/project/${attr(p.id)}/">
                  <div class="area__media">
                    <img src="${url(p.cardImage)}" alt="" loading="lazy" />
                  </div>
                  <div class="area__body">
${p.venues?.length ? `                    <ul class="tags"><li class="tag tag--venue">${esc(p.venues[0])}</li></ul>` : ""}
                    <h3 class="area__title">${esc(p.cardTitle)}</h3>
                    <p class="area__hook">${esc(p.hook)}</p>
                  </div>
                </a>`
  )
  .join("\n")}
              </div>
            </div>
          </section>

          <section class="band band--tint">
            <div class="container home__split">
              <div class="home__section">
                <div class="home__head"><h2 class="section-heading">News</h2></div>
                <ul class="news-list">
${news
  .slice(0, 4)
  .map(
    (n) => `                  <li class="news-item">
                    <p class="news-date"><time datetime="${attr(n.date)}">${esc(n.displayDate)}</time></p>
                    <p class="news-description">${mdInline(n.text)}</p>
                  </li>`
  )
  .join("\n")}
                </ul>
              </div>

              <div class="home__section">
                <div class="home__head">
                  <h2 class="section-heading">Recent papers</h2>
                  <a class="home__more" href="/publications/">All papers &rarr;</a>
                </div>
                <div class="publications__list">
${pubs
  .slice(0, 3)
  .map(
    (p) => `                  <div class="pub">
                    <h3 class="pub__title">${esc(p.title)}</h3>
                    <p class="pub__authors">${p.authorsHtml}</p>
                    <p class="pub__venue">${esc(p.venueShort)}, ${esc(p.year)}</p>
                  </div>`
  )
  .join("\n")}
                </div>
              </div>
            </div>
          </section>

${
  h.photos.length
    ? `          <section class="band">
            <div class="container home__section">
              <div class="home__head"><h2 class="section-heading">${esc(h.photosHeading)}</h2></div>
              <div class="gallery">
${h.photos
  .map(
    (ph, i) => `                <button class="gallery__item" type="button"
                        data-lightbox="${attr(i)}"
                        data-src="${url(ph.src)}"
                        data-caption="${attr(ph.caption ?? "")}"
                        aria-label="${attr(ph.caption ? `Enlarge: ${ph.caption}` : "Enlarge photo")}">
                  <span class="gallery__frame">
                    <img src="${url(ph.src)}" alt="${attr(ph.caption ?? "")}" loading="lazy" style="${cropStyle(ph.crop)}" />
                  </span>
${ph.caption ? `                  <span class="gallery__caption">${esc(ph.caption)}</span>` : ""}
                </button>`
  )
  .join("\n")}
              </div>
            </div>
          </section>`
    : ""
}

          <section class="band band--cta">
            <div class="container cta">
              <div>
                <h2 class="cta__heading">${esc(h.cta.heading)}</h2>
                <p class="cta__body">${esc(h.cta.body)}</p>
              </div>
              <a class="btn btn--light" href="${url(h.cta.href)}">${esc(h.cta.label)}</a>
            </div>
          </section>

        </div>`;
};

/* ---------------------------------------------------------------- people */

const person = (p) => {
  const zoom = p.crop?.zoom ?? 1;
  const pos = OBJECT_POSITION[p.crop?.position] ?? OBJECT_POSITION.center;
  const photo = p.photo
    ? `<div class="person__photo">
                  <img src="/people_photos/${attr(p.photo)}" alt="${attr(p.name)}"
                       style="transform:scale(${Number(zoom)});object-position:${pos}" />
                </div>`
    // Same-document <use> and an explicit viewBox, for the reasons in layout.mjs.
    : `<div class="person__placeholder"><svg viewBox="0 0 448 512" aria-hidden="true"><use href="#person"/></svg></div>`;

  const name = p.website
    ? `<a href="${url(p.website)}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>`
    : esc(p.name);

  return `              <div class="person">
                ${photo}
                <div class="person__body">
                  <h3 class="person__name">${name}</h3>
                  <p class="person__blurb">${esc(p.blurb)}</p>
                </div>
              </div>`;
};

export const people = ({ people: all }) => `
        <h1 class="page-title red-title">People</h1>
        <div class="people">
${GROUPS.filter(([key]) => all.some((p) => p.group === key))
  .map(
    ([key, heading]) => `          <section class="people__group">
            <h2 class="people__heading">${esc(heading)}</h2>
            <div class="people__list${key === "faculty" ? " people__list--faculty" : ""}">
${all
  .filter((p) => p.group === key)
  .map(person)
  .join("\n")}
            </div>
          </section>`
  )
  .join("\n")}
        </div>`;

/* -------------------------------------------------------------- research */

/* Venue chips are styled distinctly from topic tags -- one is "where this was
   published", the other is "what it is about", and conflating them reads badly. */
const tagList = (tags = [], venues = []) =>
  tags.length || venues.length
    ? `<ul class="tags">${venues
        .map((v) => `<li class="tag tag--venue">${esc(v)}</li>`)
        .join("")}${tags.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>`
    : "";

/* Editorial row: cropped 16:9 thumbnail left, content right. object-cover rather
   than object-contain, because every cover photo in this repo is portrait and
   letterboxed badly inside a landscape box. */
const researchRow = (p) => {
  const papers = p.resolvedPublications ?? [];
  const meta = papers.length ? `${papers.length} paper${papers.length > 1 ? "s" : ""}` : "";

  return `          <a class="rrow" href="/project/${attr(p.id)}/">
            <div class="rrow__media">
              <img src="${url(p.cardImage)}" alt="" loading="lazy" />
            </div>
            <div class="rrow__body">
              <h2 class="rrow__title">
                ${esc(p.cardTitle)}
                ${p.status === "current" ? `<span class="badge badge--active">Active</span>` : `<span class="badge">Completed</span>`}
              </h2>
              <p class="rrow__hook">${esc(p.hook ?? p.cardSummary)}</p>
              ${tagList(p.tags, p.venues)}
              ${meta ? `<p class="rrow__meta">${meta}</p>` : ""}
            </div>
            <span class="rrow__chevron" aria-hidden="true">&rarr;</span>
          </a>`;
};

export const research = ({ projects }) => {
  const section = (status, heading) => {
    const items = projects.filter((p) => p.status === status);
    if (!items.length) return "";
    return `        <section class="research__section">
${heading ? `          <h2 class="section-heading">${esc(heading)}</h2>` : ""}
          <div class="rrows">
${items.map(researchRow).join("\n")}
          </div>
        </section>`;
  };
  return `
        <h1 class="page-title red-title">Research</h1>
${section("current", "")}
${section("past", "Past Research")}`;
};

/* ---------------------------------------------------------- publications */

export const publications = ({ publications: pubs }) => `
        <div class="publications">
          <h1 class="page-title red-title">Publications</h1>
          <div class="publications__list">
${pubs
  .map(
    (p) => `            <div class="pub">
              <h2 class="pub__title">${esc(p.title)}</h2>
              <p class="pub__authors">${p.authorsHtml}</p>
              <p class="pub__venue">${esc(p.venue)}, ${esc(p.year)}</p>
${p.note ? `              <p class="pub__note">${esc(p.note)}</p>` : ""}
              <div class="pub__links">
            ${linkList(p.links)}
              </div>
            </div>`
  )
  .join("\n")}
          </div>
        </div>`;

/* ------------------------------------------------------- opportunities */

export const opportunities = () => `
        <h1 class="page-title red-title">Prospective Students</h1>
        <p>We are looking for the NEXt passionate and talented students to DIG with us!</p>
        <hr class="separator" />
        <h2 class="custom-h2">Contact us</h2>
        <p>Please email to <a class="clickable-link" href="mailto:sabek@usc.edu">sabek@usc.edu</a> if you are interested in joining our group.</p>`;

/* -------------------------------------------------------------- project */

export const project = ({ project: p }) => `
        <div class="project">
          <a class="breadcrumb" href="/research/">&larr; Research</a>

          <header class="project__header">
            <h1 class="project__title">${esc(p.title)}
              ${p.status === "current" ? `<span class="badge badge--active">Active</span>` : `<span class="badge">Completed</span>`}
            </h1>
${p.subtitle ? `            <p class="project__subtitle">${esc(p.subtitle)}</p>` : ""}
${p.hook ? `            <p class="project__hook">${esc(p.hook)}</p>` : ""}
            ${tagList(p.tags, p.venues)}
${
  p.links?.length
    ? `            <div class="project__links">
${p.links
  .map((l) => {
    // The paper is the primary action; everything else is secondary.
    const primary = /paper|pdf|arxiv|proceedings/i.test(l.label);
    return `              <a class="btn btn--sm ${primary ? "btn--primary" : "btn--outline"}" href="${url(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`;
  })
  .join("\n")}
            </div>`
    : ""
}
          </header>

${
  p.highlights?.length
    ? `          <div class="stats">
${p.highlights
  .map(
    (h) => `            <div class="stat">
              <div class="stat__value">${esc(h.value)}</div>
              <div class="stat__label">${esc(h.label)}</div>
            </div>`
  )
  .join("\n")}
          </div>`
    : ""
}

${p.sections
  .map(
    (s) => `          <section class="project__section">
            <h2 class="section-heading">${esc(s.title)}</h2>
            <div class="project__body">
${markdown(s.body)}
            </div>
${
  s.image
    ? `            <figure class="figure">
              <img src="${url(s.image)}" alt="${attr(s.caption ?? s.title)}" loading="lazy" />
${s.caption ? `              <figcaption>${esc(s.caption)}</figcaption>` : ""}
            </figure>`
    : ""
}
          </section>`
  )
  .join("\n")}

${
  p.resolvedPublications?.length
    ? `          <section class="project__section">
            <h2 class="section-heading">Citation</h2>
            <div class="cites">
${p.resolvedPublications
  .map((pub) =>
    pub.bibtex
      ? `              <div class="cite">
                <button class="cite__copy" data-copy-cite aria-label="Copy BibTeX" title="Copy BibTeX">
                  <svg viewBox="0 0 448 512" aria-hidden="true"><use href="#copy"/></svg>
                </button>
                <pre><code>${esc(pub.bibtex)}</code></pre>
              </div>`
      : `              <p class="cite-entry">${esc(pub.citation)}</p>`
  )
  .join("\n")}
            </div>
          </section>`
    : ""
}

${
  p.resolvedMembers?.length
    ? `          <section class="project__section">
            <h2 class="section-heading">Team</h2>
            <div class="members">
${p.resolvedMembers
  .map(
    (m) => `              <a class="member" href="/people/">
                <img src="/people_photos/${attr(m.photo)}" alt="${attr(m.name)}" />
                <p class="member__name">${esc(m.name)}</p>
              </a>`
  )
  .join("\n")}
            </div>
          </section>`
    : ""
}

        </div>`;

/* ------------------------------------------------------------- not found */

export const notFound = () => `
        <div class="notfound">
          <h1 class="page-title">Page not found</h1>
          <p><a class="clickable-link" href="/">Back to the NEXDIG home page</a></p>
        </div>`;
