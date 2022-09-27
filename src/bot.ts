import "dotenv/config";

import { Client, GatewayIntentBits, Partials } from "discord.js";
import CommandHandler from "./handlers/command-handler";
import AdminCommand from "./commands/admin";

const IS_DEV = process.env.DEV === "true" ? true : false;
const DISCORD_TOKEN = IS_DEV
  ? process.env.DISCORD_BOT_DEV_TOKEN
  : process.env.DISCORD_BOT_TOKEN;

class Bot {
  private client: Client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  });

  private commandHandler = new CommandHandler();

  constructor() {
    this.addListeners();
  }

  addListeners() {
    this.client.on("ready", () => {
      this.registerCommands();
    });
  }

  registerCommands() {
    this.commandHandler.registerCommand(new AdminCommand(this.client, "Admin"));
  }

  start() {
    this.client.login(
      DISCORD_TOKEN ??
        "MTAyMTE2NzMwMzU2MTMyMjYzNw.G2uvsQ.8Vkhasw_Q1RF7c-SrM2xYwZeNGSa6ENTRDomAk"
    );
  }
}

const bot = new Bot();

bot.start();
