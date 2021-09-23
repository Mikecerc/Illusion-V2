const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'get info on illusion',

    async execute(interaction) {
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('Get Gud lol');

        interaction.followUp({ embeds: [embed] });
    },
};