import { Colors, Embed, EmbedBuilder } from "discord.js";
import { ROLE_LIST } from "../constants/role";
import { QueuePlayerReturn } from "../queue/get-players-in-queue";
import { getRoleEmoji } from "./emoji";

export default function constructQueueEmbed(
  players: QueuePlayerReturn[]
): Partial<Embed> {
  const fields: string[] = [];

  for (let role of ROLE_LIST) {
    fields.push(
      `${getRoleEmoji(role)} ${players
        .filter((p) => p.role === role)
        .map((p) => p.Player?.name || "")
        .join(", ")}`
    );
  }

  return new EmbedBuilder()
    .setColor(Colors.DarkRed)
    .addFields({
      name: "Queue",
      value: fields.join("\n"),
    })
    .setFooter({
      text: `Use !queue <role> to join or !leave to leave | All non-queue messages are deleted`,
    });
}
