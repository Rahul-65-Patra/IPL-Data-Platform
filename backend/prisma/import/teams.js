const fs = require("fs");
const path = require("path");
const prisma = require("../../src/prisma");

const filePath = path.join(
  __dirname,
  "../../../data/Indian_Premier_League_2022-03-26/teams/teams.json",
);

async function run() {
  console.log("Reading from:", filePath);

  const teams = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  let count = 0;

  for (const t of teams) {
    const name = t.title;

    if (!name) {
      console.warn("⚠️ Skipping invalid team:", t);
      continue;
    }

    await prisma.team.create({
      data: { name },
    });

    count++;
  }

  console.log(`✅ Teams imported: ${count}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
