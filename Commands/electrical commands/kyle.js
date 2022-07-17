import { MessageEmbed } from 'discord.js';
export default {
    name: 'kylie',
    description: 'F U Big Kyle',
    execute(interaction) {
        const Response = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription('<@406629388059410434> is a little bitch');
        interaction.reply({ embeds: [Response] });
    },

};
