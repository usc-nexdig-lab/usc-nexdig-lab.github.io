import { esc, attr, url, mdInline } from "../lib/html.mjs";
import { markdown } from "../lib/markdown.mjs";
import { GROUPS } from "../lib/people.mjs";

const OBJECT_POSITION = {
  top: "50% 0%",
  bottom: "50% 100%",
  left: "0% 50%",
  right: "100% 50%",
  center: "50% 50%",
};

/* The gallery only: a uniform tile with the editor choosing which part survives
   the crop. Headshots deliberately have no such control -- see person(). */
const cropStyle = (crop) =>
  `transform:scale(${Number(crop?.zoom ?? 1)});object-position:${OBJECT_POSITION[crop?.position] ?? OBJECT_POSITION.center}`;

/* One photo at a time, moved through with the arrows. Nothing here is
   clickable except the controls -- the photos are for looking at.

   The arrows and dots ship hidden and site.js unhides them, so a visitor
   without JavaScript is left with a strip that still scrolls and swipes
   rather than with buttons that do nothing. */
const carousel = (photos) => {
  const single = photos.length < 2;
  const slide = (ph, i) => `                    <li class="carousel__slide" role="group"
                        aria-roledescription="slide" aria-label="${attr(`${i + 1} of ${photos.length}`)}">
                      <figure class="carousel__figure">
                        <img src="${url(ph.src)}" alt="${attr(ph.caption ?? "")}"${i ? ' loading="lazy"' : ""} style="${cropStyle(ph.crop)}" />
${ph.caption ? `                        <figcaption class="carousel__caption">${esc(ph.caption)}</figcaption>` : ""}
                      </figure>
                    </li>`;

  const dot = (ph, i) => `                  <button class="carousel__dot" type="button" data-carousel-dot="${attr(i)}"
                          aria-label="${attr(ph.caption || `Photo ${i + 1}`)}"${i ? "" : ' aria-current="true"'}></button>`;

  return `              <div class="carousel" data-carousel>
                <div class="carousel__viewport" data-carousel-viewport tabindex="0"
                     role="group" aria-roledescription="carousel" aria-label="Lab photos">
                  <ul class="carousel__track">
${photos.map(slide).join("\n")}
                  </ul>
                </div>
${
  single
    ? ""
    : `                <button class="carousel__nav carousel__nav--prev" type="button" data-carousel-prev
                        aria-label="Previous photo" hidden>&#8249;</button>
                <button class="carousel__nav carousel__nav--next" type="button" data-carousel-next
                        aria-label="Next photo" hidden>&#8250;</button>
                <div class="carousel__dots" hidden>
${photos.map(dot).join("\n")}
                </div>`
}
              </div>`;
};

/* Where the work was published, taken from the project's own Venue field --
   nothing is inferred from the publication list any more.

   It is a plain line rather than a chip on purpose: a pill sitting above the
   Paper and Code buttons reads as a third button, and visitors try to click
   it. */
const venueLine = (venue) => (venue ? `<p class="venue">${esc(venue)}</p>` : "");

const linkList = (links = []) =>
  links
    .map((l) => `<a href="${url(l.url)}" target="_blank" rel="noopener noreferrer">[${esc(l.label)}]</a>`)
    .join("\n            ");

/* ------------------------------------------------------------------ home */

