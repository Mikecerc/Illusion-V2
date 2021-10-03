const { readdirSync } = require('fs');

module.exports = (client) => {
    const eventFiles = readdirSync(`./Events`).filter(files => files.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`../Events/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        }
        else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
};