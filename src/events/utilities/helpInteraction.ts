import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ContextMenuCommandBuilder, ButtonStyle, AnyComponentBuilder } from "discord.js";
export default {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        const data = interaction.customId.split("-");
        if (data[0] == "50") {
            const commands = client.commands.map((c) => c);
            handleEmbed(interaction, commands, parseInt(data[2]) - 1);
        } else if (data[0] == "51") {
            const commands = client.commands.map((c) => c);
            handleEmbed(interaction, commands, parseInt(data[2]) + 1);
        }
    },
};
async function handleEmbed(interaction: { user: { tag: any; }; update: (arg0: { embeds: EmbedBuilder[]; components: ActionRowBuilder<AnyComponentBuilder>[]; }) => void; }, list, newIndex: number) {
    for (const command in list) {
        if (list[command].data instanceof ContextMenuCommandBuilder) {
            list.splice(command, 1);
        }
    }
    const begin = newIndex * 25 - 25;
    const end = newIndex * 25;
    const slicedList = list.slice(begin, end);
    const embed = new EmbedBuilder()
        .setColor("Orange")
        .setTitle("Help")
        .setDescription("Listed below are all bot commands along with their descriptions")
        .setFooter({
            text: `${newIndex}/${Math.ceil(list.length / 25)} - Requested by: ${interaction.user.tag}`,
        });

    for (const command of slicedList) {
        embed.addFields({
            name: `${slicedList.indexOf(command) + 1 + newIndex * 25 - 25}. ${command.data.name}`,
            value: command.data.description,
        });
    }
    const buttonDisabled = newIndex == 1 ? true : false;
    const buttonDisabled0 = newIndex >= Math.ceil(list.length / 24) ? true : false;
    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`50-10-${newIndex}`).setDisabled(buttonDisabled).setEmoji("◀️").setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId(`51-10-${newIndex}`).setDisabled(buttonDisabled0).setEmoji("▶️").setStyle(ButtonStyle.Secondary)
    );
    interaction.update({ embeds: [embed], components: [buttons] });
}
