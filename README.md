# NEXDIG Lab website

The website for the **NEX**t-generation **D**ata-**I**ntensive Systems **G**roup at USC.

- **Live site:** https://nexdig.usc.edu
- **Content editor:** https://nexdig.usc.edu/admin
- **Repo:** `usc-nexdig-lab/usc-nexdig-lab.github.io`

It is a plain static site. There is **no `package.json`, no `npm install`, and no
framework** — content lives as JSON, and a small Node script turns it into HTML.

---

## Editing the site

**You do not need to clone this repo, install anything, or write any HTML.**

1. Go to **https://nexdig.usc.edu/admin**
2. Click **Log in with GitHub**
3. Pick a collection, edit the form, drag in a photo if needed
4. Click **Publish**

That commits your change and the site rebuilds automatically. It is live in about
**30–60 seconds**. Refresh the page to see it.

### Collections

| Collection | Use it for |
|---|---|
| **Publications** | Papers. Authors go in one per row; lab members are **bolded automatically** — never type formatting. Keep a trailing `*` for equal contribution (`Hanwen Liu*`). |
| **People** | Members. To graduate someone, change **Group** to `Alumni` and update the blurb to `Next: ...`. |
| **News** | Announcements. Links use `[text](https://example.com)`. Sorted by date automatically — order does not matter. |
| **Research Projects** | One entry drives **both** the card on /research and the project page at `/project/<slug>`. |
| **Site settings** | Nav, footer, homepage intro photos. |

### Rules worth knowing

- **Never type HTML.** Use `[text](url)`, `**bold**`, `*italic*`. Blank lines start a
  new paragraph. Anything else is escaped and shown literally, by design.
- **Never change a project's URL slug** once it exists. It becomes
  `nexdig.usc.edu/project/<slug>` permanently, and papers or CVs may link to it.
- **If a build fails, the site does not go down** — it just doesn't update. The
  previously published version stays live until the problem is fixed. A red ✗ on
  the commit is not an outage.

### Adding a photo

Use the image field in the form. It uploads the file and fills in the filename for
you. Square headshots look best (they are displayed at 128×128). If the crop looks
wrong, open the person and adjust **Photo framing** → focus and zoom.

---

## Who can edit

Editing rights are exactly **GitHub write access to this repo**. There is no
separate CMS user list.

- **To add an editor:** repo **Settings → Collaborators and teams → Add people**,
  role **Write**.
- **To remove an editor:** remove them from that same list. Their access stops
  immediately.

Because CMS access is real repo write access, only grant it to people you would
trust with the repository generally.

---

## How it works

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
| `data/` | **The content.** One JSON file per publication / person / news item / project. This is the only thing editors touch. |
| `data/projects/*.bib` | BibTeX, one sidecar file per project. Paste straight from the ACM DL — no escaping needed. |
| `build.mjs` | The generator. Reads `data/`, writes `_site/`. |
| `lib/html.mjs` | Escaping helpers. See *Security notes* below. |
| `templates/` | Page markup. The header and footer are defined **once**, in `layout.mjs`. |
| `static/` | `site.css`, `site.js`, the icon sprite — copied verbatim into the output. |
| `public/admin/` | The CMS page and its field schema. |
| `_site/` | **Generated. Never edit, never commit.** Wiped on every build. |

Generated HTML is deliberately not committed, so a one-line content change stays a
one-line diff instead of a 2,000-line one.

---

## Working locally (optional)

Only needed for design or template changes. Requires **Node 18+** and nothing else.

```shell
git clone https://github.com/usc-nexdig-lab/usc-nexdig-lab.github.io.git
cd usc-nexdig-lab.github.io

node build.mjs           # build once into _site/
node build.mjs --serve   # build, serve on http://localhost:8000, rebuild on save
```

There is **no `npm install`.** Clone to preview is a few seconds.

`--serve` reproduces GitHub Pages' URL behaviour, including the `/people` →
`/people/` redirect, so what you see locally is what ships.

To publish template or CSS changes, commit and push to `main` as usual.

