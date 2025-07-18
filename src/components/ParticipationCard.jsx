import React from "react";

const ParticipationCard = ({ entry }) => (
  <div
    className={
      entry.artist
        ? "bg-gradient-to-br w-full h-full from-green-700/70 to-green-400/70 text-white rounded-2xl p-4 shadow-lg border border-black-600"
        : "bg-gradient-to-br w-full h-full from-gray-950/70 to-gray-400/70 text-white rounded-2xl p-4 shadow-lg border border-black-600"
    }
  >
    <div className="text-center text-lg font-bold opacity-90">
      {entry.artist ? "🎉" : "⏳"} {entry.nation} {entry.artist ? "🎉" : ""}
    </div>
  </div>
);

export default ParticipationCard;
