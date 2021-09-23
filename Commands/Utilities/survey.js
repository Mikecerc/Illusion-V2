/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
let surveyActive = false;
let threadNameGlobal;

module.exports = {
    name: 'survey',
    description: 'respond to or create a survey here',
    options: [
        {
            name: "reply",
            description: "reply to a survey",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "response",
                    description: "reply to a survey",
                    type: 'STRING',
                    required: true,
                },
            ],

        },
        {
            name: 'create',
            description: 'create a survey',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'surveytitle',
                    description: 'what do you want the name of the survey to be?',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'question',
                    description: 'what question would you like to ask?',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'channel',
                    description: 'optional: select a channel to post the poll in.',
                    type: 'CHANNEL',
                    required: false,
                },
            ],
        },
        {
            name: 'endsurvey',
            description: 'end the current survey',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'confirm',
                    description: 'are you sure you want to end the survey?',
                    type: "STRING",
                    optional: false,
                    choices: [
                        {
                            name: 'yes',
                            value: 'yes',
                        },
                        {
                            name: 'no',
                            value: 'no',
                        },
                    ],
                },
            ],
        },
    ],


    async execute(interaction, guild) {
        const canInitSrv = interaction.member.roles.cache.some(r => r.name === 'LED');
        if (interaction.options.getSubcommand() === 'create') {

            const surveyInSession = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle('There was an error!')
                .setDescription('there is already a survey in session!');


            if (!surveyActive === false) return interaction.followUp({ embeds: [surveyInSession] });
            if (canInitSrv) {

                const question = interaction.options.getString('question');
                const surveytitle = interaction.options.getString('surveytitle');

                const poll = new MessageEmbed()
                    .setColor("RANDOM")
                    .setAuthor(`${interaction.user.username}`, interaction.user.displayAvatarURL({ dynamic: true }))
                    .setTitle(`${surveytitle}`)
                    .setDescription(`${question}`)
                    .setFooter(`to respond to this survey, please use /survey reply`)
                    .setThumbnail(interaction.guild.iconURL({ dynamic: false }));

                const pollConf = new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription("Your Poll has been created");

                const channelId = interaction.channel.id;
                const channelOption = interaction.options.getChannel('channel');
                const channelDefault = interaction.guild.channels.cache.find(c => c.id === channelId);
                let channelPost;
                if (channelOption) {
                    channelPost = channelOption;
                }
                else {
                    channelPost = channelDefault;
                }

                surveyActive = true;
                console.log(`survey active: ${surveyActive}`);
                interaction.followUp({ embeds: [pollConf] });

                const threadName = `${surveytitle}`;
                const threadChannel = interaction.guild.channels.cache.find(c => c.id === '701930944101089301');
                threadNameGlobal = threadName;

                const threadCreate = await threadChannel.threads.create({
                    name: threadName,
                    autoArchiveDuration: 1440,
                    reason: 'Survey',
                });

                return channelPost.send({ embeds: [poll] });
            }
            else {
                const noPerms = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('There was an error!')
                    .setDescription('Unfortunatly, you dont have permission to use this command.\n If you believe this is incorrect, please contact <@512063606750183429>');

                return interaction.followUp({ embeds: [noPerms] });
            }
        }


        else if (interaction.options.getSubcommand() === 'endsurvey') {
            const confirm = interaction.options.getString('confirm');
            if (confirm === 'yes') {
                if (surveyActive == true) {
                    if (canInitSrv) {
                        const conf = new MessageEmbed()
                            .setColor('GOLD')
                            .setTitle('Sucess! the survey has ended');

                            const channel = interaction.guild.channels.cache.find(c => c.id === '701930944101089301');
                            const thread = channel.threads.cache.find(x => x.name === threadNameGlobal);
                            await thread.setArchived(true);

                        surveyActive = false;
                        return interaction.followUp({ embeds: [conf] });
                    }
                }
                else {
                    const noSurveyErr = new MessageEmbed()
                        .setColor('RED')
                        .setTitle('Error!')
                        .setDescription('there is no survey currently initiated');

                    return interaction.followUp({ embeds: [noSurveyErr] });
                }

            }
            else {
                const cancelErr = new MessageEmbed()
                    .setColor('RED')
                    .setTitle('Error!')
                    .setDescription('You canceled ending the survey');

                return interaction.followUp({ embeds: [cancelErr] });
            }
        }


        else if (interaction.options.getSubcommand() === 'reply') {
            const surveyNotInSession = new MessageEmbed()
                .setColor("RED")
                .setTitle('There was an error!')
                .setDescription('there is no survey in session!');

                if (!surveyActive === true) return interaction.followUp({ embeds: [surveyNotInSession] });

                const response = interaction.options.getString('response');

                const responseLog = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle("Survey Result")
                .setAuthor(`${interaction.user.tag}`, interaction.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }))
                .setDescription(`${interaction.user.username}'s repsonse to the survey:`)
                .addFields({ name: 'Response', value: `${response}` });

                const threadChannel = interaction.guild.channels.cache.find(c => c.id === '701930944101089301');
                const surveyLog = threadChannel.threads.cache.find(t => t.name === threadNameGlobal);

                surveyLog.send({ embeds: [responseLog] });
                return interaction.followUp('Your response has been saved');
        }
    },
};