import { MessageEmbed } from 'discord.js';
export default {
    name: 'avatar',
    description: 'gets a users avatar',
    options: [
        {
            name: 'target',
            description: 'Select a target',
            type: 'USER',
            required: true,
        },
    ],
    execute(interaction: any) {
        const target = interaction.options.getMember('target');

        const response = new MessageEmbed()
            .setAuthor({ name: `${target.user.username}`, iconURL: target.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${target.user.username}'s avatar`)
            .setImage(`${target.user.displayAvatarURL({ dynamic: true })}?size=4096`)
            .setFooter({ text: `Requested By ${interaction.user.tag}` })
            .setColor('RANDOM');

        return interaction.reply({ embeds: [response] });
    }
}