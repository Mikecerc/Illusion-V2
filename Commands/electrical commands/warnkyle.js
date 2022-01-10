const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'warnkyle',
    description: 'warn kyle for acting like a freshman',
    execute (interaction) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Kyle stop acting like a freshman');

        interaction.followUp('yeah....');
        interaction.channel.send({ embeds: [embed] });
    }
}