const router = require("express").Router();
const prisma = require("../prisma");

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get all IPL teams
 *     tags: [Teams]
 *     responses:
 *       200:
 *         description: List of teams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */

router.get("/", async (req, res) => {
  const teams = await prisma.team.findMany();
  res.json(teams);
});

module.exports = router;
