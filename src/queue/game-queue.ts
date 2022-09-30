import { QueuePlayer } from "@prisma/client";
import db from "../db/db";

export class GameQueue {
  public queuePlayers: QueuePlayer[] = [];
  private channelId: string;
  private serverId: string = "";

  constructor(channelId: string) {
    this.channelId = channelId;
  }

  async init() {
    const potential = await db.queuePlayer.findMany({
      where: {
        channel_id: this.channelId,
      },
      include: {
        Player: {
          include: {
            rating: true,
          },
        },
      },
    });

    if (!potential.length) {
      return;
    }

    this.serverId = potential[0].server_id;

    for await (let queuePlayer of potential) {
      if (!queuePlayer.Player?.rating) {
        await db.playerRating.create({
          data: {
            player_id: queuePlayer.player_id,
            player_server_id: queuePlayer.server_id,
            trueskill_mu: 25,
            trueskill_sigma: 25 / 3,
          },
        });
      }
    }
  }
}
