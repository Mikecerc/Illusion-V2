import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";
export default {
    name: "botphoto",
    description: "Get a photo of a bot from a particular year",
    options: [
        {
            name: "team",
            description: "team number",
            type: "NUMBER",
            required: true,
        },
        {
            name: "year",
            description: "optionally enter a year",
            type: "NUMBER",
            required: false,
        }, 
    ],
    async execute(interaction) {
        await interaction.deferReply();
        const team = interaction.options.getNumber('team').toString();
        const year = interaction.options.getNumber('year') != undefined ? interaction.options.getNumber('year').toString(): undefined;
        let teamNumber = team; 
            for (let i = 4 - team.length; i > 0; i--) {
                teamNumber = `0${teamNumber}`;  
            }
        if (year) {
            const url = `https://github.com/Team973/RobotPhotos973/raw/master/${year}/${teamNumber}.jpg`
            const doesExist = await checkStatus(url);   
            if (doesExist) {
                const response = new MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`Team ${teamNumber}'s robot for the year ${year}`)
                    .setImage(url)
                    .setFooter({ text: `Requested By ${interaction.user.tag}` });
                interaction.followUp({ embeds: [response] });
            } else {
                const response = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`There is no bot photo for the team ${teamNumber} in the year ${year}`)
                interaction.followUp({ embeds: [response] });
            }   
        } else {
            const currentYear = new Date().getFullYear();
            let latestYear;
            for (let i = Number.parseInt(currentYear) - 2016; i > 0; i--) {
                const testYear = (2016 + i).toString();
                const url = `https://github.com/Team973/RobotPhotos973/raw/master/${testYear}/${teamNumber}.jpg`
                const isYear = await checkStatus(url); 
                if (isYear) {
                    latestYear = testYear;
                    break;
                } 
            }
            if (latestYear) {
                const url = `https://github.com/Team973/RobotPhotos973/raw/master/${latestYear}/${teamNumber}.jpg`
                const response = new MessageEmbed()
                    .setColor('RANDOM')
                    .setDescription(`Team ${teamNumber}'s robot for the year ${latestYear}`)
                    .setImage(url)
                    .setFooter({ text: `Requested By ${interaction.user.tag}` });
                interaction.followUp({ embeds: [response] });
            } else {
                const response = new MessageEmbed()
                    .setColor('RED')
                    .setDescription(`There is no bot photo for the team ${teamNumber}`)
                interaction.followUp({ embeds: [response] });
            }
        }
    }
};

async function checkStatus(url) {
    const res = await fetch(url);
    return res.status == 200 ? true : false;
}