import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SelectMenuBuilder, SlashCommandBuilder, ButtonStyle } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("queue").setDescription("lists the current queue").setDMPermission(false),
    async execute(interaction: any, client: any) {
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
            if (queue.length < 25) {
                let embedFields = [];
                let options = [];
                let timeRemSec = 0;
                for (const song in queue) {
                    embedFields.push({
                        name: `${Number.parseInt(song) + 1}.`,
                        value: `[${queue[song].title}](${queue[song].url}) [${queue[song].duration.timestamp ? queue[song].duration.timestamp : queue[song].duration}]`,
                    });
                    options.push({
                        label: `${queue[song].title}`,
                        description: `[${queue[song].duration.timestamp ? queue[song].duration.timestamp : queue[song].duration}]`,
                        value: queue[song].id,
                    });
                    timeRemSec += queue[song].duration.seconds;
                }
                let date = new Date(0);
                date.setSeconds(timeRemSec);
                const time = date.toISOString().slice(11, 19);
                let embed = new EmbedBuilder()
                    .setColor("Orange")
                    .setAuthor({ name: `Queue (${queue.length} tracks)` })
                    .addFields(embedFields)
                    .setFooter({
                        text: `Page 1/1 - ${time} left - Requested by: ${interaction.user.tag}`,
                    });
                const dropdown = new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("42-10-1")
                        .setMinValues(1)
                        .setMaxValues(options.length)
                        .setOptions(options)
                        .setPlaceholder("Delete a song")
                );
                const moveToTop = new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("45-10-1")
                        .setOptions(options)
                        .setPlaceholder("Move to the top")
                );
                const refresh = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId(`43-10-1`).setStyle(ButtonStyle.Primary).setLabel("Refresh"),
                    new ButtonBuilder().setCustomId(`44-10-2`).setStyle(ButtonStyle.Danger).setLabel("Scramble")
                );
                if (options.length > 0) {
                    await interaction.followUp({
                        embeds: [embed],
                        components: [dropdown, moveToTop, refresh],
                    });
                } else {
                    await interaction.followUp({ embeds: [embed], components: [refresh] });
                }
            } else {
                let embedFields = [];
                let options = [];
                let timeRemSec = 0;
                for (const song in queue.slice(0, 24)) {
                    embedFields.push({
                        name: `${Number.parseInt(song) + 1}.`,
                        value: `[${queue[song].title}](${queue[song].url}) [${queue[song].duration.timestamp ? queue[song].duration.timestamp : queue[song].duration}]`,
                    });
                    options.push({
                        label: `${queue[song].title}`,
                        description: `[${queue[song].duration.timestamp ? queue[song].duration.timestamp : queue[song].duration}]`,
                        value: queue[song].id,
                    });
                }
                for (const song in queue) {
                    timeRemSec += queue[song].duration.seconds;
                }
                //let date = new Date(0);
                //date.setSeconds(timeRemSec);
                //const time = date.toISOString().slice(11, 19);
                const time = hms(timeRemSec.toString());
                let embed = new EmbedBuilder()
                    .setColor("Orange")
                    .setAuthor({ name: `Queue (${queue.length} tracks)` })
                    .addFields(embedFields)
                    .setFooter({
                        text: `Page 1/${Math.ceil(queue.length / 25)} - ${time} left - Requested by: ${interaction.user.tag}`,
                    });
                const buttons = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setCustomId(`40-10-1`).setStyle(ButtonStyle.Secondary).setEmoji("◀️").setDisabled(true),
                    new ButtonBuilder().setCustomId("41-10-1").setStyle(ButtonStyle.Secondary).setEmoji("▶️").setDisabled(false),
                    new ButtonBuilder().setCustomId(`43-10-1`).setStyle(ButtonStyle.Primary).setLabel("Refresh"),
                    new ButtonBuilder().setCustomId(`44-10-1`).setStyle(ButtonStyle.Danger).setLabel("Scramble")
                );
                const dropdown = new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("42-10-1")
                        .setMinValues(1)
                        .setMaxValues(options.length)
                        .setOptions(options)
                        .setPlaceholder("Delete a song")
                );
                const moveToTop = new ActionRowBuilder().addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("45-10-1")
                        .setOptions(options)
                        .setPlaceholder("Move to the top")
                );
                if (options.length > 0) {
                    await interaction.followUp({
                        embeds: [embed],
                        components: [dropdown,moveToTop,buttons],
                    });
                } else {
                    await interaction.followUp({
                        embeds: [embed],
                        components: [buttons],
                    });
                }
            }
        } else {
            await interaction.followUp("Not playing in this server!");
        }
    },
};

function hms(num: string) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;

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
