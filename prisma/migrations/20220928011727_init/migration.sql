-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" TEXT NOT NULL,
    "player_server_id" TEXT NOT NULL,
    "trueskill_mu" REAL NOT NULL,
    "trueskill_sigma" REAL NOT NULL,
    CONSTRAINT "PlayerRating_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
