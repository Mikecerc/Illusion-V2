import { AudioPlayerStatus } from "@discordjs/voice";
import {
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageSelectMenu,
} from "discord.js";
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
            if (queue.length < 25) {
                let embedFields = [];
                let options = [];
                let timeRemSec = 0;
                for (const song in queue) {
                    embedFields.push({
                        name: `${Number.parseInt(song) + 1}.`,
                        value: `[${queue[song].title}](${queue[song].url}) [${queue[song].duration.timestamp}]`,
                    });
                    options.push({
                        label: `${queue[song].title}`,
                        description: `[${queue[song].duration.timestamp}]`,
                        value: queue[song].id,
                    });
                    timeRemSec += queue[song].duration.seconds;
                }
                let date = new Date(0);
                date.setSeconds(timeRemSec);
                const time = date.toISOString().slice(11, 19);
                let embed = new MessageEmbed()
                    .setColor("ORANGE")
                    .setAuthor({ name: `Queue (${queue.length} tracks)` })
                    .addFields(embedFields)
                    .setFooter({
                        text: `Page 1/1 - ${time} left - Requested by: ${interaction.user.tag}`,
                    });
                const dropdown = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("42-10-1")
                        .setMinValues(1)
                        .setMaxValues(options.length)
                        .setOptions(options)
                        .setPlaceholder("Delete a song")
                );
                if (options.length > 0) {
                    await interaction.followUp({
                        embeds: [embed],
                        components: [dropdown],
                    });
                } else {
                    await interaction.followUp({ embeds: [embed] });
                }
            } else {
                let embedFields = [];
                let options = [];
                let timeRemSec = 0;
                for (const song in queue.slice(0, 24)) {
                    embedFields.push({
                        name: `${Number.parseInt(song) + 1}.`,
                        value: `[${queue[song].title}](${queue[song].url}) [${queue[song].duration.timestamp}]`,
                    });
                    options.push({
                        label: `${queue[song].title}`,
                        description: `[${queue[song].duration.timestamp}]`,
                        value: queue[song].id,
                    });
                }
                for (const song in queue) {
                    timeRemSec += queue[song].duration.seconds;
                }
                //let date = new Date(0);
                //date.setSeconds(timeRemSec);
                //const time = date.toISOString().slice(11, 19);
                const time = hms(timeRemSec);
                let embed = new MessageEmbed()
                    .setColor("ORANGE")
                    .setAuthor({ name: `Queue (${queue.length} tracks)` })
                    .addFields(embedFields)
                    .setFooter({
                        text: `Page 1/${Math.ceil(
                            queue.length / 25
                        )} - ${time} left - Requested by: ${interaction.user.tag}`,
                    });
                const buttons = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId(`40-10-1`)
                        .setStyle("SECONDARY")
                        .setEmoji("◀️")
                        .setDisabled(true),
                    new MessageButton()
                        .setCustomId("41-10-1")
                        .setStyle("SECONDARY")
                        .setEmoji("▶️")
                        .setDisabled(false)
                );
                const dropdown = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("42-10-1")
                        .setMinValues(1)
                        .setMaxValues(options.length)
                        .setOptions(options)
                        .setPlaceholder("Delete a song")
                );
                if (options.length > 0) {
                    await interaction.followUp({
                        embeds: [embed],
                        components: [dropdown, buttons],
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
