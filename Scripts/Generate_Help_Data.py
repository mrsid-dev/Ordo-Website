from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path


WEBSITE_ROOT = Path(__file__).resolve().parents[1]
ORDO_HELP_DOCS = WEBSITE_ROOT.parent / "Ordo" / "Utils" / "Help_Docs.py"
OUTPUT_FILE = WEBSITE_ROOT / "JS" / "Help_Data.js"
EXCLUDED_CATEGORY_KEYS = {"server-specific"}


def load_help_docs():
    spec = importlib.util.spec_from_file_location("ordo_help_docs", ORDO_HELP_DOCS)
    if spec is None or spec.loader is None:
      raise RuntimeError(f"Unable to load {ORDO_HELP_DOCS}")

    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


def build_payload(module) -> dict:
    excluded = set(module.INTERNAL_HELP_ROOTS) | EXCLUDED_CATEGORY_KEYS
    categories = []

    for category in module.HELP_CATEGORIES:
        if category.key in excluded or any(root in module.INTERNAL_HELP_ROOTS for root in category.roots):
            continue

        categories.append({
            "key": category.key,
            "label": category.label,
            "emojiKey": category.emoji_key,
            "roots": list(category.roots),
            "overview": category.overview,
            "featureNotes": list(category.feature_notes),
            "commands": [
                {
                    "path": doc.path,
                    "summary": doc.summary,
                    "details": doc.details,
                    "usage": doc.usage,
                    "notes": list(doc.notes),
                }
                for doc in category.command_docs.values()
            ],
        })

    return {
        "source": str(ORDO_HELP_DOCS).replace("\\", "/"),
        "excludedCategoryKeys": sorted(excluded),
        "categories": categories,
    }


def main() -> None:
    module = load_help_docs()
    payload = build_payload(module)
    content = (
        f"// Generated from {payload['source']}.\n"
        "// Re-run Scripts/Generate_Help_Data.py when Ordo help categories change.\n"
        f"window.ORDO_HELP_DATA = Object.freeze({json.dumps(payload, indent=2)});\n"
    )
    OUTPUT_FILE.write_text(content, encoding="utf-8")
    print(f"Wrote {OUTPUT_FILE} with {len(payload['categories'])} public categories.")


if __name__ == "__main__":
    main()
