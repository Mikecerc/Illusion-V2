module.exports = {
    name: 'skip',
    description: 'Skips the current track',
    async execute(interaction, client) {
        await interaction.deferReply();
		let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
			// Calling .stop() on an AudioPlayer causes it to transition into the Idle state. Because of a state transition
			// listener defined in music/subscription.ts, transitions into the Idle state mean the next track from the queue
			// will be loaded and played.
			subscription.audioPlayer.stop();
			await interaction.followUp('Skipped song!');
		} else {
			await interaction.followUp('Not playing in this server!');
		}
    }
}