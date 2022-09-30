import db from "../db/db";

export async function resetQueue(channelId: string) {
  await db.queuePlayer.deleteMany({
    where: {
      channel_id: channelId,
    },
  });
}
