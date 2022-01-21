const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'warnkyle',
    description: 'warn kyle for acting like a freshman',
    async execute (interaction) {
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription('Kyle stop acting like a freshman');

        const messages = await interaction.channel.messages.fetch({limit: 100}).then(messages => {
            const msg = messages.filter(m => m.author.id === '406629388059410434' ).first()
            interaction.reply({ content:'ok...', ephemeral: true });
            return msg.reply({ embeds: [embed] });
        }).catch(err => {
            console.log(err)
            return interaction.reply('kyle hasn\'t said anthing in a while');
        }) 
    }
}