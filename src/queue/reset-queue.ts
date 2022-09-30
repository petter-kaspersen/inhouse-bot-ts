import { TextChannel } from "discord.js";
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

export async function resetQueueForPlayer(playerId: string) {
  await db.queuePlayer.deleteMany({
    where: {
      player_id: playerId,
    },
  });
}