export const home = ({ homepage: h, news, publications: pubs }) => {
  return `
        <div class="home">

          <section class="band band--hero">
            <div class="container hero">
              <img class="hero__logo" src="/assets/logo.svg" alt="NEXDIG" />
              <!-- The tagline carries the page's <h1>: with the headline gone it is
                   the only line that names what this site is. -->
              <h1 class="hero__tagline">${esc(h.tagline)}</h1>
              <div class="hero__intro">${markdown(h.intro)}</div>
            </div>
          </section>

          <section class="band band--tint">
            <div class="container home__split">
              <div class="home__section">
                <div class="home__head">
                  <h2 class="section-heading">News</h2>
                  <a class="home__more" href="/news/">All news &rarr;</a>
                </div>
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
${carousel(h.photos)}
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

/* Every headshot is framed identically: the same square, cropped to the middle.
   There is no per-person focus or zoom -- a row of portraits reads as a row
   only when nothing about the framing varies between them. A photo that loses
   something important to the crop is cropped before upload, at /admin/crop/. */
/* Three ways to show a person, because one grid cannot serve all three jobs.

   The card is the default: photo on top, name under it. Everything aligns
   whatever the length of a name, which the old photo-left row could not manage
   -- it gave names a 150px column and they wrapped.  */
const photoOf = (p) =>
  p.photo
    ? `<div class="person__photo">
                  <img src="/people_photos/${attr(p.photo)}" alt="${attr(p.name)}" loading="lazy" />
                </div>`
    // Same-document <use> and an explicit viewBox, for the reasons in layout.mjs.
    : `<div class="person__placeholder"><svg viewBox="0 0 448 512" aria-hidden="true"><use href="#person"/></svg></div>`;

const nameOf = (p) =>
  p.website
    ? `<a href="${url(p.website)}" target="_blank" rel="noopener noreferrer">${esc(p.name)}</a>`
    : esc(p.name);

export const person = (p) => `              <div class="person">
                ${photoOf(p)}
                <div class="person__body">
                  <h3 class="person__name">${nameOf(p)}</h3>
${p.blurb ? `                  <p class="person__blurb">${esc(p.blurb)}</p>` : ""}
                </div>
              </div>`;

/* The faculty row: one person, a bigger photo, and room for a full title. */
const personFeature = (p) => `              <div class="person person--feature">
                ${photoOf(p)}
                <div class="person__body">
                  <h3 class="person__name">${nameOf(p)}</h3>
${p.blurb ? `                  <p class="person__blurb">${esc(p.blurb)}</p>` : ""}
                </div>
              </div>`;

/* Alumni as a list, not a photo wall. They only accumulate, their photos go
   stale first, and where someone went next is the part worth reading. */
const alumnus = (p) => `                <li class="alum">
                  <span class="alum__name">${nameOf(p)}</span>
${p.blurb ? `                  <span class="alum__where">${esc(p.blurb)}</span>` : ""}
                </li>`;

export const people = ({ people: all }) => `
        <h1 class="page-title red-title">People</h1>
        <div class="people">
${GROUPS.filter(([key]) => all.some((p) => p.group === key))
  .map(([key, heading]) => {
    const members = all.filter((p) => p.group === key);
    const body =
      key === "alumni"
        ? `            <ul class="alums">
${members.map(alumnus).join("\n")}
            </ul>`
        : key === "faculty"
          ? `            <div class="people__list people__list--faculty">
${members.map(personFeature).join("\n")}
            </div>`
          : `            <div class="people__list">
${members.map(person).join("\n")}
            </div>`;

    return `          <section class="people__group">
            <h2 class="people__heading">${esc(heading)}</h2>
${body}
          </section>`;
  })
  .join("\n")}
        </div>`;

/* -------------------------------------------------------------- research */

/* Editorial row: cropped 16:9 thumbnail left, content right. object-cover rather
   than object-contain, because every cover photo in this repo is portrait and
   letterboxed badly inside a landscape box. */
const researchRow = (p) => {
  /* Typed on the project. It used to be a count of the publications linked to
     it, which drifted from what the project had actually produced. */
  const papers = Number(p.papers) || 0;
  const meta = papers > 0 ? `${papers} paper${papers > 1 ? "s" : ""}` : "";

  const hook = p.hook || p.cardSummary;

  return `          <a class="rrow" href="/project/${attr(p.id)}/">
${
  p.cardImage
    ? `            <div class="rrow__media">
              <img src="${url(p.cardImage)}" alt="" loading="lazy" />
            </div>`
    : ""
}
            <div class="rrow__body">
              <h2 class="rrow__title">${esc(p.cardTitle)}</h2>
${hook ? `              <p class="rrow__hook">${esc(hook)}</p>` : ""}
              ${venueLine(p.venue)}
              ${meta ? `<p class="rrow__meta">${meta}</p>` : ""}
            </div>
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

/* ----------------------------------------------------------------- news */

/* Every item, newest first. The homepage shows the four most recent and links
   here; without this page the fifth would exist in the CMS and nowhere else. */
export const news = ({ news: items }) => `
        <h1 class="page-title red-title">News</h1>
${
  items.length
    ? `        <ul class="news-list">
${items
  .map(
    (n) => `          <li class="news-item">
            <p class="news-date"><time datetime="${attr(n.date)}">${esc(n.displayDate)}</time></p>
            <p class="news-description">${mdInline(n.text)}</p>
          </li>`
  )
  .join("\n")}
        </ul>`
    : `        <p>Nothing yet.</p>`
}`;

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
            <h1 class="project__title">${esc(p.title)}</h1>
${p.subtitle ? `            <p class="project__subtitle">${esc(p.subtitle)}</p>` : ""}
${p.hook ? `            <p class="project__hook">${esc(p.hook)}</p>` : ""}
            ${venueLine(p.venue)}
${
  p.artifacts?.length
    ? `            <div class="project__links">
${p.artifacts
  .map((a) => {
    // The paper is the primary action; everything else is secondary.
    const primary = /paper|pdf|arxiv|proceedings/i.test(a.label ?? "");
    return `              <a class="btn btn--lg ${primary ? "btn--primary" : "btn--outline"}" href="${url(a.url)}" target="_blank" rel="noopener noreferrer">${esc(a.label || "Link")}</a>`;
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
${h.value ? `              <div class="stat__value">${esc(h.value)}</div>` : ""}
${h.label ? `              <div class="stat__label">${esc(h.label)}</div>` : ""}
            </div>`
  )
  .join("\n")}
          </div>`
    : ""
}

${p.sections
  .map(
    (s) => `          <section class="project__section">
${s.title ? `            <h2 class="section-heading">${esc(s.title)}</h2>` : ""}
${s.body ? `            <div class="project__body">
${markdown(s.body)}
            </div>` : ""}
${
  s.image
    ? `            <figure class="figure">
              <img src="${url(s.image)}" alt="${attr(s.caption || s.title || "")}" loading="lazy" />
${s.caption ? `              <figcaption>${esc(s.caption)}</figcaption>` : ""}
            </figure>`
    : ""
}
          </section>`
  )
  .join("\n")}

${
  /* Typed on the project, one title and one copyable block each. Nothing here
     is read from the Publications collection. */
  p.citations?.length
    ? `          <section class="project__section">
            <h2 class="section-heading">Citation</h2>
            <div class="cites">
${p.citations
  .map(
    (c) => `              <div class="cite">
${c.title ? `                <h3 class="cite__title">${esc(c.title)}</h3>` : ""}
${
  c.bibtex
    ? `                <div class="cite__box">
                  <button class="cite__copy" data-copy-cite aria-label="${attr(c.title ? `Copy citation for ${c.title}` : "Copy citation")}" title="Copy citation">
                    <svg viewBox="0 0 448 512" aria-hidden="true"><use href="#copy"/></svg>
                  </button>
                  <pre><code>${esc(c.bibtex)}</code></pre>
                </div>`
    : ""
}
              </div>`
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
