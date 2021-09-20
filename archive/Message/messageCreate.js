const { Client, Message, MessageEmbed, Collection } = require('discord.js'); 
const { prefix } = require('../../config.json');

module.exports = {
    name: "messageCreate", 
    /**
     * @param {Client} client
     * @param {Message} message
     */
    async execute(message, client, Discord) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
        if(!command) return;

        if (command.permissions) {
            const authorPerms = message.channel.permissionsFor(message.author); 
            if (!authorPerms || !authorPerms.has(command.permissions)){
                const NoPerms = new MessageEmbed() 
                .setColor('RED')
                .setDescription('You do not have the permissions to use this command')
                message.channel.send({embeds: [NoPerms]})
                console.log('made it this far')
                .then((sent) => {
                    setTimeout(() => {
                        sent.delete();
                    }, 2000)
                })
            };
        };
        
        const { cooldowns } = client;
        if (!cooldowns.has(command.name)){
            cooldowns.set(command.name, new Collection())
        };
    
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) { 
                const timeLeft = (expirationTime - now) /1000;
                const timeLeftEmbed = new MessageEmbed()
                .setColor('RED')
                .setDescription(`Please wait another ${timeLeft.toFixed(1)} before attempting to run this command again!`)
                return message.channel.send({embeds: [timeLeftEmbed]})
                .then((sent) => {
                    setTimeout(() => {
                        sent.delete();
                    }, 2000);
                });
            };
        };
        
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        try { 
            command.execute(message, args, commandName, client, Discord);
        } catch (error) {
            console.log(error); 
            const ErrorEmbed = new MessageEmbed()
            .setColor('RED') 
            .setDescription('An Error Happened while running this command (ping Michael pls)')
            message.channel.send({embeds: [ErrorEmbed]});
        }
    }
}