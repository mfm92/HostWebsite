import React from "react";
import FlipCard from "./FlipCard";
import ParticipationCard from "./ParticipationCard";
import AnimatedEntryProgressBar from "./EntryProgressBar";
import ScrollBanner from "./BannerScroll";
import { entries as globEntries } from "../data/entries";
import { ResultsTable } from "./ResultsTable";
import VotingInformation from "./VotingInformation";

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
  "Semi 2": ["semi2", "pq2"],
  "Final": ["final"]
};

// Helper to check if entry.group includes any of the groups (array or string)
const groupIncludesAny = (entryGroup, groups) => {
  if (Array.isArray(entryGroup)) {
    return groups.some(g => entryGroup.includes(g));
  } else {
    return groups.includes(entryGroup);
  }
};

const Section = ({ title, entries, flip = true }) => {
  const confirmed = entries.filter(e => e.participating).length;
  const total = 60; // Adjust as needed

  // Check if this is a results tab
  const isResultsSection = title === "SEMI 1 NQ Results" || title === "SEMI 2 NQ Results" ||
    title === "SEMI 1 RJ NQ Results" || title === "SEMI 2 RJ NQ Results";
  const reju = title.endsWith("RJ NQ Results");
  const votingLinesOpen = new Date() < new Date("2025-08-07T17:59:00Z");
  const votingLinesText = votingLinesOpen
    ? `${title} - VOTING LINES ARE OPEN`
    : `${title} - VOTING LINES ARE CLOSED`;

  // Banner: Show on Semi 1, Semi 2, and Final
  const showBanner = (title === "Final");

  // Get banner entries matching the groups for this title
  const bannerEntries = showBanner
    ? globEntries
        .filter(entry => groupIncludesAny(entry.group, titleTranslate[title] || []))
        .sort((a, b) => {
          return (a.finalOrder || Infinity) - (b.finalOrder || Infinity);
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

      {!flip && !isResultsSection && (
        <AnimatedEntryProgressBar confirmed={confirmed} total={total} />
      )}

      <div className="flex flex-col gap-y-8">
        {!isResultsSection ? (
          <>
            {/* Grid of cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
              {entries
                .slice()
                .sort((a, b) => {
                  if (title === "Final") {
                    return (a.finalOrder || 0) - (b.finalOrder || 0);
                  } else if (flip) {
                    return (a.order || 0) - (b.order || 0);
                  } else {
                    return a.nation.localeCompare(b.nation);
                  }
                })
                .map((entry, idx) => (
                  <FlipCard 
                    entry={entry} 
                    key={idx} 
                    showFinalOrder={title === "Final"} 
                  />
                ))}
            </div>

            {/* Banner row */}
            {showBanner && (
              <div className="w-full">
                <ScrollBanner
                  participants={bannerEntries}
                  label={votingLinesText}
                />
              </div>
            )}
          </>
        ) : (
          <ResultsTable entries={entries} reju={reju} />
        )}
      </div>

      {title === "Final" && (
  <div className="mt-8">
    <VotingInformation />
  </div>
)}

    </section>
  );
};

export default Section;
