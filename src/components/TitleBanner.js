// components/TitleBanner.js

export default function TitleBanner() {
  return (
    <section className="flex flex-col items-center space-y-5">
      <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-orange-700/80 to-orange-300/80 text-white p-8 rounded-2xl shadow-2xl tracking-wide">
        NSC 242 in Begonia?
      </h1>
      <div className="max-w-xl w-full mx-auto text-center text-lg bg-gray-900/95 p-6 rounded-xl shadow-lg border-t-4 border-yellow-400 animate-pulse transition-shadow hover:shadow-2xl">
        <span className="font-semibold text-yellow-200">Natia</span> is the <span className="font-mono">242nd edition</span> of the NSC, featuring entries from various nations.
        <span className="block mt-3 text-red-400 font-extrabold text-xl">
          Voting is open until July 25
        </span>
        <span className="block mt-2 text-base text-gray-200">
          Please send your votes to <span className="underline text-blue-300">@NSCUser</span> or via email to <span className="underline text-blue-300">votes@nsc.com</span>.
        </span>
      </div>
    </section>
  );
}
