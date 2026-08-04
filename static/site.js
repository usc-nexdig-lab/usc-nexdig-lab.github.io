/* NEXDIG Lab — the only client-side JavaScript on the site.
 *
 *   1. copy buttons on the BibTeX citation blocks
 *   2. the arrows and dots on the homepage photo carousel
 *
 * Both degrade cleanly: without JavaScript the citations are still selectable,
 * and the carousel is still a strip that scrolls and swipes -- its controls
 * ship hidden and are unhidden here, so they are never dead.
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

  /* -------------------------------------------------------- photo carousel */
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const viewport = root.querySelector("[data-carousel-viewport]");
    const slides = [...root.querySelectorAll(".carousel__slide")];
    const prev = root.querySelector("[data-carousel-prev]");
    const next = root.querySelector("[data-carousel-next]");
    const dots = [...root.querySelectorAll("[data-carousel-dot]")];
    if (!viewport || slides.length < 2 || !prev || !next) return;

    let index = 0;

    /* scrollIntoView would also scroll the page to the carousel; setting
       scrollLeft on the viewport alone moves nothing else. */
    const go = (i) => {
      index = (i + slides.length) % slides.length;
      viewport.scrollTo({ left: slides[index].offsetLeft - slides[0].offsetLeft, behavior: "smooth" });
      mark();
    };

    const mark = () => dots.forEach((d, i) => {
      if (i === index) d.setAttribute("aria-current", "true");
      else d.removeAttribute("aria-current");
    });

    prev.hidden = false;
    next.hidden = false;
    const dotBar = root.querySelector(".carousel__dots");
    if (dotBar) dotBar.hidden = false;

    prev.addEventListener("click", () => go(index - 1));
    next.addEventListener("click", () => go(index + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => go(i)));

    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
    });

    /* A swipe moves the strip without going through go(), so the dots follow
       the scroll position rather than the last button pressed. */
    let tick;
    viewport.addEventListener("scroll", () => {
      clearTimeout(tick);
      tick = setTimeout(() => {
        const middle = viewport.scrollLeft + viewport.clientWidth / 2;
        const origin = slides[0].offsetLeft;
        index = slides.reduce(
          (best, s, i) =>
            Math.abs(s.offsetLeft - origin + s.offsetWidth / 2 - middle) <
            Math.abs(slides[best].offsetLeft - origin + slides[best].offsetWidth / 2 - middle)
              ? i
              : best,
          0
        );
        mark();
      }, 90);
    });
  });
});
