const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
} = require("discord.js");
const fs = require("fs");
module.exports = {
    name: "botvideo",
    description: "links an FRC team's robot reveal video of your choosing",
    options: [
        {
            name: "team",
            description: "Which team do you want videos for?",
            required: true,
            type: "NUMBER",
        },
        {
            name: "year",
            description: "Which year's video?",
            required: false,
            type: "NUMBER",
        },
    ],
    async execute(interaction) {
        await interaction.deferReply();
        const team = interaction.options.getNumber("team");
        const year = interaction.options.getNumber("year");
        fs.readFile("./json/vids.json", (err, res) => {
            if (err) {
                return console.log(err);
            } else {
                const data = JSON.parse(res);
                if (data.hasOwnProperty(team)) {
                    const teamData = data[team];
                    if (year) {
                        if (teamData.hasOwnProperty(year)) {
                            for (const video of teamData[year]) {
                                interaction.followUp(video);
                            }
                        } else {
                            const err = new MessageEmbed()
                                .setDescription(
                                    "There are no videos for this team this year. To see all years this team has videos, please do not include a year in the command."
                                )
                                .setColor("RED");
                            return interaction.followUp({ embeds: [err] });
                        }
                    } else {
                        let options = [];
                        for (key of Object.keys(teamData)) {
                            options.push({
                                label: key,
                                description: key,
                                value: key,
                            });
                        }
                        const row = new MessageActionRow().addComponents(
                            new MessageSelectMenu()
                                .setCustomId(`20-${team}`)
                                .setPlaceholder("Please select a year")
                                .setOptions(options)
                        );
                        const embed = new MessageEmbed()
                            .setColor('RANDOM')
                            .setDescription('Please select one of the following years from the dropdown menu:')
                        return interaction.followUp({
                            embeds: [embed],
                            components: [row],
                        });
                    }
                } else {
                    const err = new MessageEmbed()
                        .setDescription("There are no videos for this team.")
                        .setColor("RED");
                    return interaction.followUp({ embeds: [err] });
                }
            }
        });
    },
};
