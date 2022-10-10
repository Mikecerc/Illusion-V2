import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import translate from "google-translate-api-x";
export default {
    data: new ContextMenuCommandBuilder().setName("translate").setDMPermission(false).setType(ApplicationCommandType.Message),
    async execute(interaction) {
        await interaction.deferReply();
        if(interaction.targetMessage.embeds.length > 0) return interaction.followUp("you cannot translate this");
        if(interaction.targetMessage.length !> 0 ) return interaction.followUp("you cannot translate this");
        if(interaction.targetMessage.attachments.size > 0 ) return interaction.followUp("you cannot translate this");
        const message = interaction.targetMessage.content.slice(0,4999);
        try {
            const res: any = await translate(message, { to: "en", autoCorrect: true});
        const Response = new EmbedBuilder()
        .setAuthor({
            name: `${interaction.targetMessage.author.username}`,
            iconURL: interaction.targetMessage.author.displayAvatarURL({ dynamic: true }),
        })
        .setColor("Orange")
        .setFooter({ text: `Requested By ${interaction.user.tag}` })
        .addFields({
            name: "Original Message:",
            value: message.slice(0,1023),
        },
        {
           name: `Approximate Translation ("${res.from.language.iso}" Detected):`,
           value: res.text.slice(0,1023),
        });
        return await interaction.followUp({embeds: [Response]});
        }
        catch {
            return await interaction.followUp("oh no! There was an error. Please try again later.")
        }
    },
};
