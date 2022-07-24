module.exports = {
    name: 'pause',
    description: 'pauses the current track',
    async execute(interaction, client) {
        await interaction.deferReply();
		let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
			subscription.audioPlayer.pause();
			await interaction.followUp({ content: `Paused!`, ephemeral: true });
		} else {
			await interaction.followUp('Not playing in this server!');
		}
    }
}