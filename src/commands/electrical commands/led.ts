import { SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("led").setDescription("LIGHT EMITTING DIODE"),
    async execute(interaction: any) {
        interaction.reply("https://media1.tenor.com/images/e782e9078c7f4762f3f5d238416c811b/tenor.gif?itemid=23096778");
    },
};
