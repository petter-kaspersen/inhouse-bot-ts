import { Base, Client } from "discord.js";

export class BaseCommand {
  public name: string;
  public client: Client;
  public requiresAdmin: boolean = false;
  private commands: { [key: string]: Function } = {};

  constructor(client: Client, name: string, requiresAdmin: boolean = false) {
    this.client = client;
    this.name = name;
    this.requiresAdmin = this.requiresAdmin;
  }

  registerCommand(command: Function, commandName: string) {
    this.commands[commandName] = command;
  }
}
