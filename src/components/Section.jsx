import React from "react";
import FlipCard from "./FlipCard";
import ParticipationCard from "./ParticipationCard";
import AnimatedEntryProgressBar from "./EntryProgressBar";
import ScrollBanner from "./BannerScroll";
import { entries as globEntries } from "../data/entries";

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

const titleTranslate = {
  "Semi 1": ["semi1", "pq1"],
  "Semi 2": ["semi2", "pq2"]
};

const Section = ({ title, entries, flip = true }) => {
  const confirmed = entries.filter(e => e.participating).length;
  const total = 60; // Adjust as needed

  // Banner: Only for Semi 1/Semi 2
  const showBanner = (title === "Semi 1" || title === "Semi 2");
  const bannerEntries = showBanner
    ? globEntries
        .filter(entry => titleTranslate[title].includes(entry.group))
        .sort((a, b) => {
            // Check if group starts with 'pq'
            const aIsPQ = a.group?.startsWith('pq') ? 1 : 0;
            const bIsPQ = b.group?.startsWith('pq') ? 1 : 0;

            // Rank non-pq groups before pq groups
            if (aIsPQ !== bIsPQ) {
                return aIsPQ - bIsPQ;
            }

            // If both are pq (or both are not), sort by order field (default: Infinity)
            return (a.order || Infinity) - (b.order || Infinity);
        })
    : [];

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

      {/* Content + Banner gap grouped in a column */}
      <div className="flex flex-col gap-y-8">
        {/* Grid of cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {entries
            .slice() // avoid mutating the original array
            .sort((a, b) => {
              if (flip) {
                return (a.order || 0) - (b.order || 0);
              } else {
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

        {/* Banner row BELOW or ABOVE grid */}
        {showBanner && (
          <div className="w-full">
            <ScrollBanner participants={bannerEntries} label={`${title} - VOTING LINES ARE OPEN`}/>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default Section;
