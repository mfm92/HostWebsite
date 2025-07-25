import React, { useEffect, useState } from "react";
import "./EntryProgressBar.css";

const AnimatedEntryProgressBar = ({ confirmed, total }) => {
  const percent = Math.min(confirmed / total, 1);
  const [fillPercent, setFillPercent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setFillPercent(percent), 80);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className="w-full mt-2 mb-7">
      <div className="entry-progress-bar-bg">
        <div
          className="entry-progress-bar-fill"
          style={{ width: `${fillPercent * 100}%` }}
        >
          {/* Diagonal shimmer */}
          <div className="progress-bar-shimmer" />
          {/* Floating orbs */}
          <div className="progress-bar-orbs" />
        </div>
      </div>
      <div className="flex justify-between text-xs font-semibold text-zinc-200 mt-1 px-1">
        <span className="text-orange-400">{confirmed}/{total} confirmed</span>
        <span>NSC 242 ...<b>{Math.round(percent * 100)}%</b> loaded</span>
      </div>
    </div>
  );
};

export default AnimatedEntryProgressBar;
