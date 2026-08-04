/* Date formatting for news items.
 *
 * In lib/ rather than build.mjs so the CMS preview renders the same date string
 * the built page will -- see the note at the top of lib/publication.mjs.
 */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2025-09-27" -> "September 27, 2025". Returns the input unchanged if it is
 *  not a plain ISO date, so a half-typed value in the editor shows as typed. */
export function displayDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso ?? ""));
  if (!m) return String(iso ?? "");
  const [, y, mo, d] = m;
  const name = MONTHS[Number(mo) - 1];
  return name ? `${name} ${Number(d)}, ${y}` : String(iso);
}

/** Add the fields templates expect. Safe to call on a half-filled draft. */
export const normalizeNews = (n = {}) => ({ ...n, displayDate: displayDate(n.date) });

/** Newest first. */
export const byDateDesc = (a, b) => String(b.date ?? "").localeCompare(String(a.date ?? ""));
