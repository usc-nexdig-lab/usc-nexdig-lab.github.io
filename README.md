# NEXDIG Lab website

- **Live site:** https://nexdig.usc.edu
- **Edit the site:** https://nexdig.usc.edu/admin
- **Crop a photo:** https://nexdig.usc.edu/admin/crop/ — [always do this before uploading](#always-crop-before-uploading)

---

# Part 1 — How to update the website

**You do not need to clone anything, install anything, or write any HTML.**

Go to **https://nexdig.usc.edu/admin**, click **Log in with GitHub**, and pick a
collection from the left. Fill in the form, click **Publish**, and the site
rebuilds itself. It is live in about **30–60 seconds** — refresh to see it.

If you can't log in, you probably don't have write access to the repo yet. Ask
Ibrahim or Shelly to add you (see [Who can edit](#who-can-edit)).

> **Never type HTML anywhere.** Use the formatting described below. Pasted HTML
> is shown as literal text on purpose.

---

## Add a publication

**Publications → New Publication**

| Field | What to put |
|---|---|
| **Title** | The paper title. No quotes, no trailing period. |
| **Authors** | One name per row, **in publication order**. Type plain names — lab members are bolded automatically. Keep a trailing `*` for equal contribution (`Hanwen Liu*`). |
| **Venue** | Full name **without the year**, with the short form in brackets: `International Conference on Very Large Data Bases (VLDB)`. The bracketed part is the short name shown under "Recent papers" on the homepage. It does **not** set the venue label on a research project — that is typed on the project itself. |
| **Year** | e.g. `2026` |
| **Publication month** | `YYYY-MM`. Only used to order papers within a year. |
| **Links** | `Paper`, `Code`, `Slides` … Each needs a label and a URL. |
| **Note** | Optional, e.g. `* Equal contribution` |
| **BibTeX** | Paste straight from the ACM DL, DBLP or arXiv. No escaping needed. Shown on the Publications page; a project's Citation section is written on the project itself. |
| **Related research projects** | Which projects the paper belongs to. Kept as a record only — it no longer changes any page. A project's Citations and its paper count are typed on the project itself. |

**If a lab member isn't bolded:** their name here must exactly match their
**People** entry, or one of that entry's **Name aliases**. Add the spelling used
on the paper (e.g. `I. Sabek`) to their aliases.

## Add a news item

**News → New News item**

| Field | What to put |
|---|---|
| **Date** | The date of the announcement. Items sort newest-first automatically — you never reorder anything. |
| **Text** | One or two sentences. A small formatting toolbar gives you bold, italic and links; the **raw** tab takes Markdown directly. |

The four most recent appear on the homepage; **all** of them, newest first, are
on the [News page](https://nexdig.usc.edu/news/), linked from the homepage and
the menu. Nothing you post falls off the site.

## Add someone to the team

**People → New Person**

| Field | What to put |
|---|---|
| **Full name** | As they want it shown. |
| **Group** | Faculty / PhD Student / Master Student / Undergraduate Student / Alumni. The People page shows one section per group, in that order, and hides a group with nobody in it. |
| **Order within group** | Lower numbers first. |
| **Blurb** | Current members: `Fall 2024 - Now`. Alumni: `Next: Software Engineer at Google`. |
| **Photo** | [**Crop it to a square first**](#always-crop-before-uploading), then upload. Shown at 128×128 in the same square frame as everyone else; an uncropped photo is cut to its middle, ear and all. |
| **Website** | Personal page, LinkedIn, Google Scholar. Optional. |
| **Name aliases** | Other spellings used in paper author lists, e.g. `I. Sabek`. Only affects bolding on the Publications page. |

### When someone graduates

**People → open them → change Group to `Alumni`** and update **Blurb** to
`Next: <where they're going>`. That is the whole operation.

Consider adding a News item too — several existing ones are graduation
announcements.

## Add or edit a research project

**Research Projects → New Project.** One entry drives **both** the card on
`/research` and the full page at `/project/<slug>`.

| Field | What to put |
|---|---|
| **URL slug** | Becomes `nexdig.usc.edu/project/<slug>` **permanently**. Lowercase, no spaces. **Never change it on an existing project** — papers and CVs may link to it. |
| **Status** | Current or Past research. Left empty, it counts as current. |
| **Order on Research page** | Lower numbers first. |
| **One-line hook** | The single sentence someone should read if they read nothing else. Plain language — what problem does this solve? Shown large on the project page and under the title on Research. |
| **Venue** | Where the work was published, exactly as you want it shown, e.g. `VLDB 2025`. The only label on the project, and it is yours to type — nothing is inferred from the linked papers. |
| **Number of papers** | Shown under the project on the Research page, e.g. `3 papers`. Type it yourself — nothing is counted for you. Empty or `0` shows no count. |
| **Key results** | Up to three headline numbers, shown as a strip near the top — e.g. `4×` / `speedup over PostgreSQL`. **Use real published figures only.** Leave empty if there aren't any yet. |
| **Card: title**, **Card: summary**, **Card: image** | What shows on the Research page. Landscape images work best. |
| **Page: title**, **Page: subtitle** | Shown on the project page itself; the title may differ from the card title. |
| **Artifacts** | Anything a visitor can open: `Paper`, `Code`, `Demo`, `Slides`, a dataset. Each becomes a large button near the top of the page, in the order listed. A label containing *paper*, *pdf*, *arXiv* or *proceedings* renders solid red; the rest are outlined. |
| **Citations** | How to cite the work. Add one per paper, as many as you like: a **Title** and one block visitors copy with a button — BibTeX, or a plain reference if you have no BibTeX yet. Nothing is pulled in from Publications. |
| **Members** | Picked from the People list, so photos can never go stale. |
| **Sections** | See below. |

**URL slug is the only field you must fill in.** Everything else can be left
empty and added later: a project saves with nothing but a slug, and the site
renders whatever is there. A missing card image gives a text-only card, a
missing page title falls back to the card title and then to the slug, and a
half-filled artifact or key result is dropped rather than shown empty. What each
gap becomes is decided in one place, [`lib/project.mjs`](lib/project.mjs).

The **Preview** pane beside the form is the real project page: it runs the site's
own template and stylesheet, so what you see is what ships. Team is the one
exception — it is assembled at build time from the People collection, so the
preview says so instead of showing it.

### Writing a section

Each section has a **Heading** and a **Body**. The body is full Markdown — use
the toolbar, or click the **raw** tab to type Markdown directly.

| Type this | To get |
|---|---|
| `## Our approach` | a sub-heading |
| `### Detail` | a smaller sub-heading |
| `- item` (indent to nest) | a bullet list |
| `1. item` | a numbered list |
| `**text**` / `*text*` | **bold** / *italic* |
| `` `code` `` | inline code |
| `> text` | a pulled-out quote |
| `[text](https://...)` | a link |
| `![caption](/path.jpg)` | an image with a caption |
| `---` | a horizontal rule |

New sections start from a template that scaffolds
*problem → approach → results*. Delete what you don't need.

There is also a **Figure** field per section if you want one image pinned below
the text rather than inline.

## Change the homepage

**Homepage** (its own item in the sidebar)

| Field | What it controls |
|---|---|
| **Tagline** | The small red uppercase line under the logo. It is also the homepage's page title, so say what the lab is. |
| **Introduction** | The paragraphs under it. Markdown. |
| **Gallery: section heading** | The heading over the photo carousel — currently *Lab Appearance*. |
| **Photos** | The carousel lower down. One photo at a time; visitors move through them with the arrows, so lead with the best one. Drag to reorder, add as many as you like. |
| **Framing** (on each photo) | Every photo is shown in the same 3:2 frame whatever its original shape. If the crop cuts off something important, change the focus (top / center / bottom / left / right) and zoom. |
| **Join us box** | The red band at the bottom: heading, text, button label and link. |

## Change the menu or footer

**Site → Navigation & footer.** This affects every page — edit with care. Don't
change the **Key** field on a nav item; it's what highlights the current page.

## Adding photos, generally

Always use the upload field — never type a path. And
[**crop the photo first**](#always-crop-before-uploading), whatever it is for.
Every upload field in the CMS carries that reminder above it, with a link
straight to the crop tool set to the right shape.

| Kind | Where | Best shape |
|---|---|---|
| Headshot | People → Photo | square (shown at 128×128) |
| Gallery photo | Homepage → Photos | 3:2 landscape |
| Research card image | Research Projects → Card: image | 16:10 landscape |
| Section figure | Research Projects → Sections → Figure | any — never cropped |

### You don't need to resize anything

Uploads are **automatically resized and compressed in your browser** before they
are saved — capped at 1600px and converted to WebP. Drop in a photo straight
from your phone; the CMS handles it.

Two safety nets behind that:

- The build **fails on a missing image** rather than publishing a broken one, so
  an incomplete upload stops the deploy instead of shipping.
- The build **warns on any image over 800 KB**, naming the file, in case the
  automatic resizing is ever misconfigured.

### Always crop before uploading

**Crop every photo in [/admin/crop/](https://nexdig.usc.edu/admin/crop/) before
you upload it.** Not only when something looks wrong — every time.

Every place a photo appears on the site has a fixed frame, and an uncropped
upload is fitted to it by cutting to the middle of the picture:

| Where | Frame |
|---|---|
| Headshots | square |
| Homepage gallery | 3:2 landscape |
| Research card images | 16:10 landscape |

The middle of the picture is rarely the part that matters. It is how you end up
with a group photo missing the person on the end, or a headshot cropped through
someone's ear. Cropping first takes about thirty seconds and you choose what
survives instead of leaving it to the frame.

**How**

1. Open the [crop tool](https://nexdig.usc.edu/admin/crop/) and drop a photo in,
   or press **Browse**.
2. Pick the **shape** for where the photo is going: square for headshots, 3:2 for
   the homepage gallery, 16:10 for research card images.
3. Drag the photo to move it; scroll over it or use the **Zoom** slider.
4. **Download cropped photo** — a WebP about 900px on its longest side.
5. Upload *that* file in the CMS.

It never touches your original: you get a new file on your computer, and nothing
in the repo changes until you upload it.

You do not have to go looking for the tool. Open a person in the CMS and the
**preview pane** measures the photo: if it isn't square it says so — *"This photo
is 1600×877, and headshots are shown in a square frame — the sides will be
cropped off"* — with a link that opens the crop tool with that photo already
loaded.

**Headshots have no framing control at all.** Every one is shown in the same
square, because a row of portraits only reads as a row when nothing about the
framing varies between them. The crop tool is the only way to decide what fills
that square, which is why it is not optional.

Gallery and project photos do still have a **Framing** control on the entry, for
nudging focus and zoom after the fact. Treat it as a repair, not a substitute for
cropping first: it can only pick a region of whatever you uploaded.

## If something goes wrong

**"I published but the site didn't change."**
Wait a minute, then check the **Actions** tab on GitHub. A red ✗ means the build
rejected something and the log names the file. **The site does not go down** —
it stays on the last good version until the problem is fixed.

**"A lab member isn't bolded on the Publications page."**
See [Add a publication](#add-a-publication) above.

**"A photo isn't showing."**
The build refuses to publish a missing image, so the upload probably didn't
finish. Re-open the entry and add it again.

**"The site feels slow to load."**
Check the build log for `consider resizing` warnings. Uploads are resized
automatically, so this should not happen — if it does, the media-library
settings at the top of `public/admin/config.yml` need looking at.

**"I can't log in."**
You need write access to the repo. See below.

## Who can edit

Editing rights are exactly **GitHub write access to this repo**. There is no
separate CMS user list.

- **To add an editor:** repo **Settings → Collaborators and teams → Add people**,
  role **Write**.
- **To remove one:** remove them from that list. Access stops immediately.

Because CMS access is real repo write access, only grant it to people you'd
trust with the repository generally.

---
---

# Part 2 — How this repo works

Everything below is for whoever maintains the site itself. Editors don't need
any of it.

## Overview

A plain static site. **No `package.json`, no `npm install`, no framework.**
Content is JSON; a small Node script turns it into HTML.

```
data/*.json          content, written by the CMS
      |
      v
build.mjs            Node built-ins only -- no dependencies
      |
      v
_site/               generated HTML (gitignored, never committed)
      |
      v
GitHub Actions  -->  GitHub Pages  -->  nexdig.usc.edu
```

| Path | What it is |
|---|---|
| `data/` | **The content.** One JSON file per publication / person / news item / project, plus `site.json` and `homepage.json`. |
| `build.mjs` | The generator. Reads `data/`, writes `_site/`. Validates as it goes. |
| `lib/html.mjs` | Escaping helpers — see [Security](#security). |
| `lib/markdown.mjs` | The Markdown subset used by section bodies. |
| `templates/` | Page markup. Header and footer are defined **once**, in `layout.mjs`. |
| `static/` | `site.css`, `site.js`, the icon sprite — copied verbatim to the output. |
| `public/admin/` | The CMS page and its field schema. |
| `public/*_photos/` | Uploaded images. |
| `tools/check-cms.py` | Checks the CMS schema still matches the content. |
| `_site/` | **Generated. Never edit, never commit.** Rebuilt from scratch every time. |

Generated HTML is deliberately not committed, so a one-line content change stays
a one-line diff instead of a two-thousand-line one.

## Working locally

Requires **Node 18+** and nothing else.

```shell
git clone https://github.com/usc-nexdig-lab/usc-nexdig-lab.github.io.git
cd usc-nexdig-lab.github.io

node build.mjs                     # build once into _site/
node build.mjs --serve             # build, serve on :8000, rebuild on save
node build.mjs --serve --port 8001 # if 8000 is taken
```

There is **no `npm install`** — clone to preview is a few seconds.

`--serve` reproduces GitHub Pages' URL behaviour, including the `/people` →
`/people/` redirect, so what you see locally is what ships.

To preview the CMS itself, open http://localhost:8000/admin/ in Chrome and use
Sveltia's local-repository option.

That option writes entries and uploaded photos **straight into the working
tree** — it never commits, and an uploaded photo would otherwise sit untracked
until someone noticed. So `--serve` runs `git add` on `data/` and the three
photo folders after every rebuild, and prints what it staged. It only stages;
the commit is still yours to make and word. The deployed CMS at `/admin/` is
different: it talks to GitHub, so saving an entry there commits the entry and
its photo for you and the deploy workflow takes it from there.

## Checks

```shell
python3 tools/check-cms.py   # CMS schema vs. content
node build.mjs               # exits 1 on invalid content
```

`check-cms.py` catches the one class of problem nothing else does: a CMS field
the site never reads, or content no form can reach. Neither is a build error.

## Deployment

`.github/workflows/deploy.yml`, on every push to `main`:

1. `python3 tools/check-cms.py` — schema check
2. `node build.mjs` — build, failing on invalid content
3. Upload `_site/` and deploy to GitHub Pages

Pull requests run steps 1–2 as a check but do **not** deploy, so malformed
content is caught before it reaches `main`.

Only `_site/` is published — `data/`, `templates/`, `lib/` and `build.mjs` are
never served.

The custom domain comes from the `CNAME` file that `build.mjs` writes into
`_site/` on every build. **Don't remove it** — Pages will unbind the domain.

## Infrastructure setup

Done once. Recorded here so it can be rebuilt or handed over.

### GitHub App — CMS login

| Setting | Value |
|---|---|
| Client ID | `Ov23liZEGA3ixtJvhHsj` — **public, safe to share** |
| Client secret | Stored **only** as a Cloudflare Worker secret. Not in this repo. |
| Homepage URL | `https://nexdig.usc.edu` |
| Callback URL | `https://sveltia-cms-auth.nexdiglab.workers.dev/callback` |

The App must stay **installed on this repo** with Contents: read & write, or
logins succeed but saving fails.

### Cloudflare Worker — OAuth proxy

| Setting | Value |
|---|---|
| Worker | `sveltia-cms-auth` on the `nexdiglab` account |
| URL | `https://sveltia-cms-auth.nexdiglab.workers.dev` |
| Code | Sveltia's published `sveltia-cms-auth` |
| Secrets | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |
| `ALLOWED_DOMAINS` | `nexdig.usc.edu` |

It exists only to hold the client secret, which cannot live in a static page.
It is on the lab's own Cloudflare account — no third party holds repo access.

Health check:

```shell
curl -sI "https://sveltia-cms-auth.nexdiglab.workers.dev/auth?provider=github&site_id=nexdig.usc.edu" | grep -i location
# expect a 302 to github.com/login/oauth/authorize with the client ID above
```

### CMS version

`public/admin/index.html` pins **Sveltia CMS 0.178.0** rather than tracking
`latest`. npm versions are immutable, so the pin means an upstream change cannot
alter the admin page without a commit here. Bump it deliberately, then log in
and save a test edit before trusting it.

## Security

- **No secrets in this repo.** `public/admin/config.yml` is served publicly and
  holds only the field schema. The client ID is public by design; the secret
  lives only in the Worker.
- **`/admin` is publicly reachable and that's fine.** It's inert without a GitHub
  login carrying write access to this repo.
- **Escape-by-default.** Every `${}` in `templates/` wraps its value in one of
  `esc` / `attr` / `url` / `mdInline` / `raw` from `lib/html.mjs`. `raw()` is the
  identity function and exists only so that

  ```shell
  grep -rn 'raw(' templates/
  ```

  is a complete audit of every unescaped surface. It currently returns nothing.
- **Markdown is escaped before parsing**, so no body content can introduce a
  tag. Pasted HTML renders as literal text.
- **`url()` rejects** anything that isn't `http(s):`, `mailto:`, `/` or `#`, so a
  pasted `javascript:` link fails the build rather than shipping.
- **No npm dependencies**, so there is no supply chain to compromise and nothing
  for Dependabot to report. The only third-party code is the four pinned GitHub
  Actions and the pinned Sveltia bundle.

## Maintenance

Once or twice a year:

- Merge the Dependabot PRs for the GitHub Actions in `.github/workflows/`.
- Bump the pinned Sveltia version in `public/admin/index.html`, then log in and
  save a test edit to confirm it still works.

There is nothing else to update. There are no npm packages.
