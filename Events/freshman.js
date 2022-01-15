const { MessageEmbed } =require('discord.js');
module.exports = {
    name: 'messageCreate', 
    execute (message) {
        if (message.author.id != '406629388059410434') return;
        let content = message.content.toLowerCase().replace(/\s/g, '')
        
            const Response = new MessageEmbed()
                .setColor('RED')
                .setDescription('<@406629388059410434> stop acting like a freshman');
            message.reply({ embeds: [Response] });
        
    }
}