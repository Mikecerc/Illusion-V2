require('dotenv').config();
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
module.exports = client;

client.commands = new Collection();
client.setMaxListeners(20);

['Events', 'Commands'].forEach(handler => {
require(`./Handlers/${handler}`)(client);

});
client.login(process.env.token);