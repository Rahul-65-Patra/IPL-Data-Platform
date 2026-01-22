const router = require("express").Router();
const prisma = require("../prisma");

router.get("/", async (req, res) => {
  const stats = await prisma.battingStat.findMany({ take: 50 });
  res.json(stats);
});

module.exports = router;
