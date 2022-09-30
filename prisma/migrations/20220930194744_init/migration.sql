-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "server_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team" TEXT,
    "rating_id" INTEGER,
    CONSTRAINT "Player_rating_id_fkey" FOREIGN KEY ("rating_id") REFERENCES "PlayerRating" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("id", "name", "rating_id", "server_id", "team") SELECT "id", "name", "rating_id", "server_id", "team" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_rating_id_key" ON "Player"("rating_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
