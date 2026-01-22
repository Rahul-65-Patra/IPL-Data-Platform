const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const dirPath = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/scorecards",
);

function parseRunsWickets(score) {
  if (!score) return { runs: 0, wickets: 0 };
  const [runs, wickets] = score.split("/");
  return {
    runs: Number(runs) || 0,
    wickets: Number(wickets) || 0,
  };
}

async function run() {
  console.log("Reading scorecards from:", dirPath);

  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  console.log("Scorecard files found:", files.length);

  let inserted = 0;

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dirPath, file), "utf-8"));

    const matchId = raw.match_id;
    const inningsList = raw.innings;

    if (!Array.isArray(inningsList)) continue;

    const teamMap = {};
    if (raw.teama) teamMap[raw.teama.team_id] = raw.teama.name;
    if (raw.teamb) teamMap[raw.teamb.team_id] = raw.teamb.name;

    for (const inn of inningsList) {
      const { runs, wickets } = parseRunsWickets(inn.scores);

      await prisma.scorecard.create({
        data: {
          matchId,
          innings: inn.number,
          battingTeamId: inn.batting_team_id,
          team: teamMap[inn.batting_team_id] || "Unknown",
          runs,
          wickets,
          overs: Number(inn.equations?.overs || 0),
        },
      });

      inserted++;
    }
  }

  console.log(`✅ Scorecards imported: ${inserted}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
