import { ROLE_LIST } from "../constants/role";
import db from "../db/db";
import { addPlayer, GameQueue } from "../queue";

beforeEach(async () => {
  await db.player.deleteMany();
  await db.queuePlayer.deleteMany();
  await db.channel.deleteMany();

  return await db.channel.create({
    data: {
      id: "channel-id",
      server_id: "server-id",
      channel_type: "QUEUE",
    },
  });
});

it("Correctly creates a matchmaking object", async () => {
  for (let i = 0; i < 10; i++) {
    await addPlayer({
      playerId: String(i),
      role: ROLE_LIST[i % 5],
      channelId: "channel-id",
      serverId: "server-id",
      name: `Player ${i}`,
    });
  }

  const queue = new GameQueue("channel-id");

  await queue.init();

  const test = await db.playerRating.findMany();

  console.log("RATINGS ::", test)

  expect(queue.queuePlayers.length).toBe(10);
});
