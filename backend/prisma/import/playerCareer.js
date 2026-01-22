const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const dir = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/player_career_stats",
);

async function run() {
  console.log("Reading career stats from:", dir);

  const files = fs.readdirSync(dir);
  let count = 0;

  for (const f of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));

    
    const player = raw.player?.title || raw.player_name || raw.name;

    if (!player) continue;

    await prisma.playerCareer.create({
      data: {
        player,
        matches: Number(raw.matches) || 0,
        runs: Number(raw.runs) || 0,
        wickets: Number(raw.wickets) || 0,
      },
    });

    count++;
  }

  console.log(`✅ Career stats imported: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
