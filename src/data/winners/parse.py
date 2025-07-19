import re
import sys

def parse_line(line):
    # Remove any "(N)" from country names, e.g. Bokia (2) → Bokia
    line = re.sub(r' \([\d]+\)', '', line)
    parts = line.strip().split('+')
    if not parts:
        return None

    print(parts)
    
    # Extract edition
    edition = parts[0]    # e.g., "NSC 1" → 1
    # Remove edition from parts
    rest = parts[1:]
    
    # Now, split the remainder into:
    # country, artist (may have multiple words), song (may have multiple words), and up to 3 numbers at the end.
    # The numbers may or may not be present, so we have to do this carefully.

    # The country is always the first token after NSC
    country = rest[0]
    # The rest is artist, song, and possible numbers

    # Let's work backwards: find the last 0 to 3 numbers
    numbers = []
    for token in reversed(rest):
        if re.match(r'^\d+$', token):
            numbers.insert(0, int(token))
        else:
            break
        if len(numbers) == 3:
            break
    # Get the index where the numbers start (from end)
    numbers_len = len(numbers)
    artist_and_song = rest[1:-numbers_len] if numbers_len else rest[1:]
    
    # Now, find where "artist" ends and "song" begins.
    # This is tricky, since both artist and song can have spaces.
    # Let's assume (for now) the artist is *always exactly one token* and everything else is song.
    # But with your data, sometimes artist is multiple words.
    # So let's assume that artist is **one or more tokens** before the song starts (which is arbitrary)
    # There is no simple way to automatically detect; in the future, consider using a separator or explicit marker.

    # TIP: If your real data sometimes has artist names with spaces, you need a smarter heuristic, or a fixed list.

    # For now, let's assume artist has 1 token unless the number of tokens is very large.
    # Otherwise, you need to decide a manual rule.
    if len(artist_and_song) == 1:
        artist = artist_and_song[0]
        song = ""
    else:
        # Heuristic: artist is first token, rest is song
        artist = artist_and_song[0]
        song = ' '.join(artist_and_song[1:])
    
    # Fill optional fields
    entry = {
        'edition': edition,
        'country': country,
        'artist': artist.strip(),
        'song': song.strip(),
    }
    if len(numbers) >= 1:
        entry['points'] = numbers[0]
    if len(numbers) >= 2:
        entry['wins'] = numbers[1]
    if len(numbers) >= 3:
        entry['margin'] = numbers[2]
    return entry

def export_to_js(entries):
    js_entries = []
    for entry in entries:
        props = []
        for k in ['edition', 'country', 'artist', 'song']:
            props.append(f'{k}: {repr(entry[k])}')
        for k in ['points', 'wins', 'margin']:
            if k in entry:
                props.append(f'{k}: {entry[k]}')
        js_entries.append(f'    {{{", ".join(props)}}}')
    js = 'const nscWinners = [\n' + ',\n'.join(js_entries) + '\n];\n\nexport default nscWinners;'
    return js

def main():
    # Read from stdin or file
    with open("nsc_input.txt", "r", encoding="utf-8") as f:
        input_text = f.read()
    lines = input_text.strip().split('\n')
    entries = []
    for line in lines:
        if not line.strip() or not line.strip().startswith('NSC '):
            continue
        entry = parse_line(line)
        if entry:
            entries.append(entry)
    js_code = export_to_js(entries)
    with open('nsc_winners.js', 'w', encoding='utf-8') as f:
        f.write(js_code)
    print('✅ JS dict written to nsc_winners.js')

if __name__ == '__main__':
    main()
