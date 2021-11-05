module.exports = {
    name: 'hmm',
    description: 'admin only',
    options: [{
        name: 'statement',
        description: 'admin only',
        type: 'STRING',
        required: true,
    },

],
    async execute(interaction) {
        const perms = interaction.member.roles.cache.some(r => r.name === 'LED') || interaction.member.roles.cache.some(r => r.name === 'Leads');
        if (!perms) return; 
        message = interaction.options.getString('statement');
        interaction.followUp('done')
        interaction.channel.send(message);
    }
}