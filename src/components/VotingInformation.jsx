import React, { useState, useEffect, useMemo } from "react";
import { entries } from "../data/entries";

const extensions = ["png", "jpeg", "jpg"];

// Flag image with automatic extension fallback
function FlagImage({ nation }) {
  const [extIndex, setExtIndex] = useState(0);
  const [src, setSrc] = useState(`/flags/${nation}.${extensions[0]}`);

  useEffect(() => {
    setExtIndex(0);
    setSrc(`/flags/${nation}.${extensions[0]}`);
  }, [nation]);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const next = extIndex + 1;
      setExtIndex(next);
      setSrc(`/flags/${nation}.${extensions[next]}`);
    } else {
      setSrc("/flags/Default.png");
    }
  };

  return (
    <img
      src={src}
      alt={`${nation} flag`}
      title={nation}
      loading="eager"
      onError={handleError}
      className="w-8 h-8 object-cover rounded-full border-1 border-orange-400 bg-white shadow-sm"
    />
  );
}

// Flag + code horizontally compact
function FlagWithCode({ nation, code }) {
  return (
    <div className="flex items-center gap-2 mx-1 whitespace-nowrap">
      <FlagImage nation={nation} />
    </div>
  );
}

function FlagRow({ label, entries }) {
  // Set label width wide enough for the longest label
  return (
    <div className="flex items-center py-1 w-full select-none">
      <span className="text-orange-500 uppercase tracking-wide font-semibold text-left w-40 mr-2 shrink-0">
        {label}
      </span>
      <div className="flex overflow-x-auto scrollbar-thin max-w-full">
        {entries.length === 0 ? (
          <span className="text-gray-400 text-xs px-2">None yet</span>
        ) : (
          entries.map((entry) => (
            <FlagWithCode key={entry.nation} nation={entry.nation} code={entry.code} />
          ))
        )}
      </div>
    </div>
  );
}


// Reusable filter + sort by groups helper
function filterAndSort(entriesArray, groups) {
  return entriesArray
    .filter((entry) => groups.includes(entry.group))
    .sort((a, b) => (a.nation > b.nation ? 1 : -1));
}

export default function VotingInfoAndVotes() {
  const submittedCountries = entries.filter((entry) => entry.semiVoted);
  const submittedRejuCountries = entries.filter((entry) => entry.rejuVoted);

  const commitDateRaw = process.env.REACT_APP_GIT_COMMIT_DATE || "";
  const commitDate = useMemo(() => {
    if (!commitDateRaw) return "";
    const d = new Date(commitDateRaw);
    if (isNaN(d)) return commitDateRaw;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short",
    });
  }, [commitDateRaw]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-stretch gap-9 w-full">
      {/* Left panel - instructions */}
      <div className="relative w-full md:w-2/5 max-w-lg mx-auto text-center backdrop-blur-xl p-10 rounded-2xl shadow-lg border-t-4 border-b-4 border-orange-400/70 mb-10 md:mb-0 flex-grow-0 select-none">
        <div className="text-white text-2xl font-extrabold mb-3 uppercase tracking-wide">
          Send your votes! (Both Regular and Reju)
        </div>
        <ul className="text-orange-50 text-base space-y-2 mx-auto">
          <li>
            <span className="font-bold text-orange-300 pr-2">On ESCUnited to:</span>
            <span className="underline">pjelacki</span> and (optionally){" "}
            <span className="underline">NSC Host Helper</span>
          </li>
          <li>
            <span className="font-bold text-orange-200 pr-2">On Discord to:</span>
            <span className="bg-black/80 rounded-lg px-2">mfmo92</span>
            <br />
            <br />
            <a
              href="https://discord.gg/hYzzgNpX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-200 animate-pulse hover:text-white hover:bg-orange-700 px-3 py-1 rounded transition"
            >
              <b>Click to join NSC Discord</b>
            </a>
          </li>
        </ul>
      </div>

      {/* Right panel - votes */}
      <div className="relative w-full md:w-3/5 mx-auto text-center bg-gray/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border-t-4 border-b-4 border-orange-400/70 flex flex-col justify-between flex-grow select-none">
        <div>
          <div className="uppercase text-orange-700 font-bold mb-4 text-center tracking-wide text-lg">
            Votes received from
          </div>

          {/* Normal votes groupings */}
          <FlagRow label="Semi 1 (Reg)" entries={filterAndSort(submittedCountries, ["semi1", "pq1"])} />
          <FlagRow label="Semi 1 (ReJu)" entries={filterAndSort(submittedRejuCountries, ["semi1", "pq1"])} />
          <FlagRow label="Semi 2 (Reg)" entries={filterAndSort(submittedCountries, ["semi2", "pq2"])} />
          <FlagRow label="Semi 2 (ReJu)" entries={filterAndSort(submittedRejuCountries, ["semi2", "pq2"])} />
        </div>

        {/* Commit/build info */}
        {commitDate && (
          <div className="mt-8 text-xs text-orange-300 italic select-none">
            Latest update: {commitDate}
          </div>
        )}
      </div>
    </div>
  );
}
