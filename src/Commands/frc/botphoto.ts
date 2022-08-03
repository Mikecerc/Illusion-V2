import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import fetch from "node-fetch";
export default {
    data: new SlashCommandBuilder()
        .setName("botphoto")
        .setDescription("Get a photo of a bot from a particular year")
        .addNumberOption((o) =>
            o.setName("team").setDescription("team number").setRequired(true)
        )
        .addNumberOption((o) =>
            o
                .setName("year")
                .setDescription("optionally enter a year")
                .setRequired(false)
        ),
    async execute(interaction: any) {
        await interaction.deferReply();
        const team = interaction.options.getNumber("team").toString();
        const year =
            interaction.options.getNumber("year") != undefined
                ? interaction.options.getNumber("year").toString()
                : undefined;
        let teamNumber = team;
        for (let i = 4 - team.length; i > 0; i--) {
            teamNumber = `0${teamNumber}`;
        }
        if (year) {
            const url = `https://github.com/Team973/RobotPhotos973/raw/master/${year}/${teamNumber}.jpg`;
            const doesExist = await checkStatus(url);
            if (doesExist) {
                const response = new EmbedBuilder()
                    .setColor("Orange")
                    .setDescription(
                        `Team ${teamNumber}'s robot for the year ${year}`
                    )
                    .setImage(url)
                    .setFooter({
                        text: `Requested By ${interaction.user.tag}`,
                    });
                interaction.followUp({ embeds: [response] });
            } else {
                const url0 = `https://github.com/Team973/RobotPhotos973/raw/master/${year}/${teamNumber}.JPG`;
                const doesExist0 = await checkStatus(url0);
                if (doesExist0) {
                    const response = new EmbedBuilder()
                        .setColor("Orange")
                        .setDescription(
                            `Team ${teamNumber}'s robot for the year ${year}`
                        )
                        .setImage(url)
                        .setFooter({
                            text: `Requested By ${interaction.user.tag}`,
                        });
                    interaction.followUp({ embeds: [response] });
                } else {
                    const response = new EmbedBuilder()
                        .setColor("Orange")
                        .setDescription(
                            `There is no bot photo for the team ${teamNumber} in the year ${year}`
                        );
                    interaction.followUp({ embeds: [response] });
                }
            }
        } else {
            const currentYear: number = new Date().getFullYear();
            let latestYear = "";
            let fileExt = "";
            for (let i: number = currentYear - 2016; i > 0; i--) {
                const testYear = (2016 + i).toString();
                const url = `https://github.com/Team973/RobotPhotos973/raw/master/${testYear}/${teamNumber}.jpg`;
                const url0 = `https://github.com/Team973/RobotPhotos973/raw/master/${testYear}/${teamNumber}.JPG`;
                const isYear = await checkStatus(url);
                const isYear0 = await checkStatus(url0);
                if (isYear || isYear0) {
                    latestYear = testYear;
                    if (isYear) {
                        fileExt = "jpg";
                    } else if (isYear0) {
                        fileExt = "JPG";
                    }
                    break;
                }
            }
            if (latestYear) {
                const url = `https://github.com/Team973/RobotPhotos973/raw/master/${latestYear}/${teamNumber}.${fileExt}`;
                const response = new EmbedBuilder()
                    .setColor("Orange")
                    .setDescription(
                        `Team ${teamNumber}'s robot for the year ${latestYear}`
                    )
                    .setImage(url)
                    .setFooter({
                        text: `Requested By ${interaction.user.tag}`,
                    });
                interaction.followUp({ embeds: [response] });
            } else {
                const response = new EmbedBuilder()
                    .setColor("Orange")
                    .setDescription(
                        `There is no bot photo for the team ${teamNumber}`
                    );
                interaction.followUp({ embeds: [response] });
            }
        }
    },
};

async function checkStatus(url: string) {
    const res = await fetch(url);
    return res.status == 200 ? true : false;
}
