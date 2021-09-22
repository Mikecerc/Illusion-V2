const { MessageEmbed } = require("discord.js");
let surveyActive = false;

module.exports = {
    name: 'frqinit',
    description: 'initializes a free response survey',
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
    ],
    async execute(interaction, message, client) {
        const canInitSrv = interaction.member.roles.cache.some(r => r.name === 'LED');
        if (surveyActive = false) {
            if (canInitSrv) {
                if (interaction.isCommand()) {
                    const question = interaction.options.getString('question');
                    const surveytitle = interaction.options.getString('surveytitle');

                    const poll = new MessageEmbed()
                        .addColor("RANDOM")
                        .addAuthor(`${Target.user.username}`, Target.user.displayAvatarURL({ dynamic: true }))
                        .addTitle(`${surveytitle}`)
                        .addDiscription(`${question}`)
                        .addFooter(`to respond to this survey, please use /respond `);

                    const channel = interaction.channelid

                    surveyActive = true;
                    console.log(`survey active: ${surveyActive}`);
                    return client.guild.get(channel).send({ embeds: [poll] });
                }
            }
            else {
                const noPerms = new MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle('There was an error!')
                    .setDescription('Unfortunatly, you dont have permission to use this command.\n If you believe this is incorrect, please contact <@512063606750183429>');

                return interaction.followUp({ embeds: [noPerms], ephemeral: true });
            }

        }
        else {
            const surveyInSession = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle('There was an error!')
                .setDescription('there is already a survey in session!');

            interaction.followUp({ embeds: [surveyInSession] });
        }
    },
};