-- CreateTable
CREATE TABLE "BattingStat" (
    "id" SERIAL NOT NULL,
    "player" TEXT NOT NULL,
    "runs" INTEGER,
    "balls" INTEGER,
    "fours" INTEGER,
    "sixes" INTEGER,
    "strikeRate" DOUBLE PRECISION,

    CONSTRAINT "BattingStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BowlingStat" (
    "id" SERIAL NOT NULL,
    "player" TEXT NOT NULL,
    "overs" DOUBLE PRECISION,
    "runs" INTEGER,
    "wickets" INTEGER,
    "economy" DOUBLE PRECISION,

    CONSTRAINT "BowlingStat_pkey" PRIMARY KEY ("id")
);
