require('dotenv').config();
const mongoose = require('mongoose')
//mongoose.connect(process.env.db).then(console.log('connected to db')).catch((err) => console.log(err))
const { Client, Collection } = require('discord.js');
const client = new Client({ intents: 32767 });
module.exports = client;

client.commands = new Collection();
client.setMaxListeners(20);

['Events', 'Commands'].forEach(handler => {
require(`./Handlers/${handler}`)(client);

});
client.login(process.env.token);