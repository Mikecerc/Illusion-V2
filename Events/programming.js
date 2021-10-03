const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content.toLowerCase().includes('i want to join programming')) return;
        if (message.content.toLowerCase().includes('programming')) {
            const programming = new MessageEmbed()
            .setColor('RED')
            .setDescription('programming is bad!');
            return message.channel.send({ embeds: [programming] });
        }
    },
};