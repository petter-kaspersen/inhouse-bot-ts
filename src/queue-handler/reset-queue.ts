import db from "../db/db";

export async function resetQueue(channelId?: string) {
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
