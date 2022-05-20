const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const pollModel = require('../schemas/pollSchema.js')
module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (interaction.isModalSubmit()) {
            data = interaction.customId.split("-");
            if (data[0] == "10") {
                const isPoll = data[1];
                const isAnonymous =
                    data[2] == "false" || data[2] == "null" ? false : true;
                const multipleResponse = data[3] == 'false' || data[3] == 'null' ? false: true; 
                if (isPoll) {
                    const question = interaction.fields.getTextInputValue("question");
                    const answer1 = interaction.fields.getTextInputValue("answer1");
                    const answer2 = interaction.fields.getTextInputValue("answer2");
                    const answer3 = interaction.fields.getTextInputValue("answer3");
                    const answer4 = interaction.fields.getTextInputValue("answer4");

                    let options = [];
                    let answers = [answer1, answer2];
                    if (answer3 != '') answers.push(answer3);
                    if (answer4 != '') answers.push(answer4);

                    let embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('Multiple Choice Poll')
                        .setDescription(question);

                    for (answer in answers) {
                        embed.addField(`Answer #${answer}:`, `${answers[answer]}`)
                        options.push({
                            label: `Answer ${answer}:`,
                            value: `${answer}`,
                            description: `${answers[answer].slice(0, 100)}`,
                        })
                    }

                    let row = new MessageActionRow()
                        .addComponents(
                            new MessageSelectMenu()
                                .setCustomId('11')
                                .setPlaceholder("No Choice Selected")
                                .addOptions(options)
                        )

                    let message = await interaction.reply({ embeds: [embed], components: [row] });

                    doc = new pollModel()
                    doc.messageId = message.id;
                    doc.anonymous = isAnonymous;
                    doc.creator = interaction.author.id;
                    doc.content.question = question;
                    doc.content.answers = answers;
                    doc.multipleResponse = multipleResponse; 
                    doc.save();
                }
            }
        } else if (interaction.isSelectMenu()){
            if (data == interaction.customId == '11') {
                let res = await pollModel.findOne({ messageId: interaction.message.id })
                
            }
        }
    },
};
