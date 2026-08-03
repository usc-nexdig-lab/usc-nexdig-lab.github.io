/* NEXDIG Lab — the only client-side JavaScript on the site.
 *
 *   1. copy buttons on the BibTeX citation blocks
 *   2. a lightbox for the homepage photo gallery
 *
 * Both degrade cleanly: without JavaScript the citations are still selectable
 * and the gallery is still a grid of photos.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------------------------------- BibTeX copy buttons */
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

  /* --------------------------------------------------------------- lightbox */
  const triggers = [...document.querySelectorAll("[data-lightbox]")];
  if (!triggers.length) return;

  const photos = triggers.map((t) => ({ src: t.dataset.src, caption: t.dataset.caption }));
  let index = 0;
  let lastFocused = null;

  const box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Close">&times;</button>
    <button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Previous photo">&#8249;</button>
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="" />
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Next photo">&#8250;</button>`;
  document.body.appendChild(box);

  const img = box.querySelector(".lightbox__img");
  const caption = box.querySelector(".lightbox__caption");
  const btnClose = box.querySelector(".lightbox__close");
  const single = photos.length < 2;
  if (single) box.querySelectorAll(".lightbox__nav").forEach((b) => (b.hidden = true));

  const show = (i) => {
    index = (i + photos.length) % photos.length;
    img.src = photos[index].src;
    img.alt = photos[index].caption;
    caption.textContent = photos[index].caption
      ? `${photos[index].caption}  ·  ${index + 1} / ${photos.length}`
      : `${index + 1} / ${photos.length}`;
  };

  const open = (i) => {
    lastFocused = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add("has-lightbox");
    btnClose.focus();
  };

  const close = () => {
    box.hidden = true;
    document.body.classList.remove("has-lightbox");
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach((t, i) => t.addEventListener("click", () => open(i)));
  btnClose.addEventListener("click", close);
  box.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(index - 1));
  box.querySelector(".lightbox__nav--next").addEventListener("click", () => show(index + 1));

  // Click the backdrop, but not the photo or the controls.
  box.addEventListener("click", (e) => { if (e.target === box) close(); });

  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft" && !single) show(index - 1);
    else if (e.key === "ArrowRight" && !single) show(index + 1);
    else if (e.key === "Tab") { e.preventDefault(); btnClose.focus(); } // simple focus trap
  });
});
