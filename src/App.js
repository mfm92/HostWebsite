import { AnimatedBackground, usePerformanceMonitor } from 'animated-backgrounds';
import { useEffect } from 'react';

// Example data structure with a "group" property
const entries = [
  {
    nation: "Norway",
    artist: "Aurora",
    song: "Runaway",
    order: 1,
    group: "semi1",
  },
  {
    nation: "Germany",
    artist: "Rammstein",
    song: "Sonne",
    order: 2,
    group: "semi2",
    youtube: "https://www.youtube.com/watch?v=thJgU9jkdU4&list=RDthJgU9jkdU4&start_radio=1",
  },
  {
    nation: "France",
    artist: "Daft Punk",
    song: "One More Time",
    order: 3,
    group: "pq1",
  },
  {
    nation: "Italy",
    artist: "Måneskin",
    song: "Zitti e buoni",
    order: 4,
    group: "pq2",
  },
  {
    nation: "Spain"
  },
  {
    nation: "Sweden"
  },
  {
    nation: "Finland",
    artist: "Nightwish",
    song: "Ghost Love Score",
    order: 5,
    //group: "semi1",
  },
  {
    nation: "United Kingdom",
    artist: "Coldplay",
    song: "Fix You",
    order: 6,
    //group: "semi2",
    youtube: "https://www.youtube.com/watch?v=k4qj8c9d2g",
  },
  {
    nation: "Netherlands"
  },
  {
    nation: "Belgium",
    artist: "Stromae",
    song: "Papaoutai",
    order: 7,
  }
  // Add more entries as needed...
];

const ParticipationCard = ({ entry }) => (
  <div
    className={
      entry.artist
        ? "bg-gradient-to-br w-full h-full from-green-700/70 to-green-400/70 text-white rounded-2xl p-4 shadow-lg border border-black-600"
        : "bg-gradient-to-br w-full h-full from-gray-950/70 to-gray-400/70 text-white rounded-2xl p-4 shadow-lg border border-black-600"
    }
  >
    <div className="text-center text-lg font-bold opacity-90">
      {entry.artist ? '🎉' : '⏳'} {entry.nation} {entry.artist ? '🎉' : ''}
    </div>
  </div>
);

const DonationBanner = () => (
  <div className="w-full bg-gradient-to-r from-orange-700/75 via-green-700/75 to-black-100/75 py-4 px-6 flex justify-center items-center shadow-xl mb-8 rounded-xl">
    <span className="text-white text-lg font-semibold mr-4">
      🌟 Help make a difference! Support Canadian suicide prevention. Your donation can save lives.
    </span>
    <a
      href="https://www.canadahelps.org/en/charities/canadian-association-for-suicide-prevention-casp-acps/"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white text-pink-700 font-bold px-5 py-2 rounded shadow-md hover:bg-pink-100 transition"
    >
      In memory of ❤️ Orangualia ❤️
    </a>
  </div>
);


const FlipCard = ({ entry }) => (
  <div className="group perspective w-72 h-44">
    <div className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover-rotate-y-180">
      {/* Front Side */}
      <div className="absolute w-full h-full bg-gradient-to-br from-blue-950/70 to-blue-400/70 text-white rounded-2xl flex items-center justify-center shadow-lg border border-black-600 backface-hidden">
        <div className="text-center text-lg font-bold opacity-90">
          <b>#{entry.order}</b> {entry.nation}
        </div>
      </div>
      {/* Back Side */}
      <div className="absolute w-full h-full rounded-2xl overflow-hidden transform rotate-y-180 backface-hidden bg-gradient-to-br from-blue-600 to-blue-300 shadow-lg border border-black-600">
        <div className="w-full h-full flex flex-col items-center justify-center text-white p-4 rotate-y-360">
          <div className="text-lg font-semibold">{entry.artist}</div>
          <div className="text-md italic">"{entry.song}"</div>
          {entry.youtube && (
            <a
              href={entry.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 font-bold text-blue-200 underline text-sm hover:text-blue-400 transition"
            >
              YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  </div>
);

function Section({ title, entries, flip = true }) {
  const sortedEntries = [...entries].sort((a, b) => a.order - b.order);
  return (
    <section className="mb-12">
    <h2 className="text-3xl font-bold text-center bg-gray-900/90 text-blue-200 mb-6 bg-gradient-to-r p-4 rounded-lg shadow-lg">
      {title}
    </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {entries.map((entry, idx) =>
          flip
            ? <FlipCard entry={entry} key={idx} />
            : <ParticipationCard entry={entry} key={idx} />
        )}
      </div>
    </section>
  );
}

export default function App() {
  const semi1 = entries.filter(e => e.group === "semi1");
  const pq1 = entries.filter(e => e.group === "pq1");
  const semi2 = entries.filter(e => e.group === "semi2");
  const pq2 = entries.filter(e => e.group === "pq2");

  const performance = usePerformanceMonitor();

  useEffect(() => {
    document.title = "NSC 242";
  }, []);

  return (
    <div>
      <main className="min-h-screen text-white p-8 space-y-8">
        <AnimatedBackground 
          animationName="floatingBubbles"
          enablePerformanceMonitoring={true}
          adaptivePerformance={true}
        />
        <h1 className="text-5xl font-bold text-center bg-gray-900/90 text-blue-200 p-6 rounded-lg shadow-lg">
          NSC 242
        </h1>

        <div className="text-center text-lg bg-gray-900/90 p-4 rounded-lg shadow-lg border-t-2 border-yellow-400 animate-pulse">
          <span className="font-semibold">Natia</span> is the 242nd edition of the NSC, featuring entries from various nations. 
          <span className="text-red-400 font-semibold"> Voting is open until July 25</span>. 
          Please send your votes to <span className="underline">@NSCUser</span> or via email to <span className="underline">...</span></div>

        <Section title="Participating Nations" entries={entries} flip={false}/>
        <Section title="Semi 1" entries={semi1} />
        <Section title="PQs voting in Semi 1" entries={pq1} />
        <Section title="Semi 2" entries={semi2} />
        <Section title="PQs voting in Semi 2" entries={pq2} />

        <div className="mt-16 text-center text-white text-xl bg-gray-900/90 p-6 rounded-lg shadow-lg font-semibold animate-pulse">
          🗳️ Votes can be sent until <span className="text-red-400 font-semibold">July 25</span> to <span className="underline">@NSCUser</span> or via email to <span className="underline">votes@nsc.com</span>
        </div>
        <DonationBanner />
      </main>
    </div>
  );
}

/* TailwindCSS required styles */
/* Add to globals.css or index.css:
.perspective {
  perspective: 1000px;
}
.transform-style-preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
*/
