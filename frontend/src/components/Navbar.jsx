export default function Navbar({ setPage, page }) {
  const linkClass = (p) =>
    `relative px-1 pb-1 transition-all duration-200
     ${
       page === p
         ? "text-orange-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-orange-600"
         : "text-gray-700 hover:text-orange-600"
     }`;

  return (
    <nav className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold">
            IPL
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">
            IPL Data Platform
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-8 text-sm">
          <button
            onClick={() => setPage("dashboard")}
            className={linkClass("dashboard")}
          >
            Dashboard
          </button>
          <button
            onClick={() => setPage("teams")}
            className={linkClass("teams")}
          >
            Teams
          </button>
          <button
            onClick={() => setPage("players")}
            className={linkClass("players")}
          >
            Players
          </button>
          <button
            onClick={() => setPage("matches")}
            className={linkClass("matches")}
          >
            Matches
          </button>
          <button
            onClick={() => setPage("stats")}
            className={linkClass("stats")}
          >
            Stats
          </button>
        </div>
      </div>
    </nav>
  );
}
