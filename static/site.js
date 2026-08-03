/* NEXDIG Lab — the entire client-side JavaScript for the site.
 * Replaces a 257 KB React bundle. Every feature guards on element presence so
 * one file can serve every page. */

document.addEventListener("DOMContentLoaded", () => {
  /* ---- homepage photo carousel ---- */
  const el = document.querySelector("[data-carousel]");
  if (el) {
    const slides = JSON.parse(el.dataset.carousel);
    const img = el.querySelector(".carousel__img");
    const caption = el.querySelector(".carousel__caption");
    let i = 0;
    let timer;

    const show = (n) => {
      i = (n + slides.length) % slides.length;
      img.src = slides[i].src;
      img.alt = slides[i].caption;
      caption.textContent = slides[i].caption;
    };
    const start = () => { timer = setInterval(() => show(i + 1), 4000); };
    const restart = () => { clearInterval(timer); start(); };

    el.querySelector(".carousel__btn--prev").addEventListener("click", () => { show(i - 1); restart(); });
    el.querySelector(".carousel__btn--next").addEventListener("click", () => { show(i + 1); restart(); });
    if (slides.length > 1) start();
  }

  /* ---- BibTeX copy buttons ---- */
  document.querySelectorAll("[data-copy-bibtex]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      // textContent reads back unescaped, so the LaTeX reaches the clipboard intact.
      const code = btn.closest(".bibtex").querySelector("code").textContent;
      try {
        await navigator.clipboard.writeText(code);
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = "Copy"; }, 1600);
      } catch {
        /* ignore, same as the previous implementation */
      }
    });
  });
});
