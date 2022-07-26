export default {
    name: 'voiceStateUpdate',
    async execute(oldState, newState, client) {
        let subscription = client.subscriptions.get(newState.guild.id);
        if (!subscription) return; 
        const channel = await newState.guild.channels.fetch(subscription.voiceConnection.joinConfig.channelId);
        const members = channel.members.map((m) => m.id);
        if (members.length <= 1) {
            subscription.voiceConnection.destroy();
			client.subscriptions.delete(newState.guild.id);
        }
    }
}