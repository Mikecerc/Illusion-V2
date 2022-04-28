const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.followUp({ content: 'this command does not exist' }) && client.commands.delete(interaction.commandName);
            command.execute(interaction, client);
        } else if (interaction.isButton()) {
            if (interaction.customId.startsWith('kylethinksaboutwhathesays-')) {
                let data = interaction.customId.split('-');
                if (data[1] === 'y') {
                    interaction.message.delete()
                        .catch(console.error);
                    const Response = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(
                        "<@!406629388059410434> stop acting like a freshman"
                        );
                    interaction.channel.messages.fetch(data[2]).then((m) => m.reply({ embeds: [Response] }));
                } else {
                    interaction.channel.messages.fetch(data[2]).then((m) => m.delete());
                    interaction.message.delete()
                    interaction.channel.send("kyle good job at being mature");
                }
            }
        }
    },
};