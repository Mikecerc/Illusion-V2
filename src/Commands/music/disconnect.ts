import { SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("dc")
        .setDescription("disconnect the bot from the vc")
        .setDMPermission(false),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
		if (!interaction.member.voice.channel) {
            return await interaction.followUp({ content: 'You must be in a voice channel to use this command'});
        }
		let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
			subscription.voiceConnection.destroy();
			client.subscriptions.delete(interaction.guildId);
			await interaction.followUp({ content: `Left channel!`, ephemeral: true });
		} else {
			await interaction.followUp('Not playing in this server!');
		}
    }
}