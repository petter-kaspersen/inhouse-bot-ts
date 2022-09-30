import db from "../db/db";

export async function getLastGame(playerId: string, serverId: string) {
  return await db.game.findMany();
}
