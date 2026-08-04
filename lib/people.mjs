/* The groups a lab member can belong to, in the order they appear on the People
   page. One list, because this was previously spelled out in three places --
   the sort order and the validation in build.mjs, and the headings in
   templates/pages.mjs -- and adding a group meant remembering all three.

   The keys are what data/people/*.json stores; changing one orphans everybody
   currently in that group, so add and reorder freely but rename with care. The
   matching options live in public/admin/config.yml, which check-cms.py does not
   cross-check -- a new group has to be added there too. */
export const GROUPS = [
  ["faculty", "Faculty"],
  ["phd", "PhD Students"],
  ["masters", "Master Students"],
  ["undergrad", "Undergraduate Students"],
  ["alumni", "Alumni"],
];

/** Just the stored values, in display order -- for sorting and validation. */
export const GROUP_KEYS = GROUPS.map(([key]) => key);
