import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Matches from "./pages/Matches";
import Stats from "./pages/Stats";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="min-h-screen">
      <Navbar page={page} setPage={setPage} />  

      {page === "dashboard" && <Dashboard />}
      {page === "teams" && <Teams />}
      {page === "players" && <Players />}
      {page === "matches" && <Matches />}
      {page === "stats" && <Stats />}
    </div>
  );
}
