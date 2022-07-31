import env from 'dotenv';
import mongoose from 'mongoose';
import { Client, Collection } from 'discord.js';
//setup dotenv
env.config()
//connect to mongoose db
try {
mongoose.connect(process.env.db as string);
console.log('connected to db')
} catch (err) { console.error('error connecting to mongoDb', err)}
//initiate discordjs client
const client: any = new Client({ intents: 32767 });
client.subscriptions = new Map();
client.commands = new Collection();
client.reactionRoles = {};
client.setMaxListeners(30);
export default client;
//run each handler file
['Events.js', 'Commands.js'].forEach(handler => {
import(`./Handlers/${handler}`).then(file => file.default(client));
});
//loging client
client.login(process.env.token);