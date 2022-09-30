-- CreateTable
CREATE TABLE "QueuePlayer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "channel_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "ready_check_id" TEXT NOT NULL,
    CONSTRAINT "QueuePlayer_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
