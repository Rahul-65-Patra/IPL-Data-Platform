const router = require("express").Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  const players = await prisma.player.findMany();
  res.json(players);
});

module.exports = router;
