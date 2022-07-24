export default {
    name: 'disconnect',
    description: 'disconnects the bot from the voice channel',
    async execute(interaction, client) {
        await interaction.deferReply();
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