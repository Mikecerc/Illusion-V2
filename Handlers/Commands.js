import { readdirSync } from 'fs';
export default async (client) => {
    //create a blank array for commands
    const commandsArry = [];
    //import all command sub-folders
    const commandFolders = readdirSync("./Commands");
    for (const folder of commandFolders) {
        // filter out js files within each folder
        const commandFiles = readdirSync(`./Commands/${folder}`).filter(
            (files) => files.endsWith('.js')
        );
        for (const file of commandFiles) {
            //imports each file
            const commandFile = await import(`../Commands/${folder}/${file}`);
            const command  = commandFile.default;
            //adds each command to the client's command collection (map)
            client.commands.set(command.name, command);
            // also adds each command to the array 
            commandsArry.push(command);
            client.on('ready', () => {
                //gets all client guilds
                const guilds = client.guilds.cache.map(res => { return res })
                //test mode determines if the commands will be set globally or locally (by guild)
                if (process.env.testMode == true) {
                    //for each guild, set the commands and remove all global commands
                    for (const guild in guilds) {
                        guilds[guild].commands.set(commandsArry);
                    }
                    client.application.commands.set([])
                } else {
                    //set commands globally and remove all local commands in every guild
                    client.application.commands.set(commandsArry);
                    for (const guild in guilds) {
                        guilds[guild].commands.set([]);
                    }
                }
            });
        }
    }
};
