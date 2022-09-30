/*
  Warnings:

  - Added the required column `player_id` to the `QueuePlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server_id` to the `QueuePlayer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "start" DATETIME NOT NULL,
    "server_id" TEXT NOT NULL,
    "blue_expected_winrate" REAL NOT NULL,
    "winner" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GameParticipant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "side" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "player_server_id" TEXT NOT NULL,
    "champion_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "trueskill_mu" REAL NOT NULL,
    "tureskill_sigma" REAL NOT NULL,
    "game_id" INTEGER,
    CONSTRAINT "GameParticipant_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "GameParticipant_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QueuePlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "ready_check_id" TEXT,
    "server_id" TEXT NOT NULL,
    CONSTRAINT "QueuePlayer_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QueuePlayer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QueuePlayer" ("channel_id", "id", "ready_check_id", "role") SELECT "channel_id", "id", "ready_check_id", "role" FROM "QueuePlayer";
DROP TABLE "QueuePlayer";
ALTER TABLE "new_QueuePlayer" RENAME TO "QueuePlayer";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT
);
INSERT INTO "new_Player" ("id", "name", "server_id", "team") SELECT "id", "name", "server_id", "team" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
