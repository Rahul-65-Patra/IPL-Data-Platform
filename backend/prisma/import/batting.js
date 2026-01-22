const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const dirPath = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/batting_stats",
);

async function run() {
  const files = fs.readdirSync(dirPath);
  let count = 0;

  for (const file of files) {
    const raw = JSON.parse(fs.readFileSync(path.join(dirPath, file), "utf-8"));

    const stats = raw.response?.stats || [];

    for (const s of stats) {
      const player = s.player?.title;
      if (!player) continue;

      await prisma.battingStat.create({
        data: {
          player,
          runs: Number(s.runs) || 0,
          balls: Number(s.balls) || null,
          sr: Number(s.strike_rate) || 0,
        },
      });

      count++;
    }
  }

  console.log(`✅ Batting leaderboard records imported: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
