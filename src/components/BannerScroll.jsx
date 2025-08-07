import React, { useState, useEffect } from "react";

const extensions = ["png", "jpeg", "jpg"];

// Flag image with automatic extension fallback
function FlagImage({ nation }) {
  const [extIndex, setExtIndex] = useState(0);
  const [src, setSrc] = useState(`/flags/${nation}.${extensions[0]}`);

  useEffect(() => {
    setExtIndex(0);
    setSrc(`/flags/${nation}.${extensions[0]}`);
  }, [nation]);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const next = extIndex + 1;
      setExtIndex(next);
      setSrc(`/flags/${nation}.${extensions[next]}`);
    } else {
      setSrc("/flags/Default.png");
    }
  };

  return (
    <img
      src={src}
      alt={`${nation} flag`}
      title={nation}
      loading="eager"
      onError={handleError}
      className="w-8 h-8 object-cover rounded-full border-1 border-orange-400 bg-white shadow-sm"
    />
  );
}

// Single scroll block containing the label and participants
function ScrollBlock({ participants, label, extraMarginEnd }) {
  return (
    <div className="flex items-center" style={extraMarginEnd ? { marginRight: extraMarginEnd } : undefined}>
      {/* Label */}
      <div className="flex items-center gap-2 mx-4 mr-4 whitespace-nowrap">
        <span className="text-m animate-pulse font-semibold text-orange-400 uppercase tracking-widest select-none">
          {label}
        </span>
      </div>
      {/* Participants */}
      {participants.map((entry, idx) => (
        <div
          key={idx}
          className="flex items-center gap-2 mx-7"
          style={idx === participants.length - 1 && extraMarginEnd ? { marginRight: extraMarginEnd } : undefined}
        >
          <span className="text-xl font-bold text-orange-400">
{entry.finalOrder}
</span>

          <FlagImage nation={entry.nation} />
          <span className="text-s text-white font-bold tracking-widest uppercase">{entry.code}</span>
        </div>
      ))}
    </div>
  );
}

function ScrollBanner({ participants, label }) {
  return (
    <div className="w-full overflow-hidden bg-zinc/60 border-b-2 border-t-2 border-orange-400/50 select-none">
      <div className="relative w-full h-12 flex items-center">
        <div className="flex whitespace-nowrap animate-scroll-x">
          {/* First half with extra right margin */}
          <ScrollBlock participants={participants} label={label} extraMarginEnd="16rem" />

          {/* Second half with left padding */}
          <div className="flex pl-16">
            <ScrollBlock participants={participants} label={label} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          display: flex;
          animation: scroll-x 42s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}

export default ScrollBanner;
