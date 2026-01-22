const router = require("express").Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  const standings = await prisma.standing.findMany();
  res.json(standings);
});

module.exports = router;
