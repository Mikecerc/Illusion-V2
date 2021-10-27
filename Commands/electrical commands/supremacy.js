/* eslint-disable no-case-declarations */
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'supremacy',
    description: 'Better be Electrical...',
    options: [
        {
            name: 'subgroup',
            description: 'Select the subgroup of which you are claiming supremacy ',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'electrical',
                    value: 'electrical',
                },
                {
                    name: 'programming',
                    value: 'programming',
                },
                {
                    name: 'marketing',
                    value: 'marketing',
                },
                {
                    name: 'fab',
                    value: 'design',
                },
                {
                    name: 'design',
                    value: 'design',
                },
                {
                    name: 'strategy',
                    value: 'strategy',
                },
                {
                    name: 'controls',
                    value: 'controls',
                },
                {
                    name: 'outreach',
                    value: 'outreach',
                },
                {
                    name: 'coms',
                    value: 'coms',
                },
                {
                    name: 'animation',
                    value: 'animation',
                },
            ],

        },
    ],


    execute(interaction) {
        const subgroup = interaction.options.getString('subgroup');
        interaction.followUp('done!')
        switch (subgroup) {
            case ('electrical'):
                const ElecResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('GREEN')
                    .setDescription(`HELL YEAH! ELECTRICAL SUPREMACY!!! YOU are a SMART Person <@${interaction.user.id}> `)
                    .setFooter(`Good Job ${interaction.user.tag}`);
                interaction.channel.send({ embeds: [ElecResponse] });
                return;
            case ('programming'):
                const ProResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('RED')
                    .setDescription(`<@${interaction.user.id}> are you ok??? There will never be such a thing called\n 'Programming Supremacy' SMH.. `)
                    .setFooter(`WTF ${interaction.user.tag}`);
                interaction.channel.send({ embeds: [ProResponse] });
                return;
            case ('marketing'):
                const MarResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('RED')
                    .setDescription('um... what? ')
                    .setFooter(`Really ${interaction.user.tag}, Marketing?`);
                interaction.channel.send({ embeds: [MarResponse] });
                return;
            default:
                const DefResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('RED')
                    .setDescription(`yeah... no. ${subgroup} supremacy? Ha! <@${interaction.user.id}> you arent very bright are you?`)
                    .setFooter(`SMH ${interaction.user.tag}`);
                interaction.channel.send({ embeds: [DefResponse] });
                return;
        }
    },
};