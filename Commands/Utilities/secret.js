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
        const perms = interaction.member.roles.cache.some(r => r.name === 'LED') 
        if (!perms) return; 
        message = interaction.options.getString('statement');
        interaction.deleteReply();
        interaction.channel.send(message);
    }
}