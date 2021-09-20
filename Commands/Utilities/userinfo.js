const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'dox',
    description: 'Gets a users info and avatar',
    options:[
        {
            name: 'target',
            description: 'Select a target',
            type: 'USER',
            required: true,
        },
    ],

    execute(interaction) {
        const Target = interaction.options.getMember('target');

        const Response = new MessageEmbed()
        .setAuthor(`${Target.user.username}`, Target.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(Target.user.displayAvatarURL({ dynamic: true }))
        .setColor('RANDOM')
        .addField('UserID', `${Target.user.id}`, false)
        .addField('Roles', `${Target.roles.cache.map(r => r).join(' ').replace('@everyone', ' ')}`)
        .addField('Server Member Since', `${moment(Target.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Target.joinedAt).startOf('day').fromNow()}`)
        .addField('Discord User Since', `${moment(Target.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(Target.user.createdAt).startOf('day').fromNow()}`)
        .setFooter(`Requested By ${interaction.user.tag}`);
        interaction.followUp({ embeds: [Response] });
    },
};