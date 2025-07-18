import { useEffect, useState } from "react";
import Section from "./components/Section";
import DonationBanner from "./components/DonationBanner";
import { AnimatedBackground, usePerformanceMonitor } from "animated-backgrounds";
import { entries } from "./data/entries";

export default function App() {
  const semi1 = entries.filter((e) => e.group === "semi1");
  const pq1 = entries.filter((e) => e.group === "pq1");
  const semi2 = entries.filter((e) => e.group === "semi2");
  const pq2 = entries.filter((e) => e.group === "pq2");
  const [activeTab, setActiveTab] = useState("participating");

  const performance = usePerformanceMonitor();

  useEffect(() => {
    document.title = "NSC 242";
  }, []);

  return (
    <div>
      <main className="min-h-screen text-white p-8 space-y-8">
        <AnimatedBackground
          animationName="fireflies"
          interactive={true}
          interactionConfig={{
            effect: "attract",
            strength: 0.8,
            radius: 150,
            continuous: true,
          }}
        />
        <h1 className="text-5xl font-bold text-center bg-gray-900/90 text-blue-200 p-6 rounded-lg shadow-lg">
          NSC 242
        </h1>
        <div className="text-center text-lg bg-gray-900/90 p-4 rounded-lg shadow-lg border-t-2 border-yellow-400 animate-pulse">
          <span className="font-semibold">Natia</span> is the 242nd edition of
          the NSC, featuring entries from various nations.
          <span className="text-red-400 font-semibold">
            {" "}
            Voting is open until July 25
          </span>
          . Please send your votes to{" "}
          <span className="underline">@NSCUser</span> or via email to{" "}
          <span className="underline">...</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center mb-6 mt-6">
          <button
            onClick={() => setActiveTab("participating")}
            className={`px-4 py-2 rounded-lg font-bold shadow ${
              activeTab === "participating"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            } transition`}
          >
            Participating Nations
          </button>
          {/* Show Semi 1 tab only if there are entries in semi1 */}
          {semi1.length > 0 && (
            <button
              onClick={() => setActiveTab("semi1")}
              className={`px-4 py-2 rounded-lg font-bold shadow ${
                activeTab === "semi1"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } transition`}
            >
              Semi 1
            </button>
          )}
          {/* Show Semi 1 PQs tab only if there are entries in pq1 */}
          {pq1.length > 0 && (
            <button
              onClick={() => setActiveTab("semi1pq")}
              className={`px-4 py-2 rounded-lg font-bold shadow ${
                activeTab === "semi1pq"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } transition`}
            >
              Semi 1 PQs
            </button>
          )}
          {/* Show Semi 2 tab only if there are entries in semi2 */}
          {semi2.length > 0 && (
            <button
              onClick={() => setActiveTab("semi2")}
              className={`px-4 py-2 rounded-lg font-bold shadow ${
                activeTab === "semi2"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } transition`}
            >
              Semi 2
            </button>
          )}
          {/* Show Semi 2 PQs tab only if there are entries in pq2 */}
          {pq2.length > 0 && (
            <button
              onClick={() => setActiveTab("semi2pq")}
              className={`px-4 py-2 rounded-lg font-bold shadow ${
                activeTab === "semi2pq"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              } transition`}
            >
              Semi 2 PQs
            </button>
          )}
        </div>

        <div>
          {activeTab === "participating" && (
            <Section title="Participating Nations" entries={entries} flip={false} />
          )}
          {activeTab === "semi1" && (
            <Section title="Semi 1" entries={semi1} />
          )}
          {activeTab === "semi1pq" && (
            <Section title="PQs voting in Semi 1" entries={pq1} />
          )}
          {activeTab === "semi2" && (
            <Section title="Semi 2" entries={semi2} />
          )}
          {activeTab === "semi2pq" && (
            <Section title="PQs voting in Semi 2" entries={pq2} />
          )}
        </div>
        <div className="mt-16 text-center text-white text-xl bg-gray-900/90 p-6 rounded-lg shadow-lg font-semibold animate-pulse">
          🗳️ Votes can be sent until{" "}
          <span className="text-red-400 font-semibold">July 25</span> to{" "}
          <span className="underline">@NSCUser</span> or via email to{" "}
          <span className="underline">votes@nsc.com</span>
        </div>
        <DonationBanner />
      </main>
    </div>
  );
}
