import { Role } from "../constants/role";
import db from "../db/db";
import { PlayerInQueueError } from "../errors";
import { isInReadyCheck } from "./is-in-ready-check";

interface RemovePlayerOptions {
  playerId: string;
  serverId: string;
  channelId?: string;
}

interface QueuePlayerWhere {
  player_id: string;
  server_id: string;
  channel_id?: string;
}

export async function removePlayer({
  playerId,
  channelId,
  serverId,
}: RemovePlayerOptions): Promise<void> {
  // TODO: Check if player is in ready check

  if ((await isInReadyCheck(playerId)) && channelId) {
    throw new PlayerInQueueError();
  }

  let whereQuery: QueuePlayerWhere = {
    player_id: playerId,
    server_id: serverId,
  };

  if (channelId) {
    whereQuery = {
      ...whereQuery,
      channel_id: channelId,
    };
  }

  await db.queuePlayer.deleteMany({
    where: whereQuery,
  });
}
