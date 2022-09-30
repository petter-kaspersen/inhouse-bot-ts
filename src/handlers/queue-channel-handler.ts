import { Channel } from "@prisma/client";
import { Client, Embed, TextChannel } from "discord.js";

import db from "../db/db";
import { Logger } from "../logger";
import { getPlayersInQueue } from "../queue-handler";
import { getPlayersInQueueByChannel } from "../queue-handler/get-players-in-queue";
import constructQueueEmbed from "../util/queue-embed";

export class QueueChannelHandler {
  queueChannels: Channel[] = [];

  constructor() {}

  async initialize() {
    const channels = await db.channel.findMany({
      where: {
        channel_type: "QUEUE",
      },
    });

    Logger.Debug("[CHANNELS] :: ", channels);

    this.queueChannels = channels;
  }

  async markQueueChannel(channelId: string, serverId: string) {
    try {
      const channel = await db.channel.create({
        data: {
          channel_type: "QUEUE",
          server_id: serverId,
          id: channelId,
        },
      });

      Logger.Info(
        `Marked new channel as queue channel: ${channelId} in server ${serverId}`
      );

      this.queueChannels.push(channel);
    } catch (e: unknown) {
      Logger.Info("Something went wrong creating a new channel :: ", e);
    }
  }

  async unmarkQueueChannel(channelId: string, serverId: string) {
    await db.channel.deleteMany({
      where: {
        id: channelId,
        server_id: serverId,
      },
    });

    Logger.Info(`Unmarked channel ${channelId} in server ${serverId}`);

    await this.initialize();
  }

  async updateQueueChannels(client: Client, serverId?: string) {
    let channelsToCheck: string[] = [];

    if (!serverId) {
      channelsToCheck = this.queueChannels.map((c) => c.id);
    }

    for await (let channelId of channelsToCheck) {
      console.log("LOOKING FOR ::", channelId);
      const channel = client.channels.cache.get(channelId);

      if (!channel) {
        console.log("UH-OH INVALID CHANNEL");
        continue;
      }
      await this.refreshChannelQueue(channel as TextChannel);
    }
  }

  async refreshChannelQueue(channel: TextChannel) {
    const playersInQueue = await getPlayersInQueueByChannel(channel.id);

    channel.send({ embeds: [constructQueueEmbed(playersInQueue) as Embed] });
  }
}
