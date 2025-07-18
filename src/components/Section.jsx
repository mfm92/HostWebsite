import React from "react";
import FlipCard from "./FlipCard";
import ParticipationCard from "./ParticipationCard";

const Section = ({ title, entries, flip = true }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-center bg-gray-900/90 text-blue-200 mb-6 bg-gradient-to-r p-4 rounded-lg shadow-lg">
        {title}
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
