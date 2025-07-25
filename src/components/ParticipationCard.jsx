import React from "react";

const ParticipationCard = ({ entry }) => {
  const partColor = entry.participating
    ? "from-orange-700/70 to-orange-400/70"
    : entry.banned
    ? "from-red-700/70 to-red-400/70"
    : "from-gray-950/70 to-gray-400/70";

  return (
    <div
      className={`bg-gradient-to-br w-full h-full ${partColor} text-white rounded-2xl p-4 shadow-lg border border-black-600`}
    >
      <div className="text-center text-lg font-bold opacity-90">
        {entry.participating ? "🎉" : entry.banned ? "🚫" : "⏳"} {entry.nation}{" "}
        {entry.participating && "🎉"}
        {entry.reserve && <sup>R</sup>}
        {entry.pq && <sup>PQ</sup>}
        {entry.banned && "🚫"}
      </div>
    </div>
  );
};

export default ParticipationCard;
