import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";

import Section from "./components/Section";
import { AnimatedBackground } from "animated-backgrounds";
import { entries } from "./data/entries";
import TabButton from "./components/TabButton";
import TitleBanner from "./components/TitleBanner";
import IntermittentBanner from "./components/IntermittentBanner";

// Make this helper outside the App component
const tabs = [
  { key: "semi1", path: "/semi1", label: "Semi 1", group: "semi1" },
  { key: "semi1pq", path: "/semi1pq", label: "Semi 1 PQs", group: "pq1" },
  { key: "semi2", path: "/semi2", label: "Semi 2", group: "semi2" },
  { key: "semi2pq", path: "/semi2pq", label: "Semi 2 PQs", group: "pq2" }
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
      entries: entries.filter(e => e.group === tab.group),
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
      entries: entries.filter(e => e.group === tab.group),
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
        <IntermittentBanner />
      </main>
    </Router>
  );
}
