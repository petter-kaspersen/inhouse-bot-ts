import db from "../db/db";

class PlayerInGame extends Error {}
class PlayerInReadyCheck extends Error {}

async function isInReadyCheck(playerId: string): Promise<boolean> {
  const player = await db.queuePlayer.findMany({
    where: {
      player_id: playerId,
      NOT: {
        ready_check_id: null,
      },
    },
  });

  if (!player.length) return false;

  return true;
}

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

async function getPlayersInQueue() {
  return await db.queuePlayer.findMany();
}

type Role = "TOP" | "JGL" | "MID" | "BOT" | "SUP"

async function addPlayer(
  playerId: string,
  role: Role,
  channelId: string,
  serverId: string,
  name: string
) {
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
      channel_id: channelId,
      player_id: playerId,
      role: role,
    },
  });
}

export { isInReadyCheck, resetQueue, addPlayer, getPlayersInQueue };
