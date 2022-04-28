module.exports = {
    name: "interactionCreate",
    execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId.startsWith('kylethinksaboutwhathesays-')) {
            let data = interaction.customId.split('-');
            if (interaction.user.id != '406629388059410434') return interaction.deferUpdate();
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
};