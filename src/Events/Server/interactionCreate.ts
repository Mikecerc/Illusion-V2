export default {
    name: 'interactionCreate',
    async execute(interaction: any, client: any) {
        if (interaction.isCommand() || interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.followUp({ content: 'this command does not exist' }) && client.commands.delete(interaction.commandName);
            command.execute(interaction, client);
        }
    },
};