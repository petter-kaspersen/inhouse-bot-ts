import db from "../db/db";
import { QueueChannelHandler } from "../handlers/queue-channel-handler";

import { getPlayersInQueue, addPlayer, removePlayer } from "../queue";

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

it("Correctly resets the queue", async () => {
  const queueBefore = await getPlayersInQueue("server-id");

  expect(queueBefore.length).toBe(0);

  await addPlayer({
    playerId: "player-one",
    role: "TOP",
    channelId: "channel-id",
    serverId: "server-id",
    name: "Player 1",
  });

  const queueAfter = await getPlayersInQueue("server-id");

  expect(queueAfter.length).toBe(1);
});

it("Populates the correct queue", async () => {
  const queueBefore = await getPlayersInQueue("server-id");

  expect(queueBefore.length).toBe(0);

  await addPlayer({
    playerId: "player-one",
    role: "TOP",
    channelId: "channel-id",
    serverId: "server-id",
    name: "Player 1",
  });

  const queueAfterBad = await getPlayersInQueue("random-value");
  const queueAfterGood = await getPlayersInQueue("server-id");

  expect(queueAfterBad.length).toBe(0);
  expect(queueAfterGood.length).toBe(1);
});

it("Correctly marks and unmarks a queue", async () => {
  const queueChannelHandler = new QueueChannelHandler();

  await queueChannelHandler.markQueueChannel(
    "random-channel",
    "server-test-id"
  );

  await addPlayer({
    playerId: "player-one",
    role: "TOP",
    channelId: "random-channel",
    serverId: "server-test-id",
    name: "Player 1",
  });

  const queue = await getPlayersInQueue("server-test-id");

  expect(queue.length).toBe(1);

  await queueChannelHandler.unmarkQueueChannel(
    "random-channel",
    "server-test-id"
  );

  const queueAfter = await getPlayersInQueue("server-test-id");

  expect(queueAfter.length).toBe(0);
});

it("Correctly removes a player from queue", async () => {
  await addPlayer({
    playerId: "player-one",
    role: "TOP",
    channelId: "channel-id",
    serverId: "server-id",
    name: "Player 1",
  });

  const queueBefore = await getPlayersInQueue("server-id");

  expect(queueBefore.length).toBe(1);

  await removePlayer({
    playerId: "player-one",
    serverId: "server-id",
  });

  const queueAfter = await getPlayersInQueue("server-id");

  expect(queueAfter.length).toBe(0);
});
