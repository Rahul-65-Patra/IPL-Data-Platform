import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
);

export default function Stats() {
  const [batting, setBatting] = useState(null);
  const [bowling, setBowling] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/batting")
      .then((res) => setBatting(res.data.slice(0, 5)));

    axios
      .get("http://localhost:5000/bowling")
      .then((res) => setBowling(res.data.slice(0, 5)));
  }, []);

  if (!batting || !bowling) return <Loader />;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          Performance Analytics
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Top batting and bowling performers from IPL 2022
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Batting Chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Top Run Scorers
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Highest total runs scored
          </p>

          <Bar
            data={{
              labels: batting.map((b) => b.player),
              datasets: [
                {
                  label: "Runs",
                  data: batting.map((b) => b.runs),
                  backgroundColor: "#f97316",
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        {/* Bowling Chart */}
        <div className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            Top Wicket Takers
          </h3>
          <p className="text-sm text-gray-500 mb-4">Highest wickets taken</p>

          <Pie
            data={{
              labels: bowling.map((b) => b.player),
              datasets: [
                {
                  data: bowling.map((b) => b.wickets),
                  backgroundColor: [
                    "#fb923c",
                    "#f97316",
                    "#ea580c",
                    "#c2410c",
                    "#9a3412",
                  ],
                  borderWidth: 0,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  position: "bottom",
                  labels: {
                    boxWidth: 12,
                    padding: 16,
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
