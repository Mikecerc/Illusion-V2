const { readdirSync } = require('fs');
const { guildId } = require('../config.json');

module.exports = (client) => {
    const commandsArry = [];
    const commandFolders = readdirSync('./Commands');
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./Commands/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../Commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            commandsArry.push(command);
            client.on('ready', () => {
                client.guilds.cache.get(guildId).commands.set(commandsArry);
            });
        }
    }
};