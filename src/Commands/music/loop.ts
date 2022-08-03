import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("toggles loop mode")
        .setDMPermission(false),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return interaction.followUp({ content: 'You must be in a voice channel to use this command'});
        }
		let subscription = client.subscriptions.get(interaction.guildId);
        if (!subscription) {
            return interaction.followUp({ content: 'The bot is not currently in a voice channel. Try and play something first!'})
        }
        if (subscription.loop) {
            subscription.loop = false;
            return interaction.followUp({ content: '🔁Loop mode disabled'})
        }  else if (!subscription.loop) {
            subscription.loop = true;
            return interaction.followUp({ content: '🔁Loop mode enabled'})
        }
    }
}