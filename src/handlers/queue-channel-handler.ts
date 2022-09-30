import { Channel } from "@prisma/client";

import db from "../db/db";
import { Logger } from "../logger";

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

      Logger.Debug(`Marked new channel as queue channel: ${channelId}`);

      this.queueChannels.push(channel);
    } catch (e: unknown) {
      Logger.Debug("Something went wrong creating a new channel :: ", e);
    }
  }

  async unmarkQueueChannel(channelId: string) {
    await db.channel.delete({
      where: {
        id: channelId,
      },
    });

    await this.initialize();
  }
}
