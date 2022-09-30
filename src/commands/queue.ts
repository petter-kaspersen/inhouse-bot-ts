import { Client, Message } from "discord.js";
import { BaseCommand } from "../command";
import { Bot } from "../bot";
import { search } from "fast-fuzzy";
import { ROLE_LIST } from "../constants/role";
import { addPlayer } from "../queue";

export default class QueueCommand extends BaseCommand {
  constructor(bot: Bot, client: Client, name: string) {
    super(bot, client, name);

    this.registerCommand(this.queue, "queue <role>");
  }

  async queue(message: Message, role: string) {
    if (!message.guild) return;
    const properRole = search(role, ROLE_LIST);

    if (!properRole.length) {
      return message.channel.send(`Invalid role passed`);
    }

    const actualRole = properRole[0];

    await addPlayer({
      playerId: message.author.id,
      name: message.author.username,
      role: actualRole,
      channelId: message.channel.id,
      serverId: message.guild.id,
    });

    await this.bot.queueChannelHandler.updateQueueChannels(this.bot.client);
  }
}
