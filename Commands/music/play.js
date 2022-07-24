const {
	joinVoiceChannel,
	createAudioPlayer,
	NoSubscriberBehavior,
	createAudioResource,
	StreamType,
	entersState,
	VoiceConnectionStatus,
} = require("@discordjs/voice");
const {
	GuildMember, Snowflake
} = require('discord.js');
const MusicSubscription = require('../../audio/subscription.js')
const Track = require('../../audio/track.js')
const ytdl = require("ytdl-core");
const yts = require('yt-search');

module.exports = {
	name: "play",
	description: "test",
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
		const search = interaction.options.getString('search');
		// If a connection to the guild doesn't already exist and the user is in a voice channel, join that channel
		// and create a subscription.
		if (!subscription) {
			if (interaction.member instanceof GuildMember && interaction.member.voice.channel) {
				const channel = interaction.member.voice.channel;
				subscription = new MusicSubscription(
					joinVoiceChannel({
						channelId: channel.id,
						guildId: channel.guild.id,
						adapterCreator: channel.guild.voiceAdapterCreator,
					}), 
					interaction,
				)
				subscription.voiceConnection.on('error', console.warn);
				client.subscriptions.set(interaction.guildId, subscription);
			}
		}

		// If there is no subscription, tell the user they need to join a channel.
		if (!subscription) {
			await interaction.followUp('Join a voice channel and then try that again!');
			return;
		}

		// Make sure the connection is ready before processing the user's request
		try {
			await entersState(subscription.voiceConnection, VoiceConnectionStatus.Ready, 20e3);
		} catch (error) {
			console.warn(error);
			await interaction.followUp('Failed to join voice channel within 20 seconds, please try again later!');
			return;
		}

		try {
			let info;
			if (search.includes('youtube.com/') && (search.includes('https://') || search.includes('http://'))) {
				info = await ytdl.getInfo(search);
			} else {
				const res  = await yts(search)
				info = await ytdl.getInfo(res.videos[0].url)
			}
			const audioUrl = ytdl.filterFormats(info.formats, 'audioonly');
			// Attempt to create a Track from the user's video URL
			const track = new Track({
				url: audioUrl[0].url,
				title: info.videoDetails.title,
			});
		// Enqueue the track and reply a success message to the user
		subscription.enqueue(track);
		await interaction.followUp(`Enqueued **${track.title}**`);
	} catch(error) {
		console.warn(error);
		await interaction.followUp('Failed to play track, please try again later!');
	}
},
};