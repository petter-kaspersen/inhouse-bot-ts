import db from "../db/db";

export async function isInReadyCheck(playerId: string): Promise<boolean> {
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
