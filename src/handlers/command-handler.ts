import { Message } from "discord.js";
import { BaseCommand } from "../../lib/command/command";

export type CommandProp = string;

export interface ICommand {
  instruction: string;
  props: CommandProp[];
  requiresAdmin: boolean;
  action: Function;
}

export default class CommandHandler {
  private commands: ICommand[] = [];

  registerCommand(command: BaseCommand) {
    console.info(
      `[INFO] - Registering ${command.commands.length} commands from group ${command.name}`
    );
    this.commands.push(...command.commands);
  }

  async checkIfCommand(message: Message): Promise<ICommand | false> {
    for await (let command of this.commands) {
      if (message.content.toLowerCase().startsWith(command.instruction)) {
        if (!command.props.length) return command;

        // Else, check if we satisfy all the props
        const restCommand = message.content
          .toLowerCase()
          .replace(command.instruction, "")
          .trim()
          .split(" ");

        if (
          (restCommand[0] === "" && command.props.length) ||
          restCommand.length !== command.props.length
        ) {
          // TODO: Dynamically get prefix here
          await message.channel.send(
            `Correct usage: \`!${command.instruction} ${command.props
              .map((p) => `<${p}>`)
              .join(" ")}\``
          );
          return false;
        }

        command.props = [...restCommand];

        return command;
      }
    }

    return false;
  }

  static getCommands(commands: ICommand[]) {
    return commands.map((c) => c.instruction).join(", ");
  }
}
