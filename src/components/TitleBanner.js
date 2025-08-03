import { useEffect, useState } from "react";

// Voting deadline: August 6, 23:59 CEST (21:59 UTC)
const DEADLINE = new Date("2025-08-06T21:59:00Z");

function getTimeRemaining() {
  const now = new Date();
  const total = DEADLINE - now;
  if (total <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function TitleBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <section className="flex flex-col items-center justify-center p-6 bg-gradient-to-r from-zinc-800/70 to-gray-800/80 text-white rounded-lg shadow-lg rounded-5xl background-blur-xl">
      {/* Headline */}
      <div className="w-full flex items-center justify-center mb-6">
        <h1 className="text-4xl md:text-5xl font-black text-center bg-gradient-to-r from-orange-700/95 to-orange-300/80 text-white px-14 py-8 rounded-[3rem] shadow-2xl tracking-wide ring-2 ring-orange-400/70 drop-shadow-lg">
          NSC 242 in Begonia
        </h1>
      </div>

      {/* Countdown Row */}
      <div className="w-full flex items-center justify-center mb-2">
        <div className="relative max-w-2xl w-full mx-auto text-center bg-gray-900/70 backdrop-blur-xl p-9 rounded-2xl shadow-lg border-t-4 border-b-4 border-orange-400/70">
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
            <span className="text-orange-300 font-semibold text-lg">Deadline to send votes:</span>
            <span className="text-white font-extrabold"> August 6 (end of day, CEST)</span>
          </div>
          <div className="text-orange-200 text-xs italic mt-1">
            ... could be pushed back if the forum is lagging.
          </div>
        </div>
      </div>
    </section>
  );
}
