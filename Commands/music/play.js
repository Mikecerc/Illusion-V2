import {
    joinVoiceChannel,
    entersState,
    VoiceConnectionStatus,
} from "@discordjs/voice";
import { GuildMember } from "discord.js";
import MusicSubscription from "../../classes/audio/subscription.js";
import Track from "../../classes/audio/track.js";
import ytdl from "ytdl-core";
import yts from "yt-search";

export default {
    name: "play",
    description: "search for a song or play a youtube video/playlist",
    options: [
        {
            name: "search",
            description: "a youtube link or search term",
            type: "STRING",
            required: true,
        },
    ],

    async execute(interaction, client) {
        await interaction.deferReply();
        let subscription = client.subscriptions.get(interaction.guildId);
        const search = interaction.options.getString("search");
        // If a connection to the guild doesn't already exist and the user is in a voice channel, join that channel
        // and create a subscription.
        if (!subscription) {
            if (
                interaction.member instanceof GuildMember &&
                interaction.member.voice.channel
            ) {
                const channel = interaction.member.voice.channel;
                subscription = new MusicSubscription(
                    joinVoiceChannel({
                        channelId: channel.id,
                        guildId: channel.guild.id,
                        adapterCreator: channel.guild.voiceAdapterCreator,
                    }),
                    interaction
                );
                subscription.voiceConnection.on("error", console.warn);
                client.subscriptions.set(interaction.guildId, subscription);
            }
        }

        // If there is no subscription, tell the user they need to join a channel.
        if (!subscription) {
            await interaction.followUp(
                "Join a voice channel and then try that again!"
            );
            return;
        }

        // Make sure the connection is ready before processing the user's request
        try {
            await entersState(
                subscription.voiceConnection,
                VoiceConnectionStatus.Ready,
                20e3
            );
        } catch (error) {
            console.warn(error);
            await interaction.followUp(
                "Failed to join voice channel within 20 seconds, please try again later!"
            );
            return;
        }

        try {
            /*if (
                search.includes("youtube.com/watch?v=") &&
                (search.includes("https://") || search.includes("http://"))
            ) {
                //info = await ytdl.getInfo(search);
                res = await yts(search);
            } else {
                res = await yts(search);
                //info = await ytdl.getInfo(res.videos[0].url);    
            } **/
            if (ytdl.validateURL(search)) {
                const res = await ytdl.getInfo(search);
                const track = new Track({
                    url: search,
                    title: res.videoDetails.title,
                    requestedBy: {
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    thumbnail: res.videoDetails.thumbnails[0].url,
                    duration: hms(
                        Number.parseInt(res.videoDetails.lengthSeconds)
                    ),
                });
                subscription.enqueue(track);
                await interaction.followUp(`Enqueued **${track.title}**`);
            } else if (search.startsWith('https://www.youtube.com/playlist?list=')) {
                const playListId = search.substring(38)
                const res = await yts( { listId: playListId});
                for (const video of res.videos) {
                    const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`
                    const track = new Track({
                        url: videoUrl,
                        title: video.title,
                        requestedBy: {
                            text: `Requested by: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        thumbnail: video.thumbnail,
                        duration: video.duration,
                    })
                    subscription.enqueue(track)
                }
                await interaction.followUp(`Enqueued Playlist:**${res.title}** (${res.videos.length} songs)`);
            } else if (search.startsWith('http://www.youtube.com/playlist?list=')) {
                const playListId = search.substring(37);
                const res = await yts( { listId: playListId});
                for (const video of res.videos) {
                    const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`
                    const track = new Track({
                        url: videoUrl,
                        title: video.title,
                        requestedBy: {
                            text: `Requested by: ${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        },
                        thumbnail: video.thumbnail,
                        duration: video.duration,
                    })
                    subscription.enqueue(track)
                }
                await interaction.followUp(`Enqueued Playlist:**${res.title}** (${res.videos.length} songs)`)
            } else {
                const res = await yts(search);
                //const audioUrl = ytdl.filterFormats(info.formats, "audioonly");
                // Attempt to create a Track from the user's video URL
                const info = res.videos[0];
                const track = new Track({
                    url: info.url,
                    //title: info.videoDetails.title,
                    title: info.title,
                    requestedBy: {
                        text: `Requested by: ${interaction.user.tag}`,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    },
                    thumbnail: info.thumbnail,
                    duration: info.duration,
                });
                // Enqueue the track and reply a success message to the user
                subscription.enqueue(track);
                await interaction.followUp(`Enqueued **${track.title}**`);
            }
        } catch (error) {
            console.log(error)
            await interaction.followUp(
                "Failed to play track, please try again later!"
            );
        }
    },
};

function hms(num) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ":" + minutes + ":" + seconds;
}
