// EurovisionResultsTable.jsx

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function FlagImage({ nation }) {
  const extensions = ["png", "jpeg", "jpg"];
  const [extIndex, setExtIndex] = useState(0);
  const [src, setSrc] = useState(`/flags/${nation}.${extensions[0]}`);

  // Whenever nation changes, reset extIndex and src!
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

// Animated Eurovision-style points
function AnimatedPoints({ target }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    let startTime = performance.now();

    function animate(time) {
      const duration = 900;
      const progress = Math.min((time - startTime) / duration, 1);
      const val = Math.floor(progress * target);
      setDisplay(val);
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return (
    <span className="font-extrabold text-orange-400 drop-shadow points-font text-2xl md:text-3xl tracking-tighter euro-glow">
      {display}
    </span>
  );
}

export function ResultsTable({ entries, reju = false }) {
  // Use correct field depending on reju
  const placeKey = reju ? "rejuPlace" : "resultPlace";
  const pointsKey = reju ? "rejuPoints" : "resultPoints";

  // Filter and sort accordingly
  const results = entries
    .filter(e => typeof e[placeKey] === "number")
    .sort((a, b) =>
      reju
        ? a[placeKey] - b[placeKey]  // Descending for reju per your original request
        : a[placeKey] - b[placeKey]  // Ascending for normal
    )
    .filter(e => (reju ? e[placeKey] >= 1 : e[placeKey] >= 10));

  if (results.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-6 rounded-2xl shadow-2xl border-2 border-orange-500 bg-gradient-to-br from-orange-950/70 via-zinc-950/70 to-neutral/70 background-blur-md p-2 ring-2 ring-orange-700/20 relative font-proximanova euro-table">
      {/* Glowing animated backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-24 right-8 w-72 h-60 bg-orange-500/20 blur-3xl rounded-full animate-pulse-fast" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-zinc-400/20 blur-2xl rounded-full animate-pulse-slow" />
      </div>
      <table className="min-w-full table-auto border-collapse rounded-2xl overflow-hidden z-10 relative">
        <thead>
          <tr className="bg-gradient-to-r from-orange-700/70 via-orange-900/80 to-zinc-900 border-b-4 border-orange-400/75">
            {["", "", "", "Artist", "Title", "Points"].map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-left text-orange-200 text-[13px] md:text-base uppercase tracking-wider select-none drop-shadow font-bold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((entry, idx) => (
            <motion.tr
              key={entry.id || entry.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.13 }}
              className={[
                "border-b border-orange-800/50 cursor-pointer z-10 relative group transition-all duration-300",
                !reju && entry.resultPlace <= 10 ? "from-orange-900/50 via-zinc-900/60 to-transparent bg-gradient-to-r" : "",
                !reju && entry.resultPlace === 10 ? "bg-neutral-800/80" : "",
                entry.rejuJoker ? "bg-gradient-to-r from-zinc-900/60 to-orange-900/30" : "",
                "hover:bg-orange-900/50 hover:scale-[1.03] hover:shadow-xl"
              ].join(" ")}
              title={`Place ${entry[placeKey]} — ${entry.artist} - ${entry.song}`}
              style={
                !reju && entry.resultPlace <= 10
                  ? { boxShadow:"0 2px 26px #ca5d04aa, 0 2px 6px #a78bfa66" }
                  : {}
              }
            >
              {!reju && entry.resultPlace === 10 ? (
                <>
                  <td className="py-3 px-4 italic text-gray-400 text-center font-black">10</td>
                  <td colSpan={4} className="py-3 px-4 italic text-gray-400 text-center">
                    10th place
                  </td>
                  <td className="py-3 px-4 font-extrabold text-orange-300/90 text-right text-2xl euro-glow">
                    <AnimatedPoints target={entry[pointsKey]} />
                  </td>
                </>
              ) : entry.rejuJoker ? (
                <>
                  <td className="py-3 px-4 italic text-zinc-400 text-center font-semibold">{entry[placeKey]}</td>
                  <td colSpan={4} className="py-3 px-4 italic text-zinc-200/90 text-center font-semibold">
                    Rest Jury Qualifier
                  </td>
                  <td className="py-3 px-4 font-extrabold text-cyan-300 text-right text-2xl euro-glow">
                    <AnimatedPoints target={entry[pointsKey]} />
                  </td>
                </>
              ) : (
                <>
                  {/* Place */}
                  <td className="py-3 px-4 font-extrabold text-orange-400 text-2xl text-center w-16 tabular-nums euro-glow">
                    {entry[placeKey]}
                  </td>
                  {/* Flag */}
                  <td className="py-3 px-4 w-16 align-middle">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden shadow-orange-500/60 shadow-md ring-2 ring-orange-400/80 flex items-center justify-center bg-white/10 hover:scale-110 hover:ring-zinc-400 transition-transform duration-500 border-2 border-orange-900/60 mx-auto euro-flag">
                      <FlagImage nation={entry.nation} />
                    </div>
                  </td>
                  {/* Country */}
                  <td className="py-3 px-4 uppercase font-semibold text-lg tracking-wide text-white whitespace-nowrap max-w-[150px] truncate drop-shadow euro-country">
                    {entry.nation}
                  </td>
                  {/* Artist */}
                  <td className="py-3 px-4 font-medium text-white max-w-[200px] truncate drop-shadow">
                    {entry.artist}
                  </td>
                  {/* Song */}
                  <td className="py-3 px-4 text-zinc-300 max-w-[240px] truncate italic drop-shadow">
                    {entry.song}
                  </td>
                  {/* Points */}
                  <td className="py-3 px-4 font-extrabold text-orange-400 text-right text-2xl tabular-nums euro-glow">
                    <AnimatedPoints target={entry[pointsKey]} />
                  </td>
                </>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
      <style>
        {`
        @keyframes flagwave {
          0%   { transform: rotate(-1.2deg) scale(1.00);}
          50%  { transform: rotate(2.0deg) scale(1.03);}
          100% { transform: rotate(-1.4deg) scale(1.00);}
        }
        .points-font {
          font-family: 'Orbitron', 'Oswald', 'Proxima Nova', 'sans-serif';
        }
        .euro-glow {
          text-shadow:
            0 0 8px #cb6505bb,
            0 0 16px #a21caf44;
        }
        .euro-table {
          position: relative;
        }
        .euro-country {
          letter-spacing: 0.15em;
        }
        .euro-flag {
          background: linear-gradient(140deg, #f5f3fff9 40%, #c084fc22 100%);
          box-shadow: 0 0 8px #c084fc55;
        }
        .flag-fade:hover {
          filter: brightness(1.20) contrast(1.13) saturate(1.5) drop-shadow(0 0 12px #fb7185cc);
        }
        .animate-pulse-fast {
          animation: pulse 2.3s cubic-bezier(.4,0,.6,1) infinite;
        }
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(.4,0,.6,1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: .65; }
          50% { opacity: 1; }
        }
        `}
      </style>
    </div>
  );
}
