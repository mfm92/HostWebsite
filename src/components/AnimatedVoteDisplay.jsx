// components/AnimatedVoteDisplay.jsx
import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { entries as initialEntries } from "../data/entries";
import { votes } from "../data/votesFake";

const POINTS_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];

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

export default function AnimatedVoteDisplay() {
  const [nations, setNations] = useState(
    initialEntries
      .filter(e => e.group.includes("final"))
      .map(e => ({ ...e, points: e.points ?? 0 }))
  );
  const [announcingIndex, setAnnouncingIndex] = useState(0);
  const [announcingCode, setAnnouncingCode] = useState(null);
  const [pendingVotesMap, setPendingVotesMap] = useState({}); // now array per recipient
  const [glowCode, setGlowCode] = useState(null);
  const [receivedMap, setReceivedMap] = useState({});
  const [isVoting, setIsVoting] = useState(false);
  const [prevRanks, setPrevRanks] = useState({});
  const votingTimeouts = useRef([]);

  useEffect(() => {
    setPrevRanks(nations.reduce((acc, n, idx) => ({ ...acc, [n.code]: idx }), {}));
  }, [announcingCode]);

  const clearAllTimeouts = () => votingTimeouts.current.forEach(clearTimeout);

  const getRankTransitions = (prevRanks, currNations) =>
    currNations.reduce((obj, n, i) => {
      const prev = prevRanks[n.code];
      obj[n.code] = { prev: prev == null ? i : prev, now: i };
      return obj;
    }, {});

  const announceVotes = useCallback(() => {
    if (isVoting) return;
    clearAllTimeouts();
    const countryCodes = Object.keys(votes);
    const code = countryCodes[announcingIndex];
    setAnnouncingCode(code);
    setIsVoting(true);

    const nationVotes = votes[code];
    let now = 0;

    POINTS_ORDER.forEach(points => {
      const recipientCode = nationVotes[points];
      votingTimeouts.current.push(
        setTimeout(() => {
          setNations(prev => {
            setPrevRanks(prev.reduce((acc, n, idx) => ({ ...acc, [n.code]: idx }), {}));
            return [...prev]
              .map(n => (n.code === recipientCode
                ? { ...n, points: (n.points ?? 0) + points }
                : { ...n, points: n.points ?? 0 }))
              .sort((a, b) => b.points - a.points);
          });

          // append this award to the recipient’s list
          setPendingVotesMap(prev => ({
            ...prev,
            [recipientCode]: [...(prev[recipientCode] || []), points]
          }));

          setReceivedMap(prev => ({
            ...prev,
            [code]: { ...(prev[code] || {}), [recipientCode]: true }
          }));

          if (points === 12) setGlowCode(recipientCode);
        }, now)
      );

      votingTimeouts.current.push(
        setTimeout(() => {
          if (points === 12) setGlowCode(null);
        }, now + (points === 12 ? 2200 : 1300))
      );

      now += points === 12 ? 2600 : 1700;
    });

    votingTimeouts.current.push(
      setTimeout(() => setIsVoting(false), now)
    );
  }, [announcingIndex, isVoting]);

  const handleNext = () => {
    if (isVoting) return;
    setAnnouncingIndex(idx => Math.min(idx + 1, Object.keys(votes).length - 1));
    setAnnouncingCode(null);
    setPendingVotesMap({});
    setGlowCode(null);
  };

  const countryReceivedFromCurrent = nationCode =>
    announcingCode && receivedMap[announcingCode]?.[nationCode];

  const sortedNations = nations.slice(0, 28);
  const col1 = sortedNations.slice(0, 14);
  const col2 = sortedNations.slice(14, 28);
  const rankTransitions = getRankTransitions(prevRanks, sortedNations);

  function RenderColumn({ nationsList }) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {nationsList.map(nation => {
          const received = countryReceivedFromCurrent(nation.code);
          const highlight =
            announcingCode === nation.code
              ? "border-orange-500"
              : glowCode === nation.code
              ? "border-yellow-500"
              : (pendingVotesMap[nation.code] && pendingVotesMap[nation.code].length)
              ? "border-green-500"
              : received
              ? "border-green-300"
              : "border-gray-600";
          const background =
            glowCode === nation.code
              ? "bg-yellow-300/50"
              : (pendingVotesMap[nation.code] && pendingVotesMap[nation.code].length)
              ? "bg-green-400/20"
              : received
              ? "bg-green-800/10"
              : "bg-gray-900/90";
          const { prev, now } = rankTransitions[nation.code];
          const overtook = prev > now;

          const animateProps = {
            opacity: 1,
            scale: overtook ? 1.18 : 1,
            zIndex: overtook ? 15 : 1,
            boxShadow: overtook
              ? "0 0 44px 14px rgba(253, 224, 71, 0.85)"
              : "0 0 8px 2px rgba(0,0,0,0.09)",
            transition: {
              type: "spring",
              stiffness: overtook ? 160 : 700,
              damping: overtook ? 14 : 36,
              mass: overtook ? 2.5 : 1,
              duration: overtook ? 2.8 : 1.0
            }
          };

          const layoutTransition = {
            type: "spring",
            stiffness: 100,
            damping: 10,
            mass: 1.8,
            duration: 2.6
          };

          return (
            <motion.div
              key={nation.id}
              layout
              animate={animateProps}
              layoutTransition={layoutTransition}
              initial={false}
              style={{ maxWidth: "100%", willChange: "transform" }}
              className={`w-full min-h-[38px] flex items-center rounded-lg border-2 px-4 py-1.5 ${background} ${highlight} relative overflow-hidden`}
            >
              <div className="flex flex-row items-center min-w-0 flex-shrink gap-6 w-full">
                <div className="w-12 h-8 mb-2 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50 flex items-center justify-center bg-white/10 flag-shine">
                  <FlagImage nation={nation.nation} />
                </div>
                <span className="text-lg text-gray-200 truncate">{nation.nation}</span>
              </div>
              <motion.span
                key={nation.points}
                initial={{ scale: 1.15, color: "#fff" }}
                animate={{ scale: 1, color: "#fff" }}
                transition={{ type: "spring", stiffness: 700, damping: 27, duration: 10 }}
                className="ml-auto text-3xl font-extrabold"
              >
                {nation.points}
              </motion.span>

              {/* All badges for this nation in current round */}
              {Array.isArray(pendingVotesMap[nation.code]) &&
                pendingVotesMap[nation.code].map((pt, idx) => (
                  <motion.div
                    key={`${nation.code}-${pt}-${idx}`}
                    layoutId={`point-badge-${nation.id}-${pt}-${idx}`}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className={`absolute top-1 bottom-1 px-0 py-1 text-2xl font-bold rounded shadow-md border z-10
                      ${pt === 12
                        ? "bg-yellow-500 text-black border-yellow-100"
                        : "bg-green-600 text-white border-green-200"
                      }`}
                    style={{ left: `6px`, width: "62px", textAlign: "center" }}
                  >
                    {pt}
                  </motion.div>
                ))}
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-row gap-10">
      {/* Scoreboard */}
      <div className="flex-1 flex flex-row gap-8 items-start w-full">
        <RenderColumn nationsList={col1} />
        <RenderColumn nationsList={col2} />
      </div>
      {/* Voting nation */}
      <div className="w-80 flex-shrink-0 flex flex-col gap-4 items-center justify-start pt-2">
        {announcingCode && (
          <>
            <div className="text-center text-2xl text-orange-400 font-bold tracking-wide px-2">
              {initialEntries.find(n => n.code === announcingCode)?.nation}
            </div>
            <div className="w-24 h-16 mb-2 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50 flex items-center justify-center bg-white/10 flag-shine">
              <FlagImage nation={initialEntries.find(n => n.code === announcingCode)?.nation} />
            </div>
            <div className="text-base text-orange-300 font-semibold">
              is announcing their votes...
            </div>
          </>
        )}
        <button
          onClick={() => {
            if (announcingCode) {
              handleNext();
            } else {
              announceVotes();
            }
          }}
          disabled={isVoting || announcingIndex >= Object.keys(votes).length}
          className="mt-10 px-6 py-4 w-full bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed font-bold text-2xl transition"
        >
          {announcingCode ? "Next Nation" : "Start Voting"}
        </button>
      </div>
    </div>
  );
}
