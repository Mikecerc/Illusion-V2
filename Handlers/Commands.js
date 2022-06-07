const { readdirSync } = require('fs');

module.exports = async (client) => {
    const commandsArry = [];
    const commandFolders = readdirSync('./Commands');
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./Commands/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../Commands/${folder}/${file}`);
            client.commands.set(command.name, command);
            commandsArry.push(command);
            client.on('ready', () => {
                const guilds = client.guilds.cache.map(res => {return res })
                for (guild in guilds) {
                    guilds[guild].commands.set(commandsArry);
                }
                client.application.commands.set(commandsArry);
            });
        }
    }
};