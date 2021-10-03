const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.content.toLowerCase().includes('i want to join programming')) {
            const Reply = new MessageEmbed()
            .setColor('DARK_RED')
            .setTitle(`you cant say that here :/ `)
            .setDescription(`Shame on you <@${message.author.id}>`);
            return message.reply({ embeds: [Reply] });
        }
    },
};