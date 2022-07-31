export default {
    name: 'dc',
    description: 'disconnects the bot from the voice channel',
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