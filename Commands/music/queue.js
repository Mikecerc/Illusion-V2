import { AudioPlayerStatus } from "@discordjs/voice";
export default {
    name: "queue",
    description: "lists the current queue",
    async execute(interaction, client) {
        await interaction.deferReply();
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            /** 
            const current =
                subscription.audioPlayer.state.status === AudioPlayerStatus.Idle
                    ? `Nothing is currently playing!`
                    : `Playing **${subscription.audioPlayer.state.resource.metadata.title}**`;

            const queue = subscription.queue
                .slice(0, 5)
                .map((track, index) => `${index + 1}) ${track.title}`)
                .join("\n");

            await interaction.followUp(`${current}\n\n${queue}`);
            */
           const queue = subscription.queue; 

        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};
