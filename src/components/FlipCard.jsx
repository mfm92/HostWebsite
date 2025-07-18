import React from "react";

const FlipCard = ({ entry }) => (
  <div className="group perspective w-72 h-44">
    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover-rotate-y-180">
      <div className="absolute w-full h-full bg-gradient-to-br from-blue-950/70 to-blue-400/70 text-white rounded-2xl flex items-center justify-center shadow-lg border border-black-600 backface-hidden">
        <div className="text-center text-lg font-bold opacity-90">
          <b>#{entry.order}</b> {entry.nation}
        </div>
      </div>
      <div className="absolute w-full h-full rounded-2xl overflow-hidden transform rotate-y-180 backface-hidden bg-gradient-to-br from-blue-600 to-blue-300 shadow-lg border border-black-600">
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-4 rotate-y-360">
          <div className="text-lg font-semibold">{entry.artist}</div>
          <div className="text-md italic">"{entry.song}"</div>
          {entry.youtube && (
            <a
              href={entry.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 font-bold text-blue-200 underline text-sm hover:text-blue-400 transition"
            >
              YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default FlipCard;
