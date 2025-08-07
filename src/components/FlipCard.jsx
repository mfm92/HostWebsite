import React from "react";
import "../styles/ParticipationCard.css"; // Keep your CSS import if needed

function FlagImage({ nation }) {
  const extensions = ["png", "jpeg", "jpg"];
  const [extIndex, setExtIndex] = React.useState(0);
  const [src, setSrc] = React.useState(`/flags/${nation}.${extensions[0]}`);

  React.useEffect(() => {
    setExtIndex(0);
    setSrc(`/flags/${nation}.${extensions[0]}`);
  }, [nation]);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const newIndex = extIndex + 1;
      setExtIndex(newIndex);
      setSrc(`/flags/${nation}.${extensions[newIndex]}`);
    } else {
      setSrc("/flags/Default.png");
    }
  };

  return (
    <img
      src={src}
      alt={`${nation} flag`}
      className="w-full h-full object-cover flag-fade flag-pop"
      loading="eager"
      onError={handleError}
    />
  );
}

const CardContent = ({ entry }) => (
  <div className="flex flex-col space-y-2 items-center w-full">
    <div className="w-16 h-16 mb-2 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50 flex items-center justify-center bg-white/10 flag-shine">
      <FlagImage nation={entry.nation} />
    </div>
    <div className="text-xl font-extrabold text-centered text-orange-400 text-center tracking-tight ">
      {entry.artist}
    </div>
    <div className="text-md italic tracking-tight text-centered text-white/90 text-center mb-1">{entry.song}</div>
    {entry.youtube && (
      <a
        href={entry.youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 px-4 py-1 rounded-full text-sm bg-white text-black font-bold shadow transition hover:bg-orange-500 hover:text-white hover:scale-115 duration-200 border-2 border-orange-400"
      >
        YouTube
      </a>
    )}
  </div>
);

const FlipCard = ({ entry, showFinalOrder = false }) => {
  // Use finalOrder if showFinalOrder is true and finalOrder exists, else order
  const displayOrder = showFinalOrder ? (entry.finalOrder ?? entry.order) : entry.order;

  return (
    <div className="relative w-72 h-44 cursor-pointer transition-shadow group select-none font-eurovision">
      {/* Front side (order/finalOrder and nation) */}
      <div
        className="
          absolute
          w-full h-full
          flex flex-col justify-center items-center
          rounded-2xl shadow-[0_0_25px_#FF7A00AA]
          border-2 border-white
          bg-gradient-to-br from-black/70 to-orange-400/70
          text-white
          transition-opacity duration-500
          group-hover:opacity-0
          z-10
          px-6
        "
      >
        <span
          className="
            text-[4.25rem] font-extrabold
            text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]
            tracking-tight leading-none mb-2
            select-none pointer-events-none
          "
          aria-label={`Running order number ${displayOrder}`}
        >
          {displayOrder}
        </span>
        <span
          className="
            text-l font-semibold uppercase
            tracking-widest
            text-center
            text-white drop-shadow-[0_0_3px_rgba(0,0,0,0.9)]
            bg-black/30 px-5 py-1 rounded
            select-none
          "
          aria-label={`Nation name ${entry.nation}`}
        >
          {entry.nation}
        </span>
      </div>

      {/* Back side */}
      <a
        href={entry.youtube}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={0}
        aria-label={`Play ${entry.song} by ${entry.artist} on YouTube`}
        className="
          absolute w-full h-full rounded-2xl flex flex-col items-center justify-center
          shadow-2xl border-2 border-white
          bg-gradient-to-br from-orange-700/70 to-black/70 text-white
          opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-6
          transition-all duration-500 z-20 px-3 outline-none
          focus-visible:ring-4 focus-visible:ring-orange-400 focus-visible:ring-opacity-60
          hover:shadow-[0_0_24px_#FF7A00cc]
          active:scale-[0.98]
        "
        style={{ textDecoration: "none" }}
      >
        <CardContent entry={entry} />
      </a>
    </div>
  );
};

export default FlipCard;
