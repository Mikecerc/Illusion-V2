import { readdirSync } from 'fs';
export default async (client) => {
    const commandsArry = [];
    const commandFolders = readdirSync('./Commands');
    for (const folder of commandFolders) {
        const commandFiles = readdirSync(`./Commands/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of commandFiles) {
            const commandFile = await import(`../Commands/${folder}/${file}`);
            const command  = commandFile.default;
            client.commands.set(command.name, command);
            commandsArry.push(command);
            client.on('ready', () => {
                const guilds = client.guilds.cache.map(res => { return res })
                if (process.env.testMode == true) {
                    for (const guild in guilds) {
                        guilds[guild].commands.set(commandsArry);
                    }
                    client.application.commands.set([])
                } else {
                    client.application.commands.set(commandsArry);
                    for (const guild in guilds) {
                        guilds[guild].commands.set([]);
                    }
                }
            });
        }
    }
};