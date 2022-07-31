import { MessageEmbed } from 'discord.js' 
export default {
    name: 'givemeana',
    description: 'AAA',
    async execute(interaction: any) {
        const Response = new MessageEmbed()
        .setTitle('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
        .setColor('RANDOM');

        await interaction.reply({ embeds: [Response] });
        interaction.followUp('https://youtu.be/whhgyzDeCAk');

    },
};