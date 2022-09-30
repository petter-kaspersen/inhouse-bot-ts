import { Base, Client } from "discord.js";
import { Bot } from "./bot";
import { CommandProp, ICommand } from "./handlers/command-handler";

export class BaseCommand {
  public bot: Bot;
  public name: string;
  public client: Client;
  public requiresAdmin: boolean = false;
  public commands: ICommand[] = [];
  private propsRegex: RegExp = /<(.*)>+/g;

  constructor(
    bot: Bot,
    client: Client,
    name: string,
    requiresAdmin: boolean = false
  ) {
    this.bot = bot;
    this.client = client;
    this.name = name;
    this.requiresAdmin = requiresAdmin;
  }

  registerCommand(command: Function, commandName: string) {
    const props = this.getProps(commandName);

    commandName = commandName.replaceAll(this.propsRegex, "").trim();

    this.commands.push({
      instruction: commandName,
      props,
      requiresAdmin: this.requiresAdmin,
      action: command.bind(this),
    });
  }

  getProps(commandName: string): CommandProp[] {
    const matches = commandName.matchAll(this.propsRegex);

    const returnable: CommandProp[] = [];

    for (const match of matches) {
      returnable.push(match[1]);
    }

    return returnable;
  }
}
