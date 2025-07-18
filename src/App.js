import { useEffect, useState } from "react";
import Section from "./components/Section";
import DonationBanner from "./components/DonationBanner";
import { AnimatedBackground, usePerformanceMonitor } from "animated-backgrounds";
import { entries } from "./data/entries";
import TabButton from "./components/TabButton"; // Import the TabButton component
import TitleBanner from "./components/TitleBanner";
import AnimatedVoteDisplay from "./components/AnimatedVoteDisplay";

export default function App() {
  const semi1 = entries.filter((e) => e.group === "semi1");
  const pq1 = entries.filter((e) => e.group === "pq1");
  const semi2 = entries.filter((e) => e.group === "semi2");
  const pq2 = entries.filter((e) => e.group === "pq2");
  const [activeTab, setActiveTab] = useState("participating");

  const tabs = [
    { key: "participating", label: "Participating Nations", entries: entries },
    { key: "semi1", label: "Semi 1", entries: semi1 },
    { key: "semi1pq", label: "Semi 1 PQs", entries: pq1 },
    { key: "semi2", label: "Semi 2", entries: semi2 },
    { key: "semi2pq", label: "Semi 2 PQs", entries: pq2 },
  ].filter(tab => tab.entries.length > 0);

  useEffect(() => {
    document.title = "NSC 242";
  }, []);

  return (
    <div>
      <main className="min-h-screen text-white p-8 space-y-8">
        <AnimatedBackground
          animationName="starryNight"
          interactive={true}
          interactionConfig={{
            effect: "attract",
            strength: 0.8,
            radius: 150,
            continuous: true,
          }}
        />
        <TitleBanner/>
        <div className="flex flex-wrap gap-2 justify-center mb-6 mt-6">
          {tabs.map(tab => (
            <TabButton
              key={tab.key}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </TabButton>
          ))}
        </div>
        <div>
          {tabs.map(
            (tab) =>
              activeTab === tab.key && (
                <Section key={tab.key} title={tab.label} entries={tab.entries} flip={tab.key !== "participating"} />
              )
          )}
        </div>
        <div className="mt-16 text-center text-white text-xl bg-gray-900/90 p-6 rounded-lg shadow-lg font-semibold animate-pulse border-t-2 border-b-2 border-orange-400">
          🗳️ Entries can be sent until{" "}
          <span className="text-orange-400 font-semibold">July 27 (end of day) </span> to{" "}
          <span className="underline">@pjelacki</span> or via Discord to{" "}
          <span className="underline">mfmo92</span>
        </div>
        <DonationBanner />
      </main>
    </div>
  );
}
