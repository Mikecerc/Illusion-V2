import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("hmm")
        .setDescription("admin :)")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(o => o.setName("statement").setDescription("admin").setRequired(true)),
    async execute(interaction: any) {
        interaction.reply({content: 'ok', ephemeral: true });
        const perms = interaction.member.roles.cache.some((r: { name: string; }) => r.name === 'LED') || interaction.member.roles.cache.some((r: { name: string; }) => r.name === 'Leads');
        if (!perms) return; 
        const message = interaction.options.getString('statement');
        interaction.channel.send({ content: message });
    }
}