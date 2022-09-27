import { Client } from "discord.js";
import { BaseCommand } from "../../lib/command/command";

export default class AdminCommand extends BaseCommand {
  constructor(client: Client, name: string) {
    super(client, name, true);

    this.registerCommand(this.mark, "!admin mark <type>");
  }

  mark(args: string[]) {
    console.log(args);
  }
}
