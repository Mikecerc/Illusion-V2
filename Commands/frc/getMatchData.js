const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
const TBA = require("../../api/api.js");
const client = require("../../index.js");
module.exports = {
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
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        res = new TBA(process.env.tbaAuth);
        const date = interaction.options.getInteger("year")
            ? interaction.options.getInteger("year")
            : new Date().getFullYear();
        let events = await res.getTeamEventList(
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
            for (e in events) {
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
