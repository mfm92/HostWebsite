import React from "react";
import FlipCard from "./FlipCard";
import ParticipationCard from "./ParticipationCard";
import AnimatedEntryProgressBar from "./EntryProgressBar"; // Import new bar

const gitCommitDate = process.env.REACT_APP_GIT_COMMIT_DATE;

const formatDateForCEST = (isoString) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Berlin',
    timeZoneName: 'short',
  };
  return date.toLocaleString('en-US', options);
};

const Section = ({ title, entries, flip = true }) => {
  const confirmed = entries.filter(e => e.participating).length;
  const total = 60; // You can make this dynamic if needed

  return (
    <section className="mb-12">
      {gitCommitDate && !flip && (
        <div className="mx-auto mt-2 inline-block rounded-md px-3 py-1 bg-gray-900/40 backdrop-blur text-xs text-gray-300 shadow-sm">
          Last updated on {formatDateForCEST(gitCommitDate)}
        </div>
      )}
      <h2 className="text-3xl font-bold text-center border-t-2 border-b-2 border-orange-400 bg-gray-900/90 text-white-200 mb-3 bg-gradient-to-r p-4 rounded-lg shadow-lg">
        {title}
      </h2>
      {!flip && <AnimatedEntryProgressBar confirmed={confirmed} total={total} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {entries
          .slice() // to avoid mutating the original array
          .sort((a, b) => {
            if (flip) {
              // sort by order (assuming entry.order is a number)
              return (a.order || 0) - (b.order || 0);
            } else {
              // sort by nation name
              return a.nation.localeCompare(b.nation);
            }
          })
          .map((entry, idx) =>
            flip ? (
              <FlipCard entry={entry} key={idx} />
            ) : (
              <ParticipationCard entry={entry} key={idx} />
            )
          )}

      </div>
    </section>
  );
};

export default Section;
