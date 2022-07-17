/* eslint-disable no-case-declarations */
import { MessageEmbed } from 'discord.js';
export default {
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
                    value: 'fab',
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
        switch (subgroup) {
            case ('electrical'):
                const ElecResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('GREEN')
                    .setDescription(`HELL YEAH! ELECTRICAL SUPREMACY!!! YOU are a SMART Person <@${interaction.user.id}> `)
                    .setFooter(`Good Job ${interaction.user.tag}`);
                interaction.reply({ embeds: [ElecResponse] });
                return;
            case ('programming'):
                const ProResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('RED')
                    .setDescription(`<@${interaction.user.id}> are you ok??? There will never be such a thing called\n 'Programming Supremacy' SMH.. `)
                    .setFooter(`WTF ${interaction.user.tag}`);
                interaction.reply({ embeds: [ProResponse] });
                return;
            case ('marketing'):
                const MarResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('RED')
                    .setDescription('um... what? ')
                    .setFooter(`Really ${interaction.user.tag}, Marketing?`);
                interaction.reply({ embeds: [MarResponse] });
                return;
            default:
                const DefResponse = new MessageEmbed()
                    .setAuthor(`User: ${interaction.user.username}`)
                    .setColor('RED')
                    .setDescription(`yeah... no. ${subgroup} supremacy? Ha! <@${interaction.user.id}> you arent very bright are you?`)
                    .setFooter(`SMH ${interaction.user.tag}`);
                interaction.reply({ embeds: [DefResponse] });
                return;
        }
    },
};