import { BaseCommand } from "../../lib/command/command";
import AdminCommand from "../commands/admin";

export default class CommandHandler {
  registerCommand(command: AdminCommand) {
    // @ts-ignore
    console.log(command.mark())
  }
}
