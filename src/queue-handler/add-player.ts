import { Role } from "../constants/role";
import db from "../db/db";
import { Logger } from "../logger";

interface AddPlayerOptions {
  playerId: string;
  role: Role;
  channelId: string;
  serverId: string;
  name: string;
}

export async function addPlayer({
  playerId,
  role,
  channelId,
  serverId,
  name,
}: AddPlayerOptions): Promise<void> {
  // TODO: Make all sanity checks here.

  // Check if player exists.
  const hasPlayer = await db.player.findFirst({
    where: {
      id: playerId,
      server_id: serverId,
    },
  });

  if (!hasPlayer) {
    await db.player.create({
      data: {
        id: playerId,
        server_id: serverId,
        name: name,
      },
    });
  }

  await db.queuePlayer.create({
    data: {
      server_id: serverId,
      channel_id: channelId,
      player_id: playerId,
      role: role,
    },
  });

  Logger.Info(
    `Added player ${name} with id ${playerId} in role ${role} to queue in channel ${channelId} in server ${serverId}`
  );
}
