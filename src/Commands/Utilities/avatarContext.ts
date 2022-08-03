import { EmbedBuilder, ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js';
export default {
    data: new ContextMenuCommandBuilder()
        .setName("avatar")
        .setType(ApplicationCommandType.User)
        .setDMPermission(false),
    execute(interaction: any) {
        const target = interaction.targetMember;
        const response = new EmbedBuilder()
            .setAuthor({ name: `${target.user.username}`, iconURL: target.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${target.user.username}'s avatar`)
            .setImage(`${target.user.displayAvatarURL({ dynamic: true })}?size=4096`)
            .setFooter({ text: `Requested By ${interaction.user.tag}` })
            .setColor("Orange");
        return interaction.reply({ embeds: [response] });
    }
}