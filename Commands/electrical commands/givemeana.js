const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'givemeana',
    description: 'AAA',
    execute(interaction) {
        const Response = new MessageEmbed()
        .setTitle('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .setColor('RANDOM');

        interaction.reply({ embeds: [Response] });
        interaction.followUp('https://youtu.be/whhgyzDeCAk');

    },
};