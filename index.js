import env from 'dotenv';
import mongoose from 'mongoose';
import { Client, Collection } from 'discord.js';
//setup dotenv
env.config()
//connect to mongoose db
mongoose.connect(process.env.db).then(console.log('connected to db')).catch((err) => console.log(err))
//initiate discordjs client
const client = new Client({ intents: 32767 });
client.subscriptions = new Map();
client.commands = new Collection();
client.setMaxListeners(30);
export default client;
//run each handler file
['Events.js', 'Commands.js'].forEach(handler => {
import(`./Handlers/${handler}`).then(file => file.default(client));
});
//loging client
client.login(process.env.token);