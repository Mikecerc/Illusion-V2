import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ContextMenuCommandBuilder, EmbedBuilder, SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("help").setDescription("obtain information on all commands"),
    async execute(interaction, client) {
        await interaction.deferReply();
        const commands = client.commands.map((c) => c);
        for (const command in commands) {
            if (commands[command].data instanceof ContextMenuCommandBuilder) {
                commands.splice(command, 1);
            }
        }
        if (commands.length <= 25) {
            const embed = new EmbedBuilder()
                .setColor("Orange")
                .setTitle("Help")
                .setDescription("Listed below are all bot commands along with their descriptions")
                .setFooter({
                    text: `1/1 - Requested by: ${interaction.user.tag}`,
                });

            for (const command of commands) {
                embed.addFields({
                    name: `${commands.indexOf(command) + 1}. ${command.data.name}`,
                    value: command.data.description,
                });
            }
            interaction.followUp({ embeds: [embed] });
        } else {
            const slicedList = commands.slice(0, 24);
            const embed = new EmbedBuilder()
                .setColor("Orange")
                .setTitle("Help")
                .setDescription("Listed below are all bot commands along with their descriptions")
                .setFooter({
                    text: `1/${Math.ceil(commands.length / 25)} - Requested by: ${interaction.user.tag}`,
                });

            for (const command of slicedList) {     
                embed.addFields({
                    name: `${commands.indexOf(command) + 1}. ${command.data.name}`,
                    value: command.data.description,
                });
            }
            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`50-10-1`)
                        .setDisabled(true)
                        .setEmoji("◀️")
                        .setStyle(ButtonStyle.Secondary),
                    new ButtonBuilder()
                        .setCustomId(`51-10-1`)
                        .setDisabled(false)
                        .setEmoji("▶️")
                        .setStyle(ButtonStyle.Secondary),
                );
                await interaction.followUp({ embeds: [embed], components: [buttons]});
        }
    },
};
