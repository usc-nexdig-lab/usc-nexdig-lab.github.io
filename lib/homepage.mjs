/* Fill in what a homepage draft may be missing.
 *
 * Every field is optional in the CMS, so an editor can clear the join-us box or
 * save a half-filled draft. Without this the template reads h.cta.heading off
 * undefined and takes the whole build down -- and the preview with it. Same
 * contract as lib/project.mjs: decide here what each gap becomes, once, and let
 * both the build and the preview call it.
 */

/** True only when the button has both a label and a destination. */
const usableCta = (cta) => Boolean(cta && cta.label && cta.href);

export function normalizeHomepage(h = {}) {
  const cta = h.cta ?? {};
  return {
    ...h,
    tagline: h.tagline ?? "",
    intro: h.intro ?? "",
    photosHeading: h.photosHeading ?? "Lab Appearance",
    // A photo with no src cannot be rendered; drop it rather than emit a broken image.
    photos: (h.photos ?? []).filter((p) => p && p.src),
    cta: {
      heading: cta.heading ?? "",
      body: cta.body ?? "",
      label: cta.label ?? "",
      href: cta.href ?? "",
      // The band is dropped entirely unless the button can actually go somewhere.
      show: usableCta(cta),
    },
  };
}
