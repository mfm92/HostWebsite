import { useState } from "react";

function FlagImage({ nation }) {
  const [extIndex, setExtIndex] = useState(0);
  const extensions = ["png", "jpeg", "jpg"];
  const [src, setSrc] = useState(`/flags/${nation}.${extensions[extIndex]}`);

  const handleError = () => {
    if (extIndex < extensions.length - 1) {
      const newIndex = extIndex + 1;
      setExtIndex(newIndex);
      setSrc(`/flags/${nation}.${extensions[newIndex]}`);
    } else {
      setSrc("/flags/Default.png"); // fallback to default if all fail
    }
  };

  return (
    <img
      src={src}
      alt={`${nation} flag`}
      className="w-full h-full object-cover flag-fade flag-pop"
      loading="lazy"
      onError={handleError}
    />
  );
}

export function ResultsTable({ entries }) {
  // Filter and sort results with resultPlace >= 10 ascending
  const results = entries
    .filter(e => typeof e.resultPlace === "number" && e.resultPlace >= 10)
    .sort((a, b) => a.resultPlace - b.resultPlace);

  if (results.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-6 rounded-lg shadow-lg border border-orange-500 font-proximanova">
      <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-900 border-b border-orange-600">
            {["", "", "", "Artist", "Title", "Points"].map((header) => (
              <th
                key={header}
                className="py-3 px-4 text-left text-orange-400 text-sm uppercase tracking-wider select-none"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((entry) => (
            <tr
              key={entry.id || entry.name}
              className="border-b border-gray-800 cursor-default hover:bg-gray-800 transition-colors duration-300"
              title={`Place ${entry.resultPlace} — ${entry.artist} - ${entry.song}`}
            >
              {entry.resultPlace} === 10 ? (
                <>
                  <td className="py-3 px-4 italic text-gray-400 text-center">
                    10
                  </td>
                  <td colSpan={4} className="py-3 px-4 italic text-gray-400 text-center">
                    10th place
                  </td>
                  <td className="py-3 px-4 font-extrabold text-orange-500 text-right text-2xl tabular-nums w-20">
                    {entry.resultPoints}
                  </td>
                </>
              ): {entry.rejuJoker ? ( 
                <>
                  <td className="py-3 px-4 italic text-gray-400 text-center">
                    {entry.resultPlace}
                  </td>
                  <td colSpan={4} className="py-3 px-4 italic text-gray-400 text-center">
                    Rest Jury Qualifier
                  </td>
                  <td className="py-3 px-4 font-extrabold text-orange-500 text-right text-2xl tabular-nums w-20">
                    {entry.resultPoints}
                  </td>
                </>
              ): (
                <>
                  <td className="py-3 px-4 font-extrabold text-orange-600 text-2xl text-center w-16 tabular-nums">
                    {entry.resultPlace}
                  </td>
                  <td className="py-3 px-4 w-16 align-middle">
                    <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg ring-2 ring-white/50 flex items-center justify-center bg-white/10 flag-shine mx-auto">
                      <FlagImage nation={entry.nation} />
                    </div>
                  </td>
                  <td className="py-3 px-4 uppercase font-semibold text-lg tracking-wide text-white whitespace-nowrap max-w-[150px] truncate">
                    {entry.nation}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-300 max-w-[200px] truncate">
                    {entry.artist}
                  </td>
                  <td className="py-3 px-4 text-gray-200 max-w-[240px] truncate italic">
                    {entry.song}
                  </td>
                  <td className="py-3 px-4 font-extrabold text-orange-500 text-right text-2xl tabular-nums w-20">
                    {entry.resultPoints}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
