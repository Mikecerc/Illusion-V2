import env from 'dotenv';
import mongoose from 'mongoose';
import { Client, Collection } from 'discord.js';
env.config()
mongoose.connect(process.env.db).then(console.log('connected to db')).catch((err) => console.log(err))
const client = new Client({ intents: 32767 });
client.commands = new Collection();
client.reactionRoles = {};
client.setMaxListeners(20);
export default client;
['Events.js', 'Commands.js'].forEach(handler => {
import(`./Handlers/${handler}`).then(file => file.default(client));
});
client.login(process.env.token);