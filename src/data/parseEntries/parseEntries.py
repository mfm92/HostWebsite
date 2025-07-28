import json
import re

entries = []
with open("entriesRaw.csv", encoding="utf-8") as f:
    for line in f:
        # Split by 2 or more spaces (handles tabs and mixed whitespace too)
        parts = [p.strip() for p in re.split(r'\t', line.strip()) if p.strip()]
        if len(parts) < 4:
            # Fallback: split all words, and then reconstruct nation
            words = [w.strip() for w in line.strip().split() if w.strip()]
            if len(words) >= 4:
                nation = " ".join(words[:-3])
                artist, song, youtube = words[-3:]
            else:
                continue  # Skip malformed line
        else:
            nation, artist, song, youtube = parts
        entry = {
            "nation": nation.replace(" (reserve!)", ""),
            "participating": True,
            "artist": artist,
            "song": song,
            "youtube": youtube
        }
        entries.append(entry)

print(json.dumps(entries, indent=2, ensure_ascii=False))