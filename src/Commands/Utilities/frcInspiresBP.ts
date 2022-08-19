import { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import frcIModel from "../../schemas/frcInspiresSchema.js";

export default {
    data: new SlashCommandBuilder()
        .setName("feedsetup")
        .setDescription(`configure the channel that new blog posts from frcInspires are sent to`)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        .addChannelOption((c) => c.setName("channel").setDescription("leave blank to disable news in this guild")),
    async execute(interaction, client) {
        await interaction.deferReply();
        const channel = interaction.options.getChannel("channel");
        let query: any = await frcIModel.findOne();
        if (!query) {
            const doc = new frcIModel();
            doc.guildSettings = {};
            await doc.save();
            query = await frcIModel.findOne();
        }
        if (!client.frcI) client.frcI = { guildSettings: {} };
        if (!channel) {
            if (query.guildSettings) {
                delete query.guildSettings[interaction.guild.id];
                await query.save();
            }
            if (client.frcI.guildSettings) {
                delete client.frcI.guildSettings[interaction.guild.id];
            }
            interaction.followUp({
                embeds: [
                    new EmbedBuilder().setColor("Orange").setDescription("Frc Inspires blog posts have been disabled in this server."),
                ],
            });
        } else {
            if (!query.guildSettings) {
                client.frcI.guildSettings[channel.guild.id] = channel.id;
                query.guildSettings = { [channel.guild.id]: channel.id };
                console.log(query.guildSettings[channel.guild.id])
                await query.save();
            } else {
                client.frcI.guildSettings[channel.guild.id] = channel.id;
                query.guildSettings[channel.guild.id] = channel.id;
                console.log(query.guildSettings[channel.guild.id])
                await query.save();
            }
            interaction.followUp({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Orange")
                        .setDescription(
                            `Frc Inspires blog posts Will be sent to <#${channel.id}> in this server. To disable, use the command again, but do not provide a channel.`
                        ),
                ],
            });
        }
    },
};
