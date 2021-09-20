const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'kyle',
    description: 'F U Big Kyle',
    execute(interaction) {
        const Response = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('<@406629388059410434> is a little bitch');
        interaction.followUp({ embeds: [Response] });
    },

};