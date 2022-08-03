import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
export default {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("Retrieves a user's avatar")
        .addUserOption(o => o.setName("target").setDescription("Select a target user").setRequired(true)),
    execute(interaction: any) {
        const target = interaction.options.getMember('target');

        const response = new EmbedBuilder()
            .setAuthor({ name: `${target.user.username}`, iconURL: target.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${target.user.username}'s avatar`)
            .setImage(`${target.user.displayAvatarURL({ dynamic: true })}?size=4096`)
            .setFooter({ text: `Requested By ${interaction.user.tag}` })
            .setColor("Orange");

        return interaction.reply({ embeds: [response] });
    }
}