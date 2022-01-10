modules.exports = {
    name: 'messageCreate', 
    execute (message) {
        let content = message.content.toLowerCase().replace(/\s/g, '')
        if (
            content.includes('balls') ||
            content.includes('ballz') || 
            content.includes('cum') || 
            content.includes('didiask') || 
            content.includes('die') ||
            content.includes('secks') ||
            content.includes('seggs') ||
            content.includes('segs') ||
            content.includes('urdad') ||
            content.includes('yourdad') ||
            content.includes('fuckyou') ||
            content.includes('fuckoff') ||
            content.includes('shutup') ||
            content.includes('horny') ||
            content.includes('yurdad') ||
            content.includes('yurrdad') ||
            content.includes('yurmom') ||
            content.includes('yurrmom') ||
            content.includes('yourmom') ||
            content.includes('urmom') ||
            content.includes('tasty') ||
            content.includes('fuckme') ||
            content.includes('mewhenyour') 
        ) {
            const Response = new MessageEmbed()
                .setColor('RED')
                .setDescription('<@406629388059410434> stop acting like a freshman');
            message.reply({ embeds: [Response] });
        }
    }
}