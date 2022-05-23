const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu,
    MessageButton,
    Permissions,
    Modal,
    TextInputComponent,
} = require("discord.js");
const pollModel = require("../schemas/pollSchema.js");
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (interaction.isModalSubmit()) {
            data = interaction.customId.split("-");
            if (data[0] == "10") {
                const isPoll = data[1];
                const isAnonymous =
                    data[2] == "false" || data[2] == "null" ? false : true;
                const multipleResponse =
                    data[3] == "false" || data[3] == "null" ? false : true;
                if (isPoll == "true") {
                    const question =
                        interaction.fields.getTextInputValue("question");
                    const answer1 =
                        interaction.fields.getTextInputValue("answer1");
                    const answer2 =
                        interaction.fields.getTextInputValue("answer2");
                    const answer3 =
                        interaction.fields.getTextInputValue("answer3");
                    const answer4 =
                        interaction.fields.getTextInputValue("answer4");

                    let options = [];
                    let answers = [answer1, answer2];
                    if (answer3 != "") answers.push(answer3);
                    if (answer4 != "") answers.push(answer4);

                    let embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Multiple Choice Poll")
                        .setDescription(question);

                    for (answer in answers) {
                        embed.addField(
                            `Answer #${parseInt(answer) + 1}:`,
                            `${answers[answer]}`
                        );
                        options.push({
                            label: `Answer ${answer}:`,
                            value: `${answer}`,
                            description: `${answers[answer].slice(0, 100)}`,
                        });
                    }
                    let row;
                    if (multipleResponse) {
                        row = new MessageActionRow().addComponents(
                            new MessageSelectMenu()
                                .setCustomId("11")
                                .setPlaceholder("No Choice Selected")
                                .addOptions(options)
                                .setMinValues(1)
                                .setMaxValues(answers.length)
                        );
                    } else {
                        row = new MessageActionRow().addComponents(
                            new MessageSelectMenu()
                                .setCustomId("11")
                                .setPlaceholder("No Choice Selected")
                                .addOptions(options)
                        );
                    }
                    let row1 = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId("12")
                            .setStyle("DANGER")
                            .setLabel("End Poll")
                    );
                    await interaction.reply({
                        embeds: [embed],
                        components: [row, row1],
                    });
                    const message = await interaction.fetchReply();
                    doc = new pollModel();
                    doc.messageId = message.id;
                    doc.anonymous = isAnonymous;
                    doc.creator = interaction.user.id;
                    doc.content.question = question;
                    doc.content.answers = answers;
                    doc.multipleResponse = multipleResponse;
                    doc.serverId = interaction.guild.id;
                    doc.save();
                } else {
                    const question =
                        interaction.fields.getTextInputValue("question");

                    let embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Free Response Survey:")
                        .setDescription(question);

                    await interaction.reply({
                        embeds: [embed],
                    });
                    const thread = await interaction.channel.threads.create({
                        name: "Survey",
                        autoArchiveDuration: 1440,
                        reason: "Survey,",
                    });
                    const message = await interaction.fetchReply();
                    let row = new MessageActionRow().addComponents(
                        new MessageButton()
                            .setCustomId(`13-${thread.id}-${isAnonymous}`)
                            .setStyle("PRIMARY")
                            .setLabel("Respond"),
                        new MessageButton()
                            .setCustomId(
                                `14-${thread.id}-${interaction.user.id}`
                            )
                            .setStyle("DANGER")
                            .setLabel("End Survey")
                    );
                    message.edit({ components: [row] });
                }
            } else if (data[0] == "15") {
                const answer = interaction.fields.getTextInputValue("answer");
                const isAnonymous =
                    data[2] == "false" || data[2] == "null" ? false : true;
                if (!isAnonymous) {
                    const embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Survey Result")
                        .setAuthor({
                            name: `${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setDescription(
                            `${interaction.user.username}'s repsonse to the survey:`
                        )
                        .addFields({ name: "Response", value: `${answer}` });

                    const thread = interaction.channel.threads.cache.find(
                        (t) => t.id == data[1]
                    );
                    thread.send({ embeds: [embed] });
                    const success = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription("Your response has been recorded");
                    interaction.reply({ embeds: [success], ephemeral: true });
                } else {
                    const embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Survey Result")
                        .setDescription(`repsonse to the survey:`)
                        .addFields({ name: "Response", value: `${answer}` });

                    const thread = await interaction.channel.threads.cache.find(
                        (t) => t.id == data[1]
                    );
                    thread.send({ embeds: [embed] });
                    const success = new MessageEmbed()
                        .setColor("GREEN")
                        .setDescription("Your response has been recorded");
                    interaction.reply({ embeds: [success], ephemeral: true });
                }
            }
        } else if (interaction.isSelectMenu()) {
            data = interaction.customId.split("-");
            if (data[0] == "11") {
                let res = await pollModel.findOne({
                    messageId: interaction.message.id,
                    serverId: interaction.guild.id,
                });
                if (res.responses.length > 0) {
                    for (response in res.responses) {
                        if (
                            res.responses[response].userId ==
                            interaction.user.id
                        ) {
                            res.responses[response].answers =
                                interaction.values;
                        } else {
                            res.responses.push({
                                userId: interaction.user.id,
                                answers: interaction.values,
                            });
                        }
                    }
                } else {
                    res.responses.push({
                        userId: interaction.user.id,
                        answers: interaction.values,
                    });
                }
                res.save();
                let success = new MessageEmbed()
                    .setColor("GREEN")
                    .setDescription("Your response has been recorded")
                    .setTimestamp();
                interaction.reply({ embeds: [success], ephemeral: true });

                let newEmbed = new MessageEmbed()
                    .setTitle("Multiple Choice Poll")
                    .setDescription(res.content.question)
                    .setColor("RANDOM");
                let votes = [0, 0, 0, 0];
                for (response in res.responses) {
                    for (vote in res.responses[response].answers) {
                        votes[
                            parseInt(res.responses[response].answers[vote])
                        ]++;
                    }
                }
                for (answer in res.content.answers) {
                    newEmbed.addField(
                        `Answer #${parseInt(answer) + 1} (${votes[answer]}):`,
                        `${res.content.answers[answer]}`
                    );
                }
                await interaction.message.edit({ embeds: [newEmbed] });
            }
        } else if (interaction.isButton()) {
            const data = interaction.customId.split("-");
            if (data[0] == "12") {
                let res = await pollModel.findOne({
                    messageId: interaction.message.id,
                    serverId: interaction.guild.id,
                });
                if (
                    interaction.member.permissions.has(
                        Permissions.FLAGS.MANAGE_MESSAGES
                    ) ||
                    interaction.user.id == res.creator
                ) {
                    let newEmbed = new MessageEmbed()
                        .setTitle("Multiple Choice Poll (ended)")
                        .setDescription(res.content.question)
                        .setColor("RANDOM");

                    let votes = [0, 0, 0, 0];
                    let users = ["", "", "", ""];
                    for (response in res.responses) {
                        for (vote in res.responses[response].answers) {
                            votes[
                                parseInt(res.responses[response].answers[vote])
                            ]++;
                            users[
                                parseInt(res.responses[response].answers[vote])
                            ] =
                                users[
                                    parseInt(
                                        res.responses[response].answers[vote]
                                    )
                                ] + `<@${res.responses[response].userId}> `;
                        }
                    }
                    users =
                        users == ""
                            ? (users = "no responses")
                            : (users = users);
                    for (answer in res.content.answers) {
                        if (res.anonymous == true) {
                            newEmbed.addField(
                                `Answer #${parseInt(answer) + 1} (Responses: ${
                                    votes[answer]
                                }):`,
                                `${res.content.answers[answer]}`
                            );
                            newEmbed.addField(`Responses:`, `${votes[answer]}`);
                        } else {
                            newEmbed.addField(
                                `Answer #${parseInt(answer) + 1}`,
                                `${res.content.answers[answer]}`
                            );
                            newEmbed.addField(
                                `Responses: (${votes[answer]}):`,
                                `Users: ${users[answer].slice(0, 1024)}`
                            );
                        }
                    }
                    await interaction.message.edit({
                        embeds: [newEmbed],
                        components: [],
                    });
                    await pollModel.deleteOne({
                        messageId: interaction.message.id,
                        serverId: interaction.guild.id,
                    });
                } else {
                    const embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(
                            "Sorry, You do not have permission to end this poll. Only the poll creator and those with the permission: MANAGE_MESSSAGES can end this poll."
                        );
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } else if (data[0] == "13") {
                const modal = new Modal()
                    .setCustomId(`15-${data[1]}-${data[2]}`)
                    .setTitle("Survey Response");

                const answer = new TextInputComponent()
                    .setCustomId("answer")
                    .setLabel("Response (anonymous)")
                    .setStyle("PARAGRAPH")
                    .setPlaceholder("Please enter a response")
                    .setMaxLength(4000)
                    .setRequired(true);

                const row = new MessageActionRow().addComponents(answer);
                modal.addComponents(row);
                await interaction.showModal(modal);
            } else if (data[0] == "14") {
                if (
                    interaction.user.id == data[2] ||
                    interaction.member.permissions.has(
                        Permissions.FLAGS.MANAGE_MESSAGES
                    )
                ) {
                    const embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("Free Resposne Survey (ended):")
                        .setDescription(
                            interaction.message.embeds[0].description
                        );
                    interaction.message.edit({
                        embeds: [embed],
                        components: [],
                    });
                    const thread = await interaction.channel.threads.cache.find(
                        (t) => t.id == data[1]
                    );
                    await thread.setArchived(true);
                } else {
                    const embed = new MessageEmbed()
                        .setColor("RED")
                        .setDescription(
                            "Sorry, You do not have permission to end this poll. Only the poll creator and those with the permission: MANAGE_MESSSAGES can end this poll."
                        );
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
        }
    },
};
