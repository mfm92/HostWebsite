// components/ResultsTable.js
export default function ResultsTable({ results }) {
  // Expects results as an array of: { place, nation, points }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900/95 rounded-xl shadow-lg text-white">
        <thead>
          <tr>
            <th className="px-4 py-3 border-b border-gray-700 font-bold text-orange-300 text-left">Place</th>
            <th className="px-4 py-3 border-b border-gray-700 font-bold text-orange-300 text-left">Nation</th>
            <th className="px-4 py-3 border-b border-gray-700 font-bold text-orange-300 text-left">Points</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-8 text-gray-400">No results yet.</td>
            </tr>
          ) : (
            results.map(({ place, nation, points }, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-gray-800/70" : "bg-gray-900/70"}>
                <td className="px-4 py-2 font-bold text-lg">{place}</td>
                <td className="px-4 py-2">{nation}</td>
                <td className="px-4 py-2 text-right">{points}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
