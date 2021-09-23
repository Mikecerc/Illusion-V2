const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'get info on illusion',

    async execute(interaction) {
        const embed = new MessageEmbed()
        .setauthor('Illusion')
        .setColor('RANDOM')
        .setdescription('Get Gud lol');

        interaction.followUp({ embeds: [embed] });
    },
};