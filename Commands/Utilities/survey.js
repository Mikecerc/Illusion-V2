/* eslint-disable no-unused-vars */
const { MessageEmbed } = require("discord.js");
const defaultResponseChannel = '701930944101089301';
let surveyActive = false;
let threadNameGlobal;
let surveyResponseChannel;
let canRespond1;
let canRespond2;
let canRespond3;
let canRespond4;
let canRespond5;

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
                    name: 'surveychannel',
                    description: 'optional: select a channel to post the poll in.',
                    type: 'CHANNEL',
                    required: false,
                },
                {
                    name: 'responsechannel',
                    description: 'optional: set a specif channel to log the responses',
                    type: 'CHANNEL',
                    required: false,
                },
                {
                    name: 'restrictsurveyrole1',
                    description: 'Optional: restrict a survey to upto 5 rolls (role 1)',
                    type: 'ROLE',
                    required: false,

                },
                {
                    name: 'restrictsurveyrole2',
                    description: 'Optional: restrict a survey to upto 5 rolls (role 2)',
                    type: 'ROLE',
                    required: false,

                },
                {
                    name: 'restrictsurveyrole3',
                    description: 'Optional: restrict a survey to upto 5 rolls (role 3)',
                    type: 'ROLE',
                    required: false,

                },
                {
                    name: 'restrictsurveyrole4',
                    description: 'Optional: restrict a survey to upto 5 rolls (role 4)',
                    type: 'ROLE',
                    required: false,
                },
                {
                    name: 'restrictsurveyrole5',
                    description: 'Optional: restrict a survey to upto 5 rolls (role 5)',
                    type: 'ROLE',
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
        await interaction.deferReply({ ephemeral: true }).catch(() => {});
        const canInitSrv = interaction.member.roles.cache.some(r => r.name === 'LED');
        if (interaction.options.getSubcommand() === 'create') {

            const surveyInSession = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle('There was an error!')
                .setDescription('there is already a survey in session!');


            if (!surveyActive === false) return interaction.followUp({ embeds: [surveyInSession] });
            if (canInitSrv) {

                const role1 = interaction.options.getRole('restrictsurveyrole1');
                const role2 = interaction.options.getRole('restrictsurveyrole2');
                const role3 = interaction.options.getRole('restrictsurveyrole3');
                const role4 = interaction.options.getRole('restrictsurveyrole4');
                const role5 = interaction.options.getRole('restrictsurveyrole5');

                if (role1) {canRespond1 = role1.id;}
                if (role2) {canRespond2 = role2.id;}
                if (role3) {canRespond3 = role3.id;}
                if (role4) {canRespond4 = role4.id;}
                if (role5) {canRespond5 = role5.id;}
                if (interaction.member.roles.cache.has(role1)) {
                    console.log('ok');
                }

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
                const channelOption = interaction.options.getChannel('surveychannel');
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

                const responseChannelDefault = interaction.guild.channels.cache.find(c => c.id === defaultResponseChannel);
                const responseChannelOption = interaction.options.getChannel('responsechannel');
                if (responseChannelOption) {
                    surveyResponseChannel = responseChannelOption;
                }
                else {
                    surveyResponseChannel = responseChannelDefault;
                }

                const threadName = `${surveytitle}`;
                threadNameGlobal = threadName;

                const threadCreate = await surveyResponseChannel.threads.create({
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

                        const thread = surveyResponseChannel.threads.cache.find(x => x.name === threadNameGlobal);
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
            let canRespond = false;
            if (canRespond1 || canRespond2 || canRespond3 || canRespond4 || canRespond5) {
                const canRepSurvey1 = interaction.member.roles.cache.some(r => r.id === canRespond1);
                const canRepSurvey2 = interaction.member.roles.cache.some(r => r.id === canRespond2);
                const canRepSurvey3 = interaction.member.roles.cache.some(r => r.id === canRespond3);
                const canRepSurvey4 = interaction.member.roles.cache.some(r => r.id === canRespond4);
                const canRepSurvey5 = interaction.member.roles.cache.some(r => r.id === canRespond5);
                console.log(canRespond1);
                if (canRepSurvey1 || canRepSurvey2 || canRepSurvey3 || canRepSurvey4 || canRepSurvey5) {
                    canRespond = true;
                }
                else {
                    const error = new MessageEmbed()
                        .setColor("RED")
                        .setTitle('Error!')
                        .setDescription('Oh no! you cannont respond to this survey.');

                    interaction.followUp({ embeds: [error] });
                }
            }
            else {
                canRespond = true;
            }

            if (canRespond == true) {
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

                const surveyLog = surveyResponseChannel.threads.cache.find(t => t.name === threadNameGlobal);

                surveyLog.send({ embeds: [responseLog] });
                return interaction.followUp('Your response has been saved');
            }
        }
    },
};