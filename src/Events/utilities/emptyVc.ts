export default {
    name: "voiceStateUpdate",
    async execute(
        _oldState: any,
        newState: { guild: { id: any; channels: { fetch: (arg0: any) => any } } },
        client: { subscriptions: { get: (arg0: any) => any; delete: (arg0: any) => void } }
    ) {
        let subscription = client.subscriptions.get(newState.guild.id);
        if (!subscription) return;
        const channel = await newState.guild.channels.fetch(subscription.voiceConnection.joinConfig.channelId);
        const members = channel.members.map((m: { id: any }) => m.id);
        if (members.length <= 1) {
            subscription.voiceConnection.destroy();
            client.subscriptions.delete(newState.guild.id);
        }
    },
};
