const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'warnkyle',
    description: 'warn kyle for acting like a freshman',
    async execute (interaction) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Kyle stop acting like a freshman');

        await interaction.followUp('yeah....');
        return await interaction.channel.send({ embeds: [embed] });
    }
}