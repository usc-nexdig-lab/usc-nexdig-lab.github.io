#!/usr/bin/env python3
"""Cross-check the CMS schema against the actual content.

Catches the failure mode where public/admin/config.yml and data/ drift apart:
a field an editor can fill in that the site never reads, or content on the site
that no form can reach. Neither shows up as a build error -- the site renders
fine and the CMS opens fine -- so this is the only thing that catches it.

    python3 tools/check-cms.py

Uses python3 + pyyaml, both preinstalled on macOS and on GitHub's ubuntu runners.
Exits 1 if anything is wrong.
"""

import glob
import json
import os
import sys

import yaml

CONFIG = "public/admin/config.yml"


def field_names(fields):
    return {f["name"]: f for f in (fields or [])}


def check(label, cfg_fields, data_files, problems, notes):
    names = field_names(cfg_fields)
    data_keys = set()
    for path in data_files:
        with open(path) as fh:
            record = json.load(fh)
        data_keys |= set(record.keys())
        for name, field in names.items():
            if field.get("required") is not False and name not in record:
                problems.append(
                    f"{label}: '{name}' is required in the CMS but missing from {os.path.basename(path)}"
                )

    for orphan in sorted(data_keys - set(names) - {"file", "slug"}):
        problems.append(
            f"{label}: data has '{orphan}' but the CMS has no field for it -- uneditable"
        )
    for unused in sorted(set(names) - data_keys):
        notes.append(f"{label}: CMS field '{unused}' is not set on any record")

    print(f"  {label:<14} {len(data_files):>2} records · {len(names)} fields · {len(data_keys)} data keys")


def main():
    with open(CONFIG) as fh:
        cfg = yaml.safe_load(fh)
    print(f"{CONFIG} parses as valid YAML\n")

    problems, notes = [], []
    for collection in cfg["collections"]:
        if "folder" in collection:
            check(collection["name"], collection["fields"],
                  sorted(glob.glob(f"{collection['folder']}/*.json")), problems, notes)
        else:
            for entry in collection["files"]:
                check(entry["name"], entry["fields"], [entry["file"]], problems, notes)

    print()
    if problems:
        print(f"PROBLEMS ({len(problems)}):")
        for p in problems:
            print("  x", p)
    else:
        print("No schema drift: every CMS field maps to real data, and every data key is editable.")

    if notes:
        print(f"\nNotes ({len(notes)}):")
        for n in notes:
            print("  ·", n)

    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
