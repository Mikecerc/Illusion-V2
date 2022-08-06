import { SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder().setName("skip").setDescription("skips the current track").setDMPermission(false),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        if (!interaction.member.voice.channel) {
            return await interaction.followUp({ content: "You must be in a voice channel to use this command" });
        }
        let subscription = client.subscriptions.get(interaction.guildId);
        if (subscription) {
            // Calling .stop() on an AudioPlayer causes it to transition into the Idle state. Because of a state transition
            // listener defined in music/subscription.ts, transitions into the Idle state mean the next track from the queue
            // will be loaded and played.
            if (subscription.loop) subscription.loopSkipped = true;
            //subscription.loopNpMsg = false;
            subscription.audioPlayer.stop();
            await interaction.followUp("Skipped song!");
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};
