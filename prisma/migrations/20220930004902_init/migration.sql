-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QueuePlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" TEXT NOT NULL,
    "player_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "ready_check_id" TEXT,
    "server_id" TEXT NOT NULL,
    CONSTRAINT "QueuePlayer_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "QueuePlayer_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_QueuePlayer" ("channel_id", "id", "player_id", "ready_check_id", "role", "server_id") SELECT "channel_id", "id", "player_id", "ready_check_id", "role", "server_id" FROM "QueuePlayer";
DROP TABLE "QueuePlayer";
ALTER TABLE "new_QueuePlayer" RENAME TO "QueuePlayer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
