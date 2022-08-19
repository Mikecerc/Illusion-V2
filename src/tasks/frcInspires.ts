import { ChannelType, ClientPresence, EmbedBuilder } from "discord.js";
import Parser from "rss-parser";
import frcIModel from "../schemas/frcInspiresSchema.js";
import moment from "moment";
const endPoint = "https://www.firstinspires.org/robotics/frc/blog-rss";
export default {
    cron: "* * * * *",
    async execute(client: any) {
        let res;
        try {
            res = await getRss();
            if (res == "error") {
                return;
            }
        } catch (e) {
            return console.error(e);
        }

        if (!client.frcI) {
            client.frcI = {};
            const dbQuery = await frcIModel.findOne();
            if (!dbQuery) {
                const doc = new frcIModel();
                doc.latestGuid = res.guid;
                await doc.save();
                client.frcI.latest = res.guid;
                client.frcI.guildSettings = {};
            } else {
                client.frcI.latest = res.guid;
                if (dbQuery.guildSettings) {
                    client.frcI.guildSettings = dbQuery.guildSettings;
                }
                if (client.frcI.latest != dbQuery.latestGuid) {
                    sendNews(client, res);
                    dbQuery.latestGuid = client.frcI.latest;
                    await dbQuery.save()
                }
            }
        } else if (client.frcI.latest != res.guid) {
            console.log(client.frcI.latest, res.guid)
            sendNews(client, res);
            client.frcI.latest = res.guid;
            const dbQuery = await frcIModel.findOne();
            dbQuery.latestGuid = client.frcI.latest;
            await dbQuery.save();
        }
    },
};
async function getRss() {
    const parser = new Parser();
    const feed: any = await parser.parseURL(endPoint).catch((e) => console.log(e));
    if (feed.items) {
        return feed.items[0];
    } else {
        return "error";
    }
}
async function sendNews(client, rssResponse) {
    try {
        if (!client.frcI.guildSettings) return;
        for (const guildId of Object.keys(client.frcI.guildSettings)) {
            const guild = await client.guilds.fetch(guildId);
            const channel = await guild.channels.fetch(client.frcI.guildSettings[guildId]);
            const embed = new EmbedBuilder()
                .setColor("Orange")
                .setAuthor({ name: "New FRC Inspires Blog Post" })
                .setTitle(rssResponse.title)
                .setURL(rssResponse.link)
                .setDescription(rssResponse.contentSnippet)
                .setFooter({ text: `Retrieved • ${moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")}` });
            try {
                channel.send({ embeds: [embed] }).then(async (msg) => {
                    if (channel.type == ChannelType.GuildNews) {
                        msg.crosspost().catch();
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
