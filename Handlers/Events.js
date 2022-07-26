import { readdirSync } from 'fs';
export default async (client) => {
    const eventFolders = readdirSync('./Events')
    for (const folder of eventFolders) {
        const eventFiles = readdirSync(`./Events/${folder}`).filter(files => files.endsWith('.js'));
        for (const file of eventFiles) {
            const eventFile = await import(`../Events/${folder}/${file}`);
            const event = eventFile.default;
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            }
            else {
                client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
};