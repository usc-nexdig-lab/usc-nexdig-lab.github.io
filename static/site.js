/* NEXDIG Lab — the only client-side JavaScript on the site.
 * Copy buttons for the BibTeX citation blocks. Everything else is CSS. */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-copy-cite]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      // textContent reads back unescaped, so LaTeX reaches the clipboard intact.
      const text = btn.closest(".cite").querySelector("code").textContent;
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add("is-copied");
        setTimeout(() => btn.classList.remove("is-copied"), 1600);
      } catch {
        /* clipboard unavailable — the text is still selectable */
      }
    });
  });
});
