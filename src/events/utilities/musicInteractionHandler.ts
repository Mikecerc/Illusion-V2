import { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, EmbedBuilder, ButtonStyle } from "discord.js";
export default {
    name: "interactionCreate",
    async execute(interaction: any, client: { subscriptions: { get: (arg0: any) => any } }) {
        if (interaction.isButton()) {
            const data = interaction.customId.split("-");
            if (data[0] == "40") {
                let subscription = await client.subscriptions.get(interaction.guildId);
                if (!subscription) return noSub(interaction);
                response(interaction, Number.parseInt(data[2]) - 1, subscription);
            } else if (data[0] == "41") {
                let subscription = await client.subscriptions.get(interaction.guildId);
                if (!subscription) return noSub(interaction);
                response(interaction, Number.parseInt(data[2]) + 1, subscription);
            } else if (data[0] == "43") {
                let subscription = await client.subscriptions.get(interaction.guildId);
                if (!subscription) return noSub(interaction);
                updateQueue(interaction, subscription, Number.parseInt(data[2]));
            } else if (data[0] == "44") {
                let subscription = await client.subscriptions.get(interaction.guildId);
                if (!subscription) return noSub(interaction);
                subscription.queue = shuffle(subscription.queue);
                updateQueue(interaction, subscription, Number.parseInt(data[2]));
            }
        } else if (interaction.isSelectMenu()) {
            const data = interaction.customId.split("-");
            if (data[0] != "42") return;
            let subscription = await client.subscriptions.get(interaction.guildId);
            if (!subscription) return noSub(interaction);
            for (const videoId of interaction.values) {
                const track = await subscription.queue.find((t) => t.id == videoId);
                subscription.queue.splice(subscription.queue.indexOf(track), 1);
            }
            updateQueue(interaction, subscription, Number.parseInt(data[2]));
            //interaction.reply(`${interaction.values.length} track(s) deleted`)
        }
    },
};

async function updateQueue(interaction: any, subscription: any, currentPageIndex: number) {
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
        const refresh = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`43-10-${currentPageIndex}`).setStyle(ButtonStyle.Primary).setLabel("Refresh"),
            new ButtonBuilder().setCustomId(`44-10-${currentPageIndex}`).setStyle(ButtonStyle.Danger).setLabel("Scramble")
        );
        if (options.length > 0) {
            await interaction.update({
                embeds: [embed],
                components: [dropdown, refresh],
            });
        } else {
            await interaction.update({ embeds: [embed], components: [refresh] });
        }
    } else {
        response(interaction, currentPageIndex, subscription);
    }
}

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

async function response(interaction, newIndex, subscription) {
    const queue = subscription.queue;
    let embedFields = [];
    let options = [];
    let timeRemSec = 0;
    const begin = newIndex * 25 - 25;
    const end = newIndex * 25 - 1;
    const slicedQueue = queue.slice(begin, end);
    for (const song in slicedQueue) {
        embedFields.push({
            name: `${Number.parseInt(song) + 1 + newIndex * 25 - 25}.`,
            value: `[${slicedQueue[song].title}](${slicedQueue[song].url}) [${queue[song].duration.timestamp ? queue[song].duration.timestamp : queue[song].duration}]`,
        });
        options.push({
            label: `${slicedQueue[song].title}`,
            description: `[${queue[song].duration.timestamp ? queue[song].duration.timestamp : queue[song].duration}]`,
            value: slicedQueue[song].id,
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
            text: `${newIndex}/${Math.ceil(queue.length / 25)} - ${time} left - Requested by: ${interaction.user.tag}`,
        });
    const buttonDisabled = newIndex == 1 ? true : false;
    const buttonDisabled0 = newIndex >= Math.ceil(queue.length / 24) ? true : false;
    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`40-10-${newIndex}`).setStyle(ButtonStyle.Secondary).setEmoji("◀️").setDisabled(buttonDisabled),
        new ButtonBuilder().setCustomId(`41-10-${newIndex}`).setStyle(ButtonStyle.Secondary).setEmoji("▶️").setDisabled(buttonDisabled0),
        new ButtonBuilder().setCustomId(`43-10-${newIndex}`).setStyle(ButtonStyle.Primary).setLabel("Refresh"),
        new ButtonBuilder().setCustomId(`44-10-${newIndex}`).setStyle(ButtonStyle.Danger).setLabel("Scramble")
    );
    const dropdown = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
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

function shuffle(arr: any[]) {
    // randomly rearanges the items in an array
    const result = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        // picks an integer between 0 and i:
        const r = Math.floor(Math.random() * (i + 1)); // NOTE: use a better RNG if cryptographic security is needed
        // inserts the arr[i] element in the r-th free space in the shuffled array:
        for (let j = 0, k = 0; j <= arr.length - 1; j++) {
            if (result[j] === undefined) {
                if (k === r) {
                    result[j] = arr[i]; // NOTE: if array contains objects, this doesn't clone them! Use a better clone function instead, if that is needed.
                    break;
                }
                k++;
            }
        }
    }
    return result;
}

async function noSub(interaction) {
    const noSubEmbed = new EmbedBuilder().setColor('Orange').setDescription("The bot is not playing in this server.");
    interaction.update({ embeds: [noSubEmbed], components: [] });
}