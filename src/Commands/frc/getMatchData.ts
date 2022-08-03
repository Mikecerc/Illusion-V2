import {
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    SlashCommandBuilder,
} from "discord.js";
import TBA from "../../classes/tba/api.js";
export default {
    data: new SlashCommandBuilder()
        .setName("matches")
        .setDescription("Gets matches by team number")
        .addIntegerOption((o) =>
            o.setName("teamnumber").setDescription("team number").setRequired(true)
        )
        .addIntegerOption((o) =>
            o
                .setName("year")
                .setDescription("optionally enter a year")
                .setRequired(false)
        ),
    async execute(interaction: any) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const res = new TBA(process.env.tbaAuth);
        const date = interaction.options.getInteger("year")
            ? interaction.options.getInteger("year")
            : new Date().getFullYear();
        let events: any = await res.getTeamEventList(
            interaction.options.getInteger("teamnumber"),
            date
        );
        let embed = new EmbedBuilder()
            .setTitle(`Please Pick One`)
            .setDescription(
                `Please select which event of team ${interaction.options.getInteger(
                    "teamnumber"
                )}'s ${date} season.`
            )
            .setColor("Orange")
            .setFooter({ text: "Data provided via The Blue Alliance API" });
        let options = [];
        if (events != undefined && events.length > 0) {
            for (const e in events) {
                embed.addFields({
                    name: events[e].name,
                    value: `Date: ${events[e].start_date} - ${events[e].end_date}`,
                    inline: false,
                });
                options.push({
                    label: events[e].name,
                    description: "Select",
                    value: events[e].key,
                });
            }
        }
        if (options.length == 0) {
            interaction.followUp({ embeds: [embed] });
        } else {
            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
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
