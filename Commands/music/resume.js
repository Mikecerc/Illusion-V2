export default {
    name: 'resume',
    description: 'resumes the current track',
    async execute(interaction, client) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return await interaction.followUp({ content: 'You must be in a voice channel to use this command'});
        }
		let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
			subscription.audioPlayer.unpause();
			await interaction.followUp({ content: `Unpaused!`, ephemeral: true });
		} else {
			await interaction.followUp('Not playing in this server!');
		}
    }
}