import {
    EmbedBuilder,
    ActionRowBuilder,
    SelectMenuBuilder,
    ButtonBuilder,
    Permissions,
    ModalBuilder,
    TextInputBuilder,
    MessageActionRowComponent,
    MessageActionRowComponentResolvable,
    ModalActionRowComponentBuilder,
    ButtonStyle,
    PermissionFlagsBits,
    TextInputStyle,
} from "discord.js";
import pollModel from "../../schemas/pollSchema.js";
export default {
    name: "interactionCreate",
    async execute(interaction: any) {
        if (interaction.isModalSubmit()) {
            const data = interaction.customId.split("-");
            if (data[0] == "10") {
                const isPoll = data[1];
                const isAnonymous = data[2] == "false" || data[2] == "null" ? false : true;
                const multipleResponse = data[3] == "false" || data[3] == "null" ? false : true;
                if (isPoll == "true") {
                    const question = interaction.fields.getTextInputValue("question");
                    const answer1 = interaction.fields.getTextInputValue("answer1");
                    const answer2 = interaction.fields.getTextInputValue("answer2");
                    const answer3 = interaction.fields.getTextInputValue("answer3");
                    const answer4 = interaction.fields.getTextInputValue("answer4");

                    let options = [];
                    let answers = [answer1, answer2];
                    if (answer3 != "") answers.push(answer3);
                    if (answer4 != "") answers.push(answer4);

                    let embed = new EmbedBuilder().setColor("Orange").setTitle("Multiple Choice Poll").setDescription(question);

                    for (const answer in answers) {
                        embed.addFields({
                            name: `Answer #${parseInt(answer) + 1}:`,
                            value: `${answers[answer]}`,
                        });
                        options.push({
                            label: `Answer ${parseInt(answer) + 1}:`,
                            value: `${answer}`,
                            description: `${answers[answer].slice(0, 100)}`,
                        });
                    }
                    let row: any;
                    if (multipleResponse) {
                        row = new ActionRowBuilder().addComponents(
                            new SelectMenuBuilder()
                                .setCustomId("11")
                                .setPlaceholder("No Choice Selected")
                                .addOptions(options)
                                .setMinValues(1)
                                .setMaxValues(answers.length)
                        );
                    } else {
                        row = new ActionRowBuilder().addComponents(
                            new SelectMenuBuilder().setCustomId("11").setPlaceholder("No Choice Selected").addOptions(options)
                        );
                    }
                    let row1 = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId("12").setStyle(ButtonStyle.Danger).setLabel("End Poll")
                    );
                    const pollMsg = await interaction.reply({
                        embeds: [embed],
                        components: [row, row1],
                    });
                    const message = await interaction.fetchReply().catch((e) => {
                        if (e) {
                            const err = new EmbedBuilder()
                                .setColor("Orange")
                                .setDescription("There was an error creating this poll. Please try again later.");
                            return pollMsg.edit({ embeds: [err], components: [] });
                        }
                    });
                    const doc = new pollModel();
                    doc.messageId = message.id;
                    doc.anonymous = isAnonymous;
                    doc.creator = interaction.user.id;
                    doc.content.question = question;
                    doc.content.answers = answers;
                    doc.multipleResponse = multipleResponse;
                    doc.serverId = interaction.guild.id;
                    doc.save();
                } else {
                    const question = interaction.fields.getTextInputValue("question");

                    let embed = new EmbedBuilder().setColor("Orange").setTitle("Free Response Survey:").setDescription(question);

                    await interaction.reply({
                        embeds: [embed],
                    });
                    const thread = await interaction.channel.threads.create({
                        name: "Survey",
                        autoArchiveDuration: 1440,
                        reason: "Survey,",
                    });
                    const message = await interaction.fetchReply();
                    let row = new ActionRowBuilder().addComponents(
                        new ButtonBuilder().setCustomId(`13-${thread.id}-${isAnonymous}`).setStyle(ButtonStyle.Primary).setLabel("Respond"),
                        new ButtonBuilder()
                            .setCustomId(`14-${thread.id}-${interaction.user.id}`)
                            .setStyle(ButtonStyle.Danger)
                            .setLabel("End Survey")
                    );
                    message.edit({ components: [row] });
                }
            } else if (data[0] == "15") {
                const answer = interaction.fields.getTextInputValue("answer");
                const isAnonymous = data[2] == "false" || data[2] == "null" ? false : true;
                if (!isAnonymous) {
                    const embed = new EmbedBuilder()
                        .setColor("Orange")
                        .setTitle("Survey Result")
                        .setAuthor({
                            name: `${interaction.user.tag}`,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setDescription(`${interaction.user.username}'s repsonse to the survey:`)
                        .addFields({ name: "Response", value: `${answer}` });

                    const thread = interaction.channel.threads.cache.find((t) => t.id == data[1]);
                    thread.send({ embeds: [embed] });
                    const success = new EmbedBuilder().setColor("Orange").setDescription("Your response has been recorded");
                    interaction.reply({ embeds: [success], ephemeral: true });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor("Orange")
                        .setTitle("Survey Result")
                        .setDescription(`repsonse to the survey:`)
                        .addFields({ name: "Response", value: `${answer}` });

                    const thread = await interaction.channel.threads.cache.find((t) => t.id == data[1]);
                    thread.send({ embeds: [embed] });
                    const success = new EmbedBuilder().setColor("Orange").setDescription("Your response has been recorded");
                    interaction.reply({ embeds: [success], ephemeral: true });
                }
            }
        } else if (interaction.isSelectMenu()) {
            const data = interaction.customId.split("-");
            if (data[0] == "11") {
                let res = await pollModel
                    .findOne({
                        messageId: interaction.message.id,
                        serverId: interaction.guild.id,
                    })
                    .catch((e) => {
                        if (e) {
                            const err = new EmbedBuilder()
                                .setColor("Orange")
                                .setDescription("There was an error responding to this poll. Please try again later.");
                            return interaction.reply({ embeds: [err] });
                        }
                    });
                if (res.responses.length > 0) {
                    let modified = false;
                    for (const response in res.responses) {
                        if (res.responses[response].userId == interaction.user.id) {
                            res.responses[response].answers = interaction.values;
                            modified = true;
                        }
                    }
                    if (!modified) {
                        res.responses.push({
                            userId: interaction.user.id,
                            answers: interaction.values,
                        });
                    }
                } else {
                    res.responses.push({
                        userId: interaction.user.id,
                        answers: interaction.values,
                    });
                }
                res.save();
                let success = new EmbedBuilder().setColor("Orange").setDescription("Your response has been recorded").setTimestamp();
                interaction.reply({ embeds: [success], ephemeral: true });

                let newEmbed = new EmbedBuilder().setTitle("Multiple Choice Poll").setDescription(res.content.question).setColor("Orange");
                let votes = [0, 0, 0, 0];
                for (const response in res.responses) {
                    for (const vote in res.responses[response].answers) {
                        votes[parseInt(res.responses[response].answers[vote])]++;
                    }
                }
                for (const answer in res.content.answers) {
                    newEmbed.addFields({
                        name: `Answer #${parseInt(answer) + 1} (${votes[answer]}):`,
                        value: `${res.content.answers[answer]}`,
                    });
                }
                await interaction.message.edit({ embeds: [newEmbed] });
            }
        } else if (interaction.isButton()) {
            const data = interaction.customId.split("-");
            if (data[0] == "12") {
                let res = await pollModel
                    .findOne({
                        messageId: interaction.message.id,
                        serverId: interaction.guild.id,
                    })
                    .catch((e) => {
                        if (e) {
                            const err = new EmbedBuilder()
                                .setColor("Orange")
                                .setDescription("An error occured when trying to end this poll. Please try again later.");
                            return interaction.reply({ embeds: [err] });
                        }
                    });
                if (interaction.member.permissions.has(PermissionFlagsBits.ManageMessages) || interaction.user.id == res.creator) {
                    let newEmbed = new EmbedBuilder()
                        .setTitle("Multiple Choice Poll (ended)")
                        .setDescription(res.content.question)
                        .setColor("Orange");

                    let votes = [0, 0, 0, 0];
                    let users: any = ["", "", "", ""];
                    for (const response in res.responses) {
                        for (const vote in res.responses[response].answers) {
                            votes[parseInt(res.responses[response].answers[vote])]++;
                            users[parseInt(res.responses[response].answers[vote])] =
                                users[parseInt(res.responses[response].answers[vote])] + `<@${res.responses[response].userId}> `;
                        }
                    }
                    users = users == "" ? (users = "no responses") : (users = users);
                    for (const answer in res.content.answers) {
                        if (res.anonymous == true) {
                            newEmbed.addFields({
                                name: `Answer #${parseInt(answer) + 1}`,
                                value: `${res.content.answers[answer]}`,
                            });
                            newEmbed.addFields({ name: `Responses:`, value: `${votes[answer]}` });
                        } else {
                            newEmbed.addFields({
                                name: `Answer #${parseInt(answer) + 1}`,
                                value: `${res.content.answers[answer]}`,
                            });
                            newEmbed.addFields({
                                name: `Responses: (${votes[answer]}):`,
                                value: `Users: ${users[answer].slice(0, 1000)}`,
                            });
                        }
                    }
                    await interaction.message.edit({
                        embeds: [newEmbed],
                        components: [],
                    });
                    await pollModel
                        .deleteOne({
                            messageId: interaction.message.id,
                            serverId: interaction.guild.id,
                        })
                        .catch((e) => {
                            if (e) {
                                const err = new EmbedBuilder()
                                    .setColor("Orange")
                                    .setDescription("An error occured when trying to end this poll. Please try again later.");
                                return interaction.reply({ embeds: [err] });
                            }
                        });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor("Orange")
                        .setDescription(
                            "Sorry, You do not have permission to end this poll. Only the poll creator and those with the permission: MANAGE_MESSSAGES can end this poll."
                        );
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            } else if (data[0] == "13") {
                const modal = new ModalBuilder().setCustomId(`15-${data[1]}-${data[2]}`).setTitle("Survey Response");

                let answer = new TextInputBuilder()
                    .setCustomId("answer")
                    .setStyle(TextInputStyle.Paragraph)
                    .setPlaceholder("Please enter a response")
                    .setMaxLength(4000)
                    .setRequired(true);

                if (data[2]) {
                    answer.setLabel("Response (anonymous)");
                } else {
                    answer.setLabel("Response");
                }

                const row = new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(answer);
                modal.addComponents(row);
                await interaction.showModal(modal);
            } else if (data[0] == "14") {
                if (interaction.user.id == data[2] || interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                    const embed = new EmbedBuilder()
                        .setColor("Orange")
                        .setTitle("Free Resposne Survey (ended):")
                        .setDescription(interaction.message.embeds[0].description);
                    interaction.message.edit({
                        embeds: [embed],
                        components: [],
                    });
                    const thread = await interaction.channel.threads.cache.find((t) => t.id == data[1]);
                    await thread.setArchived(true);
                } else {
                    const embed = new EmbedBuilder()
                        .setColor("Orange")
                        .setDescription(
                            "Sorry, You do not have permission to end this poll. Only the poll creator and those with the permission: MANAGE_MESSSAGES can end this poll."
                        );
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
        }
    },
};
