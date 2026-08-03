/* NEXDIG Lab — the entire client-side JavaScript for the site.
 * Replaces a 257 KB React bundle. Every feature guards on element presence so
 * one file can serve every page. */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- copy buttons: BibTeX blocks and citation lines ---- */
  const flash = (btn, label) => {
    const original = btn.textContent;
    btn.textContent = label;
    setTimeout(() => { btn.textContent = original; }, 1600);
  };

  document.querySelectorAll("[data-copy-citation]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.closest(".cite-entry").querySelector("[data-citation]").textContent.trim();
      try {
        await navigator.clipboard.writeText(text);
        flash(btn, "Copied!");
      } catch {
        /* ignore */
      }
    });
  });

  /* ---- BibTeX copy buttons ---- */
  document.querySelectorAll("[data-copy-bibtex]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      // textContent reads back unescaped, so the LaTeX reaches the clipboard intact.
      const code = btn.closest(".bibtex").querySelector("code").textContent;
      try {
        await navigator.clipboard.writeText(code);
        flash(btn, "Copied!");
      } catch {
        /* ignore, same as the previous implementation */
      }
    });
  });
});
