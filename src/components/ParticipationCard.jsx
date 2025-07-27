import React from "react";
import { useState } from "react";
import "../styles/ParticipationCard.css"; // New: Import the CSS

function FlagImage({ nation }) {
  const [extIndex, setExtIndex] = useState(0);
  const extensions = ["png", "jpeg", "jpg"];
  const [src, setSrc] = useState(`/flags/${nation}.${extensions[extIndex]}`);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const newIndex = extIndex + 1;
      setExtIndex(newIndex);
      setSrc(`/flags/${nation}.${extensions[newIndex]}`);
    } else {
      setSrc("/flags/Default.png"); // fallback to default if all fail
    }
  };

  return (
    <img
      src={src}
      alt={`${nation} flag`}
      className="w-full h-full object-cover flag-fade flag-pop"
      loading="lazy"
      onError={handleError}
    />
  );
}


const ParticipationCard = ({ entry }) => {
  const statusGradients = entry.participating
    ? (entry.reserve ? "bg-gradient-to-br from-yellow-700/80 to-white/50" : "bg-gradient-to-br from-orange-800/70 to-orange-300/60")
    : entry.banned
    ? "bg-gradient-to-br from-rose-700/80 to-red-400/50"
    : "bg-gradient-to-br from-zinc-800/80 to-slate-400/60";

  const ringColor = entry.participating
    ? (entry.reserve ? "ring-2 ring-yellow-500" : "ring-2 ring-orange-400")
    : entry.banned
    ? "ring-2 ring-rose-500"
    : "ring-2 ring-slate-400";

  const statusIcon = entry.participating
    ? "🎉"
    : entry.banned
    ? "🚫"
    : entry.gone ?
    "😢" 
    : "⏳";

  return (
    <div
  className={`relative backdrop-blur-xl w-full bg-opacity-70 ${statusGradients} ${ringColor} shadow-xl rounded-2xl p-5 flex flex-col justify-center items-center transition-all hover:scale-105 hover:shadow-2xl cool-border`}
>
  <div className="absolute bottom-3 right-4 opacity-40 text-3xl pointer-events-none">
    {statusIcon}
  </div>
  
  {/* Flag circle */}
  <div className="w-16 h-16 mb-2 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50 flex items-center justify-center bg-white/10 flag-shine">
    <FlagImage nation={entry.nation} />
  </div>

  <div className="font-extrabold text-2xl text-center text-white drop-shadow-lg mb-2 flex items-center gap-2 font-proximanova">
    {entry.nation}
    {entry.reserve && (
      <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded text-white-100">R</span>
    )}
    {entry.pq && (
      <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded text-white-200">PQ</span>
    )}
    {entry.gone && (
      <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded text-white-200">WITHDRAWAL</span>
    )}
  </div>
  <div className="h-[1.5px] w-1/2 bg-white/30 rounded my-1" />
  <div className="uppercase tracking-wide text-xs text-zinc-100 opacity-70 mt-2">
    {entry.participating
      ? (entry.reserve ? "Reserved" : "Participating")
      : entry.banned
      ? "Has to skip"
      : entry.gone
      ? "Sad to see you go"
      : "Waiting"}
  </div>

  {entry.nation == "Griffin Empire" && (
    <div>
      <a
        href="https://www.escunited.com/forum/threads/30th-griffiniskaja-laul-is-live.5986/post-2517443"
        className="mt-2 text-xs text-white hover:animate-pulse transition-colors bg-white/20 px-2 py-1 rounded hover:bg-white/30 shadow hover:shadow-lg"
      >
        Check out GL30 here
      </a>
    </div>
  )}
</div>

  );
};

export default ParticipationCard;
