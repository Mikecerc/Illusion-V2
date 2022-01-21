const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'avatar',
    description: 'gets a users avatar',
    options:[
        {
            name: 'target',
            description: 'Select a target',
            type: 'USER',
            required: true,
        },
    ],
    execute(interaction) {
        const target = interaction.options.getMember('target');

        const response = new MessageEmbed()
        .setAuthor(`${target.user.username}`, target.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`${target.user.username}'s avatar`)
        .setImage(target.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`Requested By ${interaction.user.tag}`)
        .setColor('RANDOM');

        interaction.followUp('done');
        return interaction.channel.send({ embeds: [response] });
    }
}