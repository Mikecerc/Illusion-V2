import {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} from "discord.js";
import TBA from "../../api/api.js";
export default {
    name: "matches",
    description: "gets matches by team number",
    options: [
        {
            name: "teamnumber",
            description: "teamNumber",
            type: "INTEGER",
            required: true,
        },
        {
            name: "year",
            description: "optional: enter year of season",
            type: "INTEGER",
            required: false,
        },
    ],
    async execute(interaction: any) {
        await interaction.deferReply({ ephemeral: false }).catch(() => { });
        const res = new TBA(process.env.tbaAuth);
        const date = interaction.options.getInteger("year")
            ? interaction.options.getInteger("year")
            : new Date().getFullYear();
        let events: any = await res.getTeamEventList(
            interaction.options.getInteger("teamnumber"),
            date
        );
        let embed = new MessageEmbed()
            .setTitle(`Please Pick One`)
            .setDescription(
                `Please select which event of team ${interaction.options.getInteger(
                    "teamnumber"
                )}'s ${date} season.`
            )
            .setColor("RANDOM")
            .setFooter({ text: "Data provided via The Blue Alliance API" });
        let options = [];
        if (events != undefined && events.length > 0) {
            for (const e in events) {
                embed.addField(
                    events[e].name,
                    `Date: ${events[e].start_date} - ${events[e].end_date}`,
                    false
                );
                options.push({
                    label: events[e].name,
                    description: "",
                    value: events[e].key,
                });
            }
        }
        if (options.length == 0) {
            interaction.followUp({ embeds: [embed] });
        } else {
            const row = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId(
                        interaction.options.getInteger("teamnumber") + "-" + "1"
                    )
                    .setPlaceholder("Select a competition to view match data")
                    .addOptions(options)
            );
            interaction.followUp({ embeds: [embed], components: [row] });
        }
    },
};