---

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`:

1. `node build.mjs` — build, and **fail on invalid content**
2. Upload `_site/` and deploy to GitHub Pages

Pull requests run the build as a check but do **not** deploy, so malformed JSON is
caught before it reaches `main`.

Only `_site/` is published. `data/`, `templates/`, `lib/` and `build.mjs` are never
served.

The custom domain `nexdig.usc.edu` comes from the `CNAME` file that `build.mjs`
writes into `_site/` on every build. **Do not remove it** — Pages will unbind the
domain.

---

## Infrastructure setup

Recorded here so it can be rebuilt or handed over. Done once; no need to repeat.

### GitHub App (CMS login)

| Setting | Value |
|---|---|
| Client ID | `Ov23liZEGA3ixtJvhHsj` — **public, safe to share** |
| Client secret | Stored **only** as a Cloudflare Worker secret. Not in this repo. |
| Homepage URL | `https://nexdig.usc.edu` |
| Callback URL | `https://sveltia-cms-auth.nexdiglab.workers.dev/callback` |

The App must stay **installed on this repo** with Contents: read & write, or logins
will succeed but saving will fail.

### Cloudflare Worker (OAuth proxy)

| Setting | Value |
|---|---|
| Worker | `sveltia-cms-auth` on the `nexdiglab` account |
| URL | `https://sveltia-cms-auth.nexdiglab.workers.dev` |
| Code | Sveltia's published `sveltia-cms-auth` |
| Secrets | `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` |
| `ALLOWED_DOMAINS` | `nexdig.usc.edu` |

The Worker exists only to hold the client secret, which cannot live in a static
page. It is on the lab's own Cloudflare account — no third party holds repo access.

Health check:

```shell
curl -sI "https://sveltia-cms-auth.nexdiglab.workers.dev/auth?provider=github&site_id=nexdig.usc.edu" | grep -i location
# expect a 302 to github.com/login/oauth/authorize with the client_id above
```

### CMS version

`public/admin/index.html` pins **Sveltia CMS 0.178.0** rather than tracking
`latest`. npm versions are immutable, so the pin means an upstream change cannot
alter the admin page without a commit here. Bump it deliberately, then log in and
save a test edit before trusting it.

---

## Security notes

- **No secrets in this repo.** `public/admin/config.yml` is served publicly and
  contains only the field schema. The client ID is public by design; the client
  secret lives only in the Worker.
- **`/admin` is publicly reachable and that is fine.** It is inert without a GitHub
  login that has write access to this repo.
- **Escaping is escape-by-default.** Every `${}` in `templates/` must wrap its value
  in one of `esc` / `attr` / `url` / `md` / `mdInline` / `raw` from `lib/html.mjs`.
  `raw()` is the identity function and exists only so that

  ```shell
  grep -rn 'raw(' templates/
  ```

  is a complete audit of every unescaped surface on the site. It currently returns
  nothing. Keep it that way unless there is a real reason.
- **`url()` rejects anything that is not** `http(s):`, `mailto:`, `/` or `#`, so a
  pasted `javascript:` link fails the build rather than shipping.
- **No npm dependencies**, so there is no supply chain to compromise and nothing for
  Dependabot to report. The only pinned third-party code is the four first-party
  GitHub Actions in the workflow and the pinned Sveltia bundle.

---

## Troubleshooting

**"I saved in /admin but the site didn't change."**
Give it a minute. Then check the **Actions** tab. A red ✗ means the build rejected
something; the log names the file and the problem. The site stays on the last good
version until it is fixed.

**"Login fails / saving fails."**
Confirm the GitHub App is still installed on the repo with Contents: read & write,
and that you have Write access. Then run the Worker health check above.

**"A photo isn't showing."**
The build **fails** on a missing image rather than shipping a broken one, so this
usually means the upload didn't complete. Re-open the entry and re-add the image.

**"A lab member isn't bolded on the Publications page."**
The name in the author list must match their **People** entry, or one of that
entry's **Name aliases**. Add the spelling used on the paper (e.g. `I. Sabek`) to
their aliases. The build prints a warning when an author shares a surname with a
member but doesn't match — a likely typo.

---

## Maintenance

Roughly once or twice a year:

- Merge the Dependabot PRs for the GitHub Actions in `.github/workflows/`.
- Bump the pinned Sveltia version in `public/admin/index.html`, then log in and save
  a test edit to confirm it still works.

There is nothing else to update. There are no npm packages.
