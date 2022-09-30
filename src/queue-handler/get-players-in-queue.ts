import { Player, QueuePlayer } from "@prisma/client";
import db from "../db/db";

export async function getPlayersInQueue(
  serverId: string
): Promise<QueuePlayer[]> {
  return await db.queuePlayer.findMany({
    where: {
      server_id: serverId,
    },
  });
}

export interface QueuePlayerReturn {
  role: string;
  Player: Player | null;
}

export async function getPlayersInQueueByChannel(
  channelId: string
): Promise<QueuePlayerReturn[]> {
  return await db.queuePlayer.findMany({
    where: {
      channel_id: channelId,
    },
    select: {
      role: true,
      Player: true,
    },
  });
}
