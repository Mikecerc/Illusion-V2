import { AudioPlayerStatus } from "@discordjs/voice";
import { MessageEmbed } from "discord.js";
export default {
    name: "np",
    description: "lists the current song",
    async execute(interaction, client) {
        await interaction.deferReply();
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            let embed = new MessageEmbed()
                .setColor("ORANGE")
                .setAuthor({ name: "Now Playing" });
            if (
                subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
            ) {
                embed.setTitle(`Nothing is currently playing!`);
            } else {
                embed
                    .setTitle(
                        `${subscription.audioPlayer.state.resource.metadata.title}`
                    )
                    .setURL(
                        subscription.audioPlayer.state.resource.metadata.url
                    )
                    .setThumbnail(
                        subscription.audioPlayer.state.resource.metadata
                            .thumbnail
                    )
                    .setFooter(subscription.audioPlayer.state.resource.metadata.requestedBy);
            }
            await interaction.followUp({ embeds: [embed] });
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};
