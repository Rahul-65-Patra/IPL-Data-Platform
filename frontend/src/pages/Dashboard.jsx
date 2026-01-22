import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:5000/teams"),
      axios.get("http://localhost:5000/players"),
      axios.get("http://localhost:5000/matches"),
    ]).then(([t, p, m]) => {
      setData({
        teams: t.data.length,
        players: p.data.length,
        matches: m.data.length,
      });
    });
  }, []);

  if (!data) return <Loader />;

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Dashboard Overview
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          IPL 2022 key statistics and dataset summary
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Stat
          title="Teams"
          value={data.teams}
          icon="🏏"
          gradient="from-orange-500 to-orange-600"
        />
        <Stat
          title="Players"
          value={data.players}
          icon="👤"
          gradient="from-blue-500 to-blue-600"
        />
        <Stat
          title="Matches"
          value={data.matches}
          icon="📊"
          gradient="from-green-500 to-green-600"
        />
      </div>
    </div>
  );
}

function Stat({ title, value, icon, gradient }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Accent bar */}
      <div
        className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${gradient}`}
      />

      <div className="p-6 text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-4xl font-bold text-gray-800 mt-2">{value}</p>
      </div>
    </div>
  );
}
