const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const filePath = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/squads/squads.json",
);

async function run() {
  const squads = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  let count = 0;

  for (const team of squads) {
    const teamName = team.team?.title || team.title;

    for (const p of team.players || []) {
      const name = p.title || p.short_name;

      if (!name || !teamName) continue;

      await prisma.player.create({
        data: {
          name,
          team: teamName,
        },
      });

      count++;
    }
  }

  console.log(`✅ Players imported: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
