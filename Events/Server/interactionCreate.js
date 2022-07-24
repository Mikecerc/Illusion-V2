export default {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.followUp({ content: 'this command does not exist' }) && client.commands.delete(interaction.commandName);
            command.execute(interaction, client);
        }
    },
};