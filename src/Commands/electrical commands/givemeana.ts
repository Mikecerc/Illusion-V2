import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("give-me-an-a").setDescription("AAA"),
    async execute(interaction: any) {
        const Response = new EmbedBuilder().setTitle("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA").setColor("Orange");

        await interaction.reply({ embeds: [Response] });
        interaction.followUp("https://youtu.be/whhgyzDeCAk");
    },
};
