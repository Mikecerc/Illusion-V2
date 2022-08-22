import { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SlashCommandBuilder } from "discord.js";
import fs from "fs";
export default {
    data: new SlashCommandBuilder()
        .setName("botvideo")
        .setDescription("links an FRC team's robot reveal video of your choosing")
        .addNumberOption((o) => o.setName("team").setDescription("Which team do you want videos for?").setRequired(true))
        .addNumberOption((o) => o.setName("year").setDescription("optionally enter a year for the videos").setRequired(false)),
    async execute(interaction: any) {
        await interaction.deferReply();
        const team = interaction.options.getNumber("team");
        const year = interaction.options.getNumber("year");
        fs.readFile("./data/json/vids.json", (err, res) => {
            if (err) {
                return console.log(err);
            } else {
                const data = JSON.parse(res.toString());
                if (data.hasOwnProperty(team)) {
                    const teamData = data[team];
                    if (year) {
                        if (teamData.hasOwnProperty(year)) {
                            for (const video of teamData[year]) {
                                interaction.followUp(video);
                            }
                        } else {
                            const err = new EmbedBuilder()
                                .setDescription(
                                    "There are no videos for this team this year. To see all years this team has videos, please do not include a year in the command."
                                )
                                .setColor("Orange");
                            return interaction.followUp({ embeds: [err] });
                        }
                    } else {
                        let options = [];
                        for (const key of Object.keys(teamData)) {
                            options.push({
                                label: key,
                                description: key,
                                value: key,
                            });
                        }
                        const row = new ActionRowBuilder().addComponents(
                            new SelectMenuBuilder().setCustomId(`20-${team}`).setPlaceholder("Please select a year").setOptions(options)
                        );
                        const embed = new EmbedBuilder()
                            .setColor("Orange")
                            .setDescription("Please select one of the following years from the dropdown menu:");
                        return interaction.followUp({
                            embeds: [embed],
                            components: [row],
                        });
                    }
                } else {
                    const err = new EmbedBuilder().setDescription("There are no videos for this team.").setColor("Orange");
                    return interaction.followUp({ embeds: [err] });
                }
            }
        });
    },
};
