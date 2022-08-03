import { SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("clear the queue")
        .setDMPermission(false),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return await interaction.followUp({
                content: "You must be in a voice channel to use this command",
            });
        }
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            subscription.queue = [];
            await interaction.followUp({
                content: `The queue has been cleared`,
                ephemeral: true,
            });
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};
