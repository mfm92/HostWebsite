import React from "react";
import FlipCard from "./FlipCard";
import ParticipationCard from "./ParticipationCard";

const gitCommitDate = process.env.REACT_APP_GIT_COMMIT_DATE;

// Format the date for Central European Summer Time (CEST)
const formatDateForCEST = (isoString) => {
  if (!isoString) return null;
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Berlin', // Handles CET/CEST as appropriate
    timeZoneName: 'short',     // Shows 'CET' or 'CEST'
  };
  return date.toLocaleString('en-US', options);
};

const Section = ({ title, entries, flip = true }) => {
  return (
    <section className="mb-12">
      {gitCommitDate && !flip && (
        <div className="mx-auto mt-2 inline-block rounded-md px-3 py-1 bg-gray-900/40 backdrop-blur text-xs text-gray-300 shadow-sm">
          Last updated on {formatDateForCEST(gitCommitDate)}
        </div>
      )}
      <h2 className="text-3xl font-bold text-center border-t-2 border-b-2 border-orange-400 bg-gray-900/90 text-white-200 mb-6 bg-gradient-to-r p-4 rounded-lg shadow-lg">
        {title} {flip ? "" : "(" + entries.filter(e => e.participating).length + "/60 entries confirmed)"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {entries.map((entry, idx) =>
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
