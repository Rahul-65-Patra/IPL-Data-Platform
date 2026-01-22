/*
  Warnings:

  - You are about to drop the column `fours` on the `BattingStat` table. All the data in the column will be lost.
  - You are about to drop the column `sixes` on the `BattingStat` table. All the data in the column will be lost.
  - You are about to drop the column `strikeRate` on the `BattingStat` table. All the data in the column will be lost.
  - You are about to drop the column `overs` on the `BowlingStat` table. All the data in the column will be lost.
  - You are about to drop the column `runs` on the `BowlingStat` table. All the data in the column will be lost.
  - You are about to drop the column `matchDate` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the `PlayerStat` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `team` on table `Player` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PlayerStat" DROP CONSTRAINT "PlayerStat_playerId_fkey";

-- AlterTable
ALTER TABLE "BattingStat" DROP COLUMN "fours",
DROP COLUMN "sixes",
DROP COLUMN "strikeRate",
ADD COLUMN     "sr" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "BowlingStat" DROP COLUMN "overs",
DROP COLUMN "runs";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "matchDate",
ADD COLUMN     "date" TEXT;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "team" SET NOT NULL;

-- DropTable
DROP TABLE "PlayerStat";

-- CreateTable
CREATE TABLE "PlayerCareer" (
    "id" SERIAL NOT NULL,
    "player" TEXT NOT NULL,
    "matches" INTEGER,
    "runs" INTEGER,
    "wickets" INTEGER,

    CONSTRAINT "PlayerCareer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standing" (
    "id" SERIAL NOT NULL,
    "team" TEXT NOT NULL,
    "points" INTEGER,

    CONSTRAINT "Standing_pkey" PRIMARY KEY ("id")
);
