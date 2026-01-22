const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const filePath = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/matches/matches.json",
);

async function run() {
  const matches = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const m of matches) {
    const team1 = m.teama?.name;
    const team2 = m.teamb?.name;

    if (!team1 || !team2) continue;

    await prisma.match.create({
      data: {
        team1,
        team2,
        venue: m.venue?.name || null,
        winner: m.result?.winner || null,
        date: m.date_start || null,
      },
    });

    count++;
  }

  console.log(`✅ Matches imported: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
