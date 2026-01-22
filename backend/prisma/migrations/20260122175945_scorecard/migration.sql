-- CreateTable
CREATE TABLE "Scorecard" (
    "id" SERIAL NOT NULL,
    "matchId" INTEGER NOT NULL,
    "team" TEXT NOT NULL,
    "innings" INTEGER NOT NULL,
    "runs" INTEGER NOT NULL,
    "wickets" INTEGER NOT NULL,
    "overs" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Scorecard_pkey" PRIMARY KEY ("id")
);
