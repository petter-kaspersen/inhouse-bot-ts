import "dotenv/config";

import { Client, GatewayIntentBits, Message, Partials } from "discord.js";
import CommandHandler from "./handlers/command-handler";
import AdminCommand from "./commands/admin";
import { QueueChannelHandler } from "./handlers/queue-channel-handler";
import QueueCommand from "./commands/queue";
import { Logger } from "./logger";

const IS_DEV = process.env.DEV === "true" ? true : false;
const DISCORD_TOKEN = IS_DEV
  ? process.env.DISCORD_BOT_DEV_TOKEN
  : process.env.DISCORD_BOT_TOKEN;

export class Bot {
  public client: Client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

  public queueChannelHandler: QueueChannelHandler = new QueueChannelHandler();

  private prefix: string = "!";

  private commandHandler = new CommandHandler();

  constructor() {
    this.addListeners();
  }

  addListeners() {
    this.client.on("ready", async () => {
      await this.registerHandlers();

      await this.registerCommands();

      this.addMessageListener();
    });
  }

  async registerHandlers() {
    this.queueChannelHandler.initialize();
  }

  async registerCommands() {
    this.commandHandler.registerCommand(
      new AdminCommand(this, this.client, "Admin")
    );

    this.commandHandler.registerCommand(
      new QueueCommand(this, this.client, "Queue")
    );
  }

  addMessageListener() {
    this.client.on("messageCreate", async (message: Message) => {
      if (
        message.author.bot ||
        !message.content.toLowerCase().startsWith(this.prefix)
      )
        return;

      message.content = message.content.slice(1);

      const isCommand = await this.commandHandler.checkIfCommand(message);

      if (!isCommand) return;

      if (
        isCommand.requiresAdmin &&
        !message.member?.permissions.has("Administrator")
      )
        return;

      try {
        await isCommand.action(message, ...isCommand.props);
      } catch (e) {
        Logger.Error(
          `Something went wront executing the command ${isCommand.instruction}. Error message: ${e}`
        );
      }
    });
  }

  start() {
    this.client.login(DISCORD_TOKEN ?? "");
  }
}

const bot = new Bot();

bot.start();
