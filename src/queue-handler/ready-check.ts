import db from "../db/db";

type ValidListOfPlayerIds = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string
];

export async function startReadyCheck(
  playerIds: ValidListOfPlayerIds,
  channelId: string,
  readyCheckmessageId: string
) {
  await db.queuePlayer.updateMany({
    where: {
      player_id: {
        in: playerIds,
      },
      channel_id: channelId,
    },
    data: {
      ready_check_id: readyCheckmessageId,
    },
  });
}
