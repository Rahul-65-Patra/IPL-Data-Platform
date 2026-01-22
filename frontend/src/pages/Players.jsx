import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Players() {
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/players")
      .then((res) => setPlayers(res.data))
      .catch(() => setPlayers([]));
  }, []);

  if (!players) return <Loader />;

  return (
    <div className="p-8 space-y-6">
      
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Players</h2>
        <p className="text-sm text-gray-500 mt-1">
          IPL 2022 registered players and team associations
        </p>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-10">
            No players found
          </div>
        )}

        {players.map((p) => (
          <div
            key={p.id}
            className="relative overflow-hidden group bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            
            <div className="absolute top-0 left-0 h-1 w-full bg-orange-600" />

            <div className="p-6 pt-7 text-center">
              
              <div className="mx-auto mb-3 h-14 w-14 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xl font-bold">
                {p.name?.charAt(0)}
              </div>

             
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>

             
              <p className="mt-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                {p.team || "Unassigned"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
