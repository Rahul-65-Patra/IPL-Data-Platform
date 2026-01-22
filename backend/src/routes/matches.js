const router = require("express").Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  const matches = await prisma.match.findMany();
  res.json(matches);
});

module.exports = router;
