import React from "react";
import "../styles/ParticipationCard.css"; // New: Import the CSS

const ParticipationCard = ({ entry }) => {
  const statusGradients = entry.participating
    ? "bg-gradient-to-br from-orange-800/70 to-orange-300/60"
    : entry.banned
    ? "bg-gradient-to-br from-rose-700/80 to-red-400/50"
    : "bg-gradient-to-br from-zinc-800/80 to-slate-400/60";

  const ringColor = entry.participating
    ? "ring-2 ring-orange-500"
    : entry.banned
    ? "ring-2 ring-rose-500"
    : "ring-2 ring-slate-400";

  const statusIcon = entry.participating
    ? "🎉"
    : entry.banned
    ? "🚫"
    : "⏳";

  return (
    <div
      className={`relative backdrop-blur-xl w-full bg-opacity-70 ${statusGradients} ${ringColor} shadow-xl rounded-2xl p-5 flex flex-col justify-center items-center transition-all hover:scale-105 hover:shadow-2xl cool-border`}
    >
      <div className="absolute bottom-3 right-4 opacity-40 text-3xl pointer-events-none">
        {statusIcon}
      </div>
      <div className="font-extrabold text-2xl text-center text-white drop-shadow-lg mb-2 flex items-center gap-2 font-proximanova">
        {entry.nation}
        {entry.reserve && (
          <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded text-white-100">R</span>
        )}
        {entry.pq && (
          <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded text-white-200">PQ</span>
        )}
      </div>
      <div className="h-[1.5px] w-1/2 bg-white/30 rounded my-1" />
      <div className="uppercase tracking-wide text-xs text-zinc-100 opacity-70 mt-2">
        {entry.participating
          ? "Participating"
          : entry.banned
          ? "Has to skip"
          : "Waiting"}
      </div>
    </div>
  );
};

export default ParticipationCard;
