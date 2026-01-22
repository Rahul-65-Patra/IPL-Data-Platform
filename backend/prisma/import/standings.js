const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const filePath = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/standings/standings.json",
);

async function run() {
  console.log("Reading from:", filePath);

  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const table = raw.standings?.[0]?.standings || [];

  if (!Array.isArray(table)) {
    throw new Error("Standings array not found");
  }

  console.log("Found standings records:", table.length);

  let count = 0;

  for (const s of table) {
    const teamName = s.team?.title;
    const points = Number(s.points);

    if (!teamName) continue;

    await prisma.standing.create({
      data: {
        team: teamName,
        points,
      },
    });

    count++;
  }

  console.log(`✅ Standings imported: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
