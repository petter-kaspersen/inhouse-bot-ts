import db from "../db/db";

class PlayerInGame extends Error {}
class PlayerInReadyCheck extends Error {}

async function resetQueue(channelId?: string) {
  if (channelId) {
    await db.queuePlayer.deleteMany({
      where: {
        channel_id: channelId,
      },
    });
  } else {
    await db.queuePlayer.deleteMany();
  }
}

export { resetQueue };
