import { esc, attr, url, md, mdInline } from "../lib/html.mjs";

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

const linkList = (links = []) =>
  links
    .map((l) => `<a href="${url(l.url)}" target="_blank" rel="noopener noreferrer">[${esc(l.label)}]</a>`)
    .join("\n            ");

/* ------------------------------------------------------------------ home */

export const home = ({ homepage, news }) => `
        <div class="home">
          <div class="home__logo"><img src="/assets/logo.svg" alt="NEXDIG Logo" /></div>

          <div class="homepage-grid">
            <div class="home__col">
              <div>
                <p>
                  Welcome to the <b>NEX</b>t-generation <b>D</b>ata-<b>I</b>ntensive Systems
                  <b>G</b>roup (NEXDIG) lab! Led by
                  <a href="http://viterbi-web.usc.edu/~sabek/" class="clickable-link">Ibrahim Sabek</a>,
                  we are a cutting-edge research lab focused on the next-generation data systems.
                  The lab explores innovative approaches to enhance the performance, scalability,
                  security, and interpretability of data-intensive platforms.
                </p>
                <p>
                  Through an interdisciplinary blend of machine learning, quantum computing, and
                  large language models, NEXDIG drives fundamental advances that bridge AI and data
                  systems, enabling intelligent, trustworthy, and high-performance solutions for
                  next-generation applications across industries.
                </p>
              </div>

              <div>
                <section class="news-section">
                  <h2 class="news-title">News</h2>
                  <ul class="news-list">
${news
  .map(
    (n) => `                    <li class="news-item">
                      <p class="news-date"><time datetime="${attr(n.date)}">${esc(n.displayDate)}</time></p>
                      <p class="news-description">${mdInline(n.text)}</p>
                    </li>`
  )
  .join("\n")}
                  </ul>
                </section>
              </div>
            </div>

            <div class="home__col">
              <div>
                <div class="carousel" data-carousel='${attr(JSON.stringify(homepage.carousel))}'>
                  <img class="carousel__img" src="${url(homepage.carousel[0].src)}" alt="${attr(homepage.carousel[0].caption)}" />
                  <div class="carousel__caption">${esc(homepage.carousel[0].caption)}</div>
                  <button class="carousel__btn carousel__btn--prev" aria-label="Previous Image">&#9664;</button>
                  <button class="carousel__btn carousel__btn--next" aria-label="Next Image">&#9654;</button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

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

const card = (p) => `            <div class="card">
              <img class="card__img" src="${url(p.cardImage)}" alt="${attr(p.cardTitle)}" />
              <div class="card__body">
                <h3 class="card__title"><a href="/project/${attr(p.id)}/">${esc(p.cardTitle)}</a></h3>
                <p class="card__summary">${esc(p.cardSummary)}</p>
              </div>
            </div>`;

export const research = ({ projects }) => {
  const section = (status, heading) => {
    const items = projects.filter((p) => p.status === status);
    if (!items.length) return "";
    return `        <section class="research__section">
${heading ? `          <h2 class="project__h2">${esc(heading)}</h2>` : ""}
          <div class="card-grid">
${items.map(card).join("\n")}
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
          <header class="project__header">
            <h1 class="project__title">${esc(p.title)}</h1>
${p.subtitle ? `            <p class="project__subtitle">${esc(p.subtitle)}</p>` : ""}
${
  p.links?.length
    ? `            <div class="project__links">
${p.links.map((l) => `              <a class="pill" href="${url(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`).join("\n")}
            </div>`
    : ""
}
          </header>

${p.sections
  .map(
    (s) => `          <section class="project__section">
            <h2 class="project__h2">${esc(s.title)}</h2>
            <div class="project__body">
${md(s.body)}
            </div>
          </section>`
  )
  .join("\n")}

${
  p.bibtex
    ? `          <section class="project__section">
            <h2 class="project__h2">BibTeX</h2>
            <div class="bibtex">
              <button class="bibtex__copy" data-copy-bibtex>Copy</button>
              <pre><code>${esc(p.bibtex)}</code></pre>
            </div>
          </section>`
    : ""
}

${
  p.resolvedMembers?.length
    ? `          <section class="project__section">
            <h2 class="project__h2">People</h2>
            <div class="members">
${p.resolvedMembers
  .map(
    (m) => `              <div class="member">
                <img src="/people_photos/${attr(m.photo)}" alt="${attr(m.name)}" />
                <p class="member__name">${esc(m.name)}</p>
              </div>`
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
