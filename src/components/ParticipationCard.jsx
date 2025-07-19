import React from "react";

const ParticipationCard = ({ entry }) => (
  <div
    className={
      entry.participating
        ? "bg-gradient-to-br w-full h-full from-orange-700/70 to-orange-400/70 text-white rounded-2xl p-4 shadow-lg border border-black-600"
        : "bg-gradient-to-br w-full h-full from-gray-950/70 to-gray-400/70 text-white rounded-2xl p-4 shadow-lg border border-black-600"
    }
  >
    <div className="text-center text-lg font-bold opacity-90">
      {entry.participating ? "🎉" : "⏳"} {entry.nation} {entry.participating ? "🎉" : ""} {entry.reserve ? "(⚠️ reserve ⚠️)" : ""}
    </div>
  </div>
);

export default ParticipationCard;
