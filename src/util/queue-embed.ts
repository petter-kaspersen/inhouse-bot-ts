import { QueuePlayer } from "@prisma/client";
import { Colors, Embed, EmbedBuilder, EmbedField } from "discord.js";
import { ROLE_LIST } from "../constants/role";
import { QueuePlayerReturn } from "../queue-handler/get-players-in-queue";
import { getRoleEmoji } from "./emoji";

export default function constructQueueEmbed(
  players: QueuePlayerReturn[]
): Partial<Embed> {
  /* 
    const embed = new EmbedBuilder()
    .setColor("#d82e34")
    .setTitle(
      `Stats for ${stats[0].name} ${
        role ? `in role ${role.toLowerCase()}` : ""
      }`
    )
    .addFields(
      {
        name: "Games",
        value: String(gamesPlayed),
        inline: true,
      },
      {
        name: "Win %",
        value: `${winrate}%`,
        inline: true,
      }
    )
    .addFields({
      name: `Top 3 champs`,
      value: this.constructChampionString(topThree),
    });
 */

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
