import React from "react";

const CongratsBanner = () => (
  <div className="w-full bg-gradient-to-r from-black/80 via-blue-400/80 to-yellow-500/70 py-4 px-6 flex justify-center items-center shadow-xl mb-8 rounded-xl">
    <span className="text-white text-lg font-semibold mr-4">
      🏆 Huge Congratulations to <span className="font-bold">Belvist</span>! 
      Victors of <span className="font-bold">NSC 241</span> with Zorja’s <i>"Tetno"</i>!
    </span>
    <a
      href="https://www.youtube.com/watch?v=GaTDdkxWEJo&list=RDGaTDdkxWEJo&start_radio=1"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-indigo-800 font-bold px-5 py-2 rounded shadow-md hover:bg-indigo-100 transition"
    >
      🎶 Watch the Winning Song
    </a>
  </div>
);

export default CongratsBanner;
