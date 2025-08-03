import React from "react";
import { useState, useEffect } from "react";

// Replace these with live state or props as needed!
const mockSubmittedCountries = [
  "Griffin Empire", "Afnia", "Roseland", "Sakuralia", "Halito", "Begonia", "Emsfrynt", "Cydoni-Gibberia"
];
const mockSubmittedRejuCountries = [
  "Griffin Empire", "Roseland"
];

function FlagImage({ nation, reju }) {
  const extensions = ["png", "jpeg", "jpg"];
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
    <span className="relative inline-block w-8 h-8">
      <img
        src={src}
        alt={`${nation} flag`}
        className="w-8 h-8 object-cover rounded-full border-1.5 hover:border-3 hover:animate-pulse border-orange-400 bg-white shadow-sm"
        loading="eager"
        onError={handleError}
        title={nation}
      />
    </span>
  );
}

export default function VotingInfoAndVotes() {
    const [submittedCountries, setSubmittedCountries] = useState(mockSubmittedCountries);
    const [submittedRejuCountries, setSubmittedRejuCountries] = useState(mockSubmittedRejuCountries);

    // Read commit date from env; optional formatting
  const commitDateRaw = process.env.REACT_APP_GIT_COMMIT_DATE || "";
  const commitDate = (() => {
    try {
      if (!commitDateRaw) return "";
      const d = new Date(commitDateRaw);
      if (isNaN(d)) return commitDateRaw; // fallback to raw string
      // Format nicely, e.g. "Jul 29, 2025 22:52 CEST"
      return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "short",
      });
    } catch {
      return commitDateRaw;
    }
  })();

  return (
    <div className="flex flex-col text-center md:flex-row justify-center items-stretch gap-9 w-full">
      {/* Voting Info */}
        <div className="relative w-full mx-auto text-center backdrop-blur-xl p-10 rounded-2xl shadow-lg border-t-4 border-b-4 border-orange-400/70 mb-10 md:mb-0">
        <div className="text-white text-2xl font-extrabold mb-3 uppercase tracking-wide">
            Send your votes! (Both Regular and Reju)
        </div>
        <ul className="text-orange-50 text-base space-y-2 mx-auto">
            <li>
            <span className="font-bold text-orange-300 pr-2">On ESCUnited to:</span>
            <span className="underline">pjelacki</span> and (optionally) {" "}
            <span className="underline">NSC Host Helper</span>
            </li>
            <li>
            <span className="font-bold text-orange-200 pr-2">On Discord to:</span>
            <span className="bg-black/80 rounded-lg">mfmo92 </span>
            <br/><br/>
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

      {/* Votes + Reju Votes */}
      <div className="relative w-full mx-auto text-center bg-gray/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border-t-4 border-b-4 border-orange-400/70 flex flex-col justify-between">
        <div>
          <div className="uppercase text-orange-700 font-bold mb-2 text-center tracking-wide">
            Votes received from
          </div>
          <div className="flex flex-wrap gap-2 justify-center min-h-[36px] w-full mb-4">
            {submittedCountries.length === 0 ? (
              <span className="text-gray-400 text-xs">None yet</span>
            ) : (
              submittedCountries.sort().map((nation) => (
                <div
                  key={nation}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <FlagImage nation={nation} />
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="uppercase text-orange-700 font-bold mb-2 text-center tracking-wide mt-5">
            Reju Votes received from
          </div>
          <div className="flex flex-wrap gap-2 justify-center min-h-[36px] w-full">
            {submittedRejuCountries.length === 0 ? (
              <span className="text-gray-400 text-xs">None yet</span>
            ) : (
              submittedRejuCountries.sort().map((nation) => (
                <div
                  key={nation}
                  className="w-8 h-8 flex items-center justify-center"
                >
                  <FlagImage nation={nation} reju />
                </div>
              ))
            )}
          </div>
        </div>
        {/* Commit/build info */}
        {commitDate && (
          <div className="mt-6 text-xs text-orange-300 italic select-none">
            Latest update: {commitDate}
          </div>
        )}
      </div>
    </div>
  );
}
