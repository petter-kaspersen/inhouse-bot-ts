import db from "../db/db";
import { addPlayer, getPlayersInQueue } from "../handlers/queue-handler";

beforeAll(async () => {
  await db.queuePlayer.deleteMany();
  await db.channel.deleteMany();

  await db.channel.create({
    data: {
      id: "channel-id",
      server_id: "server-id",
      channel_type: "QUEUE",
    },
  });
});

it("Correctly resets the queue", async () => {
  const queueBefore = await getPlayersInQueue();

  expect(queueBefore.length).toBe(0);

  await addPlayer("some-random-player-id", "TOP", "channel-id", "server-id", "Player 1");

  const queueAfter = await getPlayersInQueue();

  expect(queueAfter.length).toBe(1);
});
