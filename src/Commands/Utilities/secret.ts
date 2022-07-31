export default {
    name: 'hmm',
    description: 'admin only',
    options: [{
        name: 'statement',
        description: 'admin only',
        type: 'STRING',
        required: true,
    },

],
    async execute(interaction: any) {
        interaction.reply({content: 'ok', ephemeral: true });
        const perms = interaction.member.roles.cache.some((r: { name: string; }) => r.name === 'LED') || interaction.member.roles.cache.some((r: { name: string; }) => r.name === 'Leads');
        if (!perms) return; 
        const message = interaction.options.getString('statement');
        interaction.channel.send({ content: message });
    }
}