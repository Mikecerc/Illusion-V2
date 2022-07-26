import { MessageActionRow, MessageEmbed, MessageButton, MessageSelectMenu } from "discord.js";
export default {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isButton()) {
            const data = interaction.customId.split("-");
            if (data[0] == "40") {
                let subscription = await client.subscriptions.get(
                    interaction.guildId
                );
                response(interaction, Number.parseInt(data[2]) + 1, Number.parseInt(data[2]), subscription);
            } else if (data[0] == "41") {
                let subscription = await client.subscriptions.get(
                    interaction.guildId
                );
                response(interaction, Number.parseInt(data[2]) - 1, Number.parseInt(data[2]), subscription);
            }
        } else if (interaction.isSelectMenu()) {
            const data = interaction.customId.split("-");
            if (data[0] != "42") return; 
            let subscription = await client.subscriptions.get(
                interaction.guildId
            );
            for (const videoId of interaction.values) {
                const track = await subscription.queue.find(t => t.id == videoId);
                subscription.queue.splice(subscription.queue.indexOf(track), 1); 
            }
            updateQueue(interaction, subscription, Number.parseInt(data[2]));
            interaction.followUp(`${interaction.values.length} track(s) deleted`)
        }
    },
};

async function updateQueue(interaction, subscription, currentPageIndex) {
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
                text: `Page 1/1 - ${time} left - ${subscription.audioPlayer.state.resource.metadata.requestedBy.text}`,
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
            await interaction.update({ embeds: [embed] });
        }
    } else {
        response(interaction, currentPageIndex, currentPageIndex, subscription);
    }
}

function hms(num) {
    var sec_num = parseInt(num, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}

async function response(interaction, newIndex, currentIndex, subscription) {
    const queue = subscription.queue;
    let embedFields = [];
        let options = [];
        let timeRemSec = 0;
        const begin = (currentIndex * 25) - 25;
        const end = (currentIndex * 25) - 1;
        const slicedQueue = queue.slice(begin, end)
        for (const song in slicedQueue) {
            embedFields.push({
                name: `${Number.parseInt(song) + 1 + (currentIndex * 25)}.`,
                value: `[${slicedQueue[song].title}](${slicedQueue[song].url}) [${slicedQueue[song].duration.timestamp}]`,
            });
            options.push({
                label: `${slicedQueue[song].title}`,
                description: `[${slicedQueue[song].duration.timestamp}]`,
                value: slicedQueue[song].id,
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
                )} - ${time} left - ${
                    subscription.audioPlayer.state.resource.metadata
                        .requestedBy.text
                }`,
            });
        const buttonDisabled = newIndex == 1 ? true : false; 
        const buttonDisabled0 = newIndex >= Math.ceil(queue.length / 24) ? true : false;
        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(`40-10-${newIndex}`)
                .setStyle("SECONDARY")
                .setEmoji("◀️")
                .setDisabled(buttonDisabled),
            new MessageButton()
                .setCustomId(`41-10-${newIndex}`)
                .setStyle("SECONDARY")
                .setEmoji("▶️")
                .setDisabled(buttonDisabled0),
        );
        const dropdown = new MessageActionRow().addComponents(
            new MessageSelectMenu()
                .setCustomId(`42-10-${newIndex}`)
                .setMinValues(1)
                .setMaxValues(options.length)
                .setOptions(options)
                .setPlaceholder("Delete a song")
        );
        if (options.length > 0) {
            await interaction.update({
                embeds: [embed],
                components: [dropdown, buttons],
            });
        } else {
            await interaction.update({
                embeds: [embed],
                components: [buttons],
            });
        }
}
