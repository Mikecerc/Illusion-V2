import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("getinvite").setDescription("Obtain an invite to invite this bot to a server"),
    execute(interaction) {
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("Orange")
                    .setTitle("Click here to add this bot to a server")
                    .setURL(
                        "https://discord.com/api/oauth2/authorize?client_id=888273097080324137&permissions=396046232577&scope=bot%20applications.commands"
                    ),
            ],
        });
    },
};
