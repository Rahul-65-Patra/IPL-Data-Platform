import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Matches() {
  const [matches, setMatches] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/matches")
      .then((res) => setMatches(res.data))
      .catch(() => setMatches([]));
  }, []);

  if (!matches) return <Loader />;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Matches</h2>
        <p className="text-sm text-gray-500 mt-1">
          IPL 2022 match results and venues
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-gray-600 uppercase tracking-wide text-xs">
              <th className="p-4 text-left">Team 1</th>
              <th className="p-4 text-left">Team 2</th>
              <th className="p-4 text-left">Winner</th>
              <th className="p-4 text-left">Venue</th>
            </tr>
          </thead>

          <tbody>
            {matches.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No match data available
                </td>
              </tr>
            )}

            {matches.map((m, idx) => (
              <tr
                key={m.id}
                className={`border-t transition-colors ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-orange-50`}
              >
                <td className="p-4 font-medium text-gray-800">{m.team1}</td>
                <td className="p-4 font-medium text-gray-800">{m.team2}</td>
                <td className="p-4">
                  {m.winner ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      {m.winner}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">No Result</span>
                  )}
                </td>
                <td className="p-4 text-gray-600">{m.venue || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
