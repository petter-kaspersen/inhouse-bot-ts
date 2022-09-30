import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { BaseCommand } from "../../lib/command/command";
import { Bot } from "../bot";
import CommandHandler from "../handlers/command-handler";
import { resetQueue } from "../queue-handler";

export default class AdminCommand extends BaseCommand {
  constructor(bot: Bot, client: Client, name: string) {
    super(bot, client, name, true);

    this.registerCommand(this.mark, "admin mark <type>");
    this.registerCommand(this.unmark, "admin unmark");
    this.registerCommand(this.reset, "admin reset <memberOrChannel?>");
  }

  async mark(message: Message, type: string) {
    // TODO: Throw message if not queue
    if (!message.guild) return;

    if (type === "queue") {
      if (
        this.bot.queueChannelHandler.queueChannels.find(
          (q) => q.server_id === message.guild?.id
        )
      ) {
        message.channel.send(`Channel already marked as queue channel.`);
        return;
      }

      await this.bot.queueChannelHandler.markQueueChannel(
        message.channel.id,
        message.guild.id
      );

      message.channel.send(`Current channel marked as queue channel.`);
    }
  }

  async unmark(message: Message) {
    if (!message.guild) return;

    const existingChannel = this.bot.queueChannelHandler.queueChannels.find(
      (q) => q.server_id === message.guild?.id
    );

    if (!existingChannel) {
      message.channel.send(`Channel is not a queue channel.`);
      return;
    }

    await this.bot.queueChannelHandler.unmarkQueueChannel(
      existingChannel.id,
      message.guild.id
    );

    message.channel.send(`Removed current channel as queue channel.`);
  }

  async reset(
    message: Message,
    memberOrChannel?: GuildMember | TextChannel | "here"
  ) {
    await resetQueue(message.channel.id);
    await this.bot.queueChannelHandler.refreshChannelQueue(
      message.channel as TextChannel
    );
  }
}
