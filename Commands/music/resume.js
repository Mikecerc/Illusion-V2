module.exports = {
    name: 'resume',
    description: 'resumes the current track',
    async execute(interaction, client) {
        await interaction.deferReply();
		let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
			subscription.audioPlayer.unpause();
			await interaction.followUp({ content: `Unpaused!`, ephemeral: true });
		} else {
			await interaction.followUp('Not playing in this server!');
		}
    }
}