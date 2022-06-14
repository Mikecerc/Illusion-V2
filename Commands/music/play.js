const {
    joinVoiceChannel,
    VoiceConnectionStatus,
    createAudioPlayer,
    NoSubscriberBehavior,
    createAudioResource,
    StreamType,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    description: "test",
    options: [
        {
            name: "link",
            description: "video link",
            type: "STRING",
            required: true,
        },
    ],

    async execute(interaction, client) {
        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        if (interaction.member.voice) {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            connection.subscribe(player);
            let info = await ytdl.getInfo(
                interaction.options.getString("link")
            );
            download = ytdl.filterFormats(info.formats, 'audioonly')
            console.log(download[0].url)
            const resource = createAudioResource(download[0].url, {
                inputType: StreamType.Arbitrary,
            });
            player.play(resource)
            console.log("hello?");
        }
    },
};
