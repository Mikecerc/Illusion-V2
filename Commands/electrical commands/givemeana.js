const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'givemeana',
    description: 'AAA',
    execute(interaction) {
        const Response = new MessageEmbed()
        .setTitle('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .setColor('RANDOM');

        interaction.deleteReply();
        interaction.channel.send({ embeds: [Response] });
        interaction.channel.send('https://youtu.be/whhgyzDeCAk');

    },

};