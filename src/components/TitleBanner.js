// components/TitleBanner.js

import { useEffect, useState } from "react";

const DEADLINE = new Date("2025-07-28T19:00:00Z"); // July 27, 23:59 CEST = 21:59 UTC

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
    <div className="flex flex-col items-center min-h-[55vh] justify-center space-y-12 py-10 px-3 backdrop-blur">
      {/* Headline */}
      <div className="relative flex flex-col items-center w-full max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-black text-center bg-gradient-to-r from-orange-700/90 to-orange-300/90 text-white px-10 py-9 rounded-3xl shadow-2xl tracking-wide ring-2 ring-orange-400/50 drop-shadow-2xl z-10 backdrop-blur-lg bg-opacity-90">
          NSC 242 in Begonia
        </h1>
        <span className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 h-2 w-40 rounded-full bg-gradient-to-r from-orange-600/60 to-orange-300/50 shadow-lg opacity-70" />
      </div>
      <div className="text-center text-lg text-white space-y-2">
        <div>
          <span className="text-orange-300 font-semibold text-lg">Confirmations closed</span>
          <br></br>
          <span className="text-white font-extrabold">We are happy to welcome 57 nations!</span>
        </div>
      </div>
    </div>
  );
}
