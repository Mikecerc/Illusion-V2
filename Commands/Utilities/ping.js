const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'Sends the ping of the client(illusion)',
    execute(interaction, client) {
        const Response = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`🏓${client.ws.ping}ms`);
        interaction.reply({ embeds: [Response] });
    },

};