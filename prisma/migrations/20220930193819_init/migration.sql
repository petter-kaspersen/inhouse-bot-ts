/*
  Warnings:

  - Added the required column `rating_id` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT,
    "rating_id" INTEGER NOT NULL,
    CONSTRAINT "Player_rating_id_fkey" FOREIGN KEY ("rating_id") REFERENCES "PlayerRating" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("id", "name", "server_id", "team") SELECT "id", "name", "server_id", "team" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_rating_id_key" ON "Player"("rating_id");
CREATE TABLE "new_PlayerRating" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "player_id" TEXT NOT NULL,
    "player_server_id" TEXT NOT NULL,
    "trueskill_mu" REAL NOT NULL,
    "trueskill_sigma" REAL NOT NULL
);
INSERT INTO "new_PlayerRating" ("id", "player_id", "player_server_id", "trueskill_mu", "trueskill_sigma") SELECT "id", "player_id", "player_server_id", "trueskill_mu", "trueskill_sigma" FROM "PlayerRating";
DROP TABLE "PlayerRating";
ALTER TABLE "new_PlayerRating" RENAME TO "PlayerRating";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
