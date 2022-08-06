import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import fetch from "node-fetch";
export default {
    data: new SlashCommandBuilder()
        .setName("botphoto")
        .setDescription("Get a photo of a bot from a particular year")
        .addNumberOption((o) => o.setName("team").setDescription("team number").setRequired(true))
        .addNumberOption((o) => o.setName("year").setDescription("optionally enter a year").setRequired(false)),
    async execute(interaction: any) {
        await interaction.deferReply();
        const team = interaction.options.getNumber("team").toString();
        const year = interaction.options.getNumber("year") != undefined ? interaction.options.getNumber("year").toString() : undefined;
        //if a team number is entered that is less than 4 digits, 0s will be added infront of it to make it 4 digits.
        let teamNumber = team;
        for (let i = 4 - team.length; i > 0; i--) {
            teamNumber = `0${teamNumber}`;
        }
        if (year) {
            /**if a year is included, things are more simple.
             * attempt to fetch the url to see if it exists (determined by a 200 status code response)
             * if it does not, return an error.
             * attempts to fetch an image ending in both .jpg and .JPG
             **/
            const url = `https://github.com/Team973/RobotPhotos973/raw/master/${year}/${teamNumber}.jpg`;
            const doesExist = await checkStatus(url);
            if (doesExist) {
                const response = new EmbedBuilder()
                    .setColor("Orange")
                    .setDescription(`Team ${teamNumber}'s robot for the year ${year}`)
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
                        .setDescription(`Team ${teamNumber}'s robot for the year ${year}`)
                        .setImage(url)
                        .setFooter({
                            text: `Requested By ${interaction.user.tag}`,
                        });
                    interaction.followUp({ embeds: [response] });
                } else {
                    const response = new EmbedBuilder()
                        .setColor("Orange")
                        .setDescription(`There is no bot photo for the team ${teamNumber} in the year ${year}`);
                    interaction.followUp({ embeds: [response] });
                }
            }
        } else {
            /**if a year is not included, things are more complicated.
             * attempt to fetch the url for the current year to see if it exists (determined by a 200 status code response)
             * attempts to fetch an image ending in both .jpg and .JPG.
             * if there are no photos for the current year, it will move on to one year prior and will continue this pattern until it reaches the year 2016 (the oldest year in the collection)
             * if there are no photos for the team in any year, it will return an error.
             **/
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
                    .setDescription(`Team ${teamNumber}'s robot for the year ${latestYear}`)
                    .setImage(url)
                    .setFooter({
                        text: `Requested By ${interaction.user.tag}`,
                    });
                interaction.followUp({ embeds: [response] });
            } else {
                const response = new EmbedBuilder().setColor("Orange").setDescription(`There is no bot photo for the team ${teamNumber}`);
                interaction.followUp({ embeds: [response] });
            }
        }
    },
};
//fetches a url and returns a boolean if it exists or not
async function checkStatus(url: string) {
    const res = await fetch(url);
    return res.status == 200 ? true : false;
}
