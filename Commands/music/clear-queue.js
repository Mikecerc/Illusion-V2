export default {
    name: 'clear',
    description: 'clear the queue',
    async execute(interaction, client) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return await interaction.followUp({ content: 'You must be in a voice channel to use this command'});
        }
		let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
			subscription.queue = [];
			await interaction.followUp({ content: `The queue has been cleared`, ephemeral: true });
		} else {
			await interaction.followUp('Not playing in this server!');
		}
    }
}