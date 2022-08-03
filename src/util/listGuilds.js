import env from "dotenv";
import { Client } from "discord.js";
import fs from "fs";
env.config();
const client = new Client({ intents: 32767 });
client.login(process.env.token).then(() => {
client.guilds.fetch().then(res => {
    const guilds = res.map(r => r.name);
    fs.writeFile("./guilds.txt", guilds.join('\n'), (err) => {
        if (err) console.error(err);
        console.log("Guilds written to guilds.txt");
        process.exit()
    });
});});