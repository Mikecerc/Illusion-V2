import env from "dotenv";
import mongoose from "mongoose";
import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
//setup dotenv
env.config();
//connect to mongoose db
try {
    mongoose.connect(process.env.db as string);
    console.log("connected to db");
} catch (err) {
    console.error("error connecting to mongoDb", err);
}
//initiate discordjs client
const client: any = new Client({ intents: 32767 });
client.subscriptions = new Map();
client.commands = new Collection();
client.reactionRoles = {};
export default client;
//run each handler file
readdirSync('./dist/handlers').forEach((handler) => {
    import(`./handlers/${handler}`).then((file) => file.default(client));
});
//loging client
client.login(process.env.token);
