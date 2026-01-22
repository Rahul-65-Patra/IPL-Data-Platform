import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Teams() {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/teams")
      .then((res) => setTeams(res.data))
      .catch(() => setTeams([]));
  }, []);

  if (!teams) return <Loader />;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">IPL Teams</h2>
        <p className="text-sm text-gray-500 mt-1">
          Official teams participating in IPL 2022
        </p>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Team Name
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {teams.length === 0 && (
              <tr>
                <td
                  colSpan="2"
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No teams found
                </td>
              </tr>
            )}

            {teams.map((t, i) => (
              <tr key={t.id} className="hover:bg-orange-50/40 transition">
                <td className="px-6 py-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700">
                    {i + 1}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">
                  {t.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
