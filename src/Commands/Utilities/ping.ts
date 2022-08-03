import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Round trip travel between Void and the Discord API"),
    execute(interaction: any, client: any) {
        const Response = new EmbedBuilder()
            .setColor("Orange")
            .setDescription(`🏓${client.ws.ping}ms`);
        interaction.reply({ embeds: [Response] });
    },
};
