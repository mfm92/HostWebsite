import csv

filename = "semifinal2.csv"

with open("entries.json", "r", encoding="utf-8") as f:
    import json
    entries = json.load(f)

with open(filename, newline='', encoding="utf-8") as f:
    reader = list(csv.reader(f))
    rows = [r for r in reader if any(r)]
    headers = rows[0]

    first_vote_col = 4  # the first voter name appears here

    # Function: votes FROM a given voter
    def votes_from_voter(voter_name, nationsCodeMap):
        voter_dict = {}
        try:
            col_idx = headers.index(voter_name, first_vote_col)
        except ValueError:
            print(f"Voter '{voter_name}' not found.")
            return
        print(f"Votes given by {voter_name}:")
        for r in rows[1:]:
            recipient = r[0].strip()
            if recipient == "" or recipient.upper() == voter_name.upper():
                continue
            points = r[col_idx].strip()
            if points.isdigit():
                voter_dict[points] = nationsCodeMap[recipient]
        return voter_dict

    # Function: votes TO a given recipient
    def votes_for_country(recipient_name):
        print(f"Votes received by {recipient_name}:")
        row_idx = None
        for i, r in enumerate(rows):
            if r[0].strip().upper() == recipient_name.upper():
                row_idx = i
                break
        if row_idx is None:
            print(f"Recipient '{recipient_name}' not found.")
            return
        for col_idx in range(first_vote_col, len(headers)):
            voter = headers[col_idx]
            points = rows[row_idx][col_idx].strip()
            if points.isdigit():
                print(f"  - {voter}: {points} points")

    # Example

    entries = entries["entries"]

    nationsCodeMapSmaller = {e["nation"]: e["code"] for e in entries}
    nationsCodeMap = {e["nation"].upper(): e["code"] for e in entries}

    votes_from_begonia = votes_from_voter("Begonia", nationsCodeMap)
    print(votes_from_begonia)

    votes = {}
    for nation in nationsCodeMapSmaller:
        votesss = votes_from_voter(nation, nationsCodeMap)
        if votesss:
            votes[nationsCodeMapSmaller[nation]] = votesss

    print(votes)

    