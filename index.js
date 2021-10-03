const { Client, Collection } = require('Discord.js');
const client = new Client({ intents: 32767 });
module.export = client;
const { token } = require('./config.json');

client.commands = new Collection();
client.setMaxListeners(20);

['Events', 'Commands'].forEach(handler => {
require(`./Handlers/${handler}`)(client);

});

client.login(token);