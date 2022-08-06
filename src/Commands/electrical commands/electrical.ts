import { SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("electrical").setDescription("David's most infamous quote"),
    async execute(interaction: any) {
        interaction.reply("https://media1.tenor.com/images/0e74eead09d35405afba612e599f0d0c/tenor.gif?itemid=23097399");
    },
};
