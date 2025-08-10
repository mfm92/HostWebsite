import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

import Section from "./components/Section";
import { AnimatedBackground } from "animated-backgrounds";
import { entries } from "./data/entries";
import TabButton from "./components/TabButton";
import TitleBanner from "./components/TitleBanner";
import IntermittentBanner from "./components/IntermittentBanner";
import AnimatedVoteDisplay from "./components/AnimatedVoteDisplay";

// Make this helper outside the App component
const tabs = [
  { key: "semi1", path: "/semi1", label: "SF1", group: "semi1" },
  { key: "semi2", path: "/semi2", label: "SF2", group: "semi2" },
  { key: "semi1Results", path: "/semi1-results", label: "SEMI 1 NQ Results", group: "semi1" },
  { key: "semi2Results", path: "/semi2-results", label: "SEMI 2 NQ Results", group: "semi2" },
  { key: "semi1RJResults", path: "/semi1-rj-esults", label: "SEMI 1 RJ NQ Results", group: "semi1" },
  { key: "semi2RJResults", path: "/semi2-rj-results", label: "SEMI 2 RJ NQ Results", group: "semi2" },
  { key: "final", path: "/final", label: "Final", group: "final" },
];


function TabsNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Detect the current tab from pathname
  const currentTab =
    tabs.find(tab => tab.path === location.pathname) ||
    tabs[0];

  // Only show tabs that have entries
  const visibleTabs = tabs
    .map(tab => ({
      ...tab,
      entries: entries.filter(e => e.group.includes(tab.group)),
    }))
    .filter(tab => tab.entries.length > 0);

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-6 mt-6">
      {visibleTabs.map(tab => (
        <TabButton
          key={tab.key}
          isActive={location.pathname === tab.path}
          onClick={() => navigate(tab.path)}
        >
          {tab.label}
        </TabButton>
      ))}
    </div>
  );
}

function SectionsRoutes() {
  // Only show tabs with available entries:
  const visibleTabs = tabs
    .map(tab => ({
      ...tab,
      entries: entries.filter(e => e.group.includes(tab.group)),
    }))
    .filter(tab => tab.entries.length > 0);

  return (
    <Routes>
      {/* Redirect / to active first tab */}
      <Route path="/" element={<Navigate to={visibleTabs[0]?.path || "/semi1"} replace />} />
      {visibleTabs.map(tab => (
        <Route
          key={tab.key}
          path={tab.path}
          element={
            <Section
              title={tab.label}
              entries={tab.entries}
              showResultsTable={tab.key.endsWith("Results")}
              flip={tab.key !== "participating"}
            />
          }
        />
      ))}
      {/* Optionally handle 404 */}
      <Route path="*" element={<div className="text-center text-xl mt-8">Not found</div>} />
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "NSC 242";
  }, []);

  return (
    <Router>
      <main className="min-h-screen text-white p-2 space-y-8">
        <AnimatedBackground
          animationName="starryNight"
          interactive={true}
          interactionConfig={{ effect: "attract", strength: 0.8, radius: 150, continuous: true }}
        />
        <TitleBanner/>
        <TabsNav />
        <SectionsRoutes />
        {/* Only show this banner on results pages */}
        <IntermittentBanner />
      </main>
    </Router>
  );
}
