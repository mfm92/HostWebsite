// components/TitleBanner.js

import { useEffect, useState } from "react";

const DEADLINE = new Date("2025-07-27T21:59:00Z"); // July 27, 23:59 CEST = 21:59 UTC

function getTimeRemaining() {
  const now = new Date();
  const total = DEADLINE - now;
  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function TitleBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section className="flex flex-col items-center min-h-[55vh] justify-center space-y-12 py-10 px-3 backdrop-blur">
      {/* Headline */}
      <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-orange-700/90 to-orange-300/90 text-white px-10 py-9 rounded-3xl shadow-2xl tracking-wide ring-2 ring-orange-400/50 drop-shadow-2xl z-10 backdrop-blur-lg bg-opacity-90">
          NSC 242 in Begonia
        </h1>
        <span className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 h-2 w-40 rounded-full bg-gradient-to-r from-orange-600/60 to-orange-300/50 shadow-lg opacity-70" />
      </div>

      {/* Countdown */}
      <div className="relative max-w-xl w-full mx-auto text-center bg-gray-900/70 backdrop-blur-xl p-8 rounded-2xl shadow-lg border-t-4 border-b-4 border-orange-400/70">
        <div className="mb-3 flex items-center justify-center gap-4">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Minutes", value: minutes },
            { label: "Seconds", value: seconds },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center px-3 py-1 bg-white/10 bg-gradient-to-b from-orange-800/60 to-orange-300/50 rounded-lg shadow-inner min-w-[66px] mx-1"
            >
              <span className="text-3xl font-extrabold text-white tabular-nums drop-shadow">{value.toString().padStart(2, '0')}</span>
              <span className="uppercase text-orange-200 text-xs font-bold tracking-wider">{label}</span>
            </div>
          ))}
        </div>
        <div>
          <span className="text-orange-300 font-semibold text-lg">Deadline to confirm:</span>
          <span className="text-white font-extrabold"> July 27 (end of day, CEST)</span>
        </div>
        <div className="text-orange-200 text-xs italic mt-1">
          ... could be pushed back if the forum is lagging.
        </div>
      </div>

      {/* Info cards under the countdown */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 mt-1">
        {/* HOW TO ENTER */}
        <div className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-md border-t-2 border-orange-400/40 p-6 flex flex-col items-center min-w-[220px]">
          <span className="text-orange-400 font-bold text-lg mb-2">How to Enter</span>
          <ul className="text-white/90 text-base leading-relaxed text-center space-y-1">
            Please submit your entry with the following information:
            <li className="text-sm text-orange-100/80">
              <b>Nation Name</b> - <i>Artist Name</i> - <i>Song Title</i> - <i>Link to the song</i>
            </li>
            <li>Deadline: <b>July 27, 23:59 CEST</b></li>
          </ul>
        </div>
        {/* SUBMISSION CHANNELS */}
        <div className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-md border-t-2 border-orange-600/40 p-6 flex flex-col items-center min-w-[220px]">
          <span className="text-orange-400 font-bold text-lg mb-2">Submission Channels</span>
          <ul className="text-white/90 text-base leading-relaxed text-center space-y-1">
            <li>
              <a
                href="https://www.escunited.com"
                className="underline text-orange-100 hover:text-orange-300 font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                @pjelacki on ESCunited
              </a>
            </li>
            <li>
              <span className="font-bold text-orange-100">@mfmo92</span> on Discord
            </li>
            <li className="text-sm text-orange-100/80">
              Add the NSC Host Helper at escunited.com
            </li>
          </ul>
        </div>
        {/* REMINDER / CTA */}
        <div className="flex-1 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-md border-t-2 border-orange-400/40 p-6 flex flex-col items-center min-w-[220px]">
          <span className="text-orange-400 font-bold text-lg mb-2">Quick Check</span>
          <span className="text-white text-base mb-3 text-center">
            Make sure your entry hasn’t been used!
          </span>
          <a
            href="https://nscstats.com/"
            className="bg-orange-600/80 hover:bg-orange-400/80 transition-colors text-white font-bold py-2 px-4 rounded shadow-md mt-1 flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check the NSC Database
            <svg className="ml-2 w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
