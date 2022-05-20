const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        data = interaction.customId.split("-");
        if (data[0] == "10") {
            const isPoll = data[1];
            const isAnonymous =
                data[2] == "false" || data[2] == "null" ? false : true;
            if (isPoll) {
                const question = interaction.fields.getTextInputValue("question");
                const answer1 = interaction.fields.getTextInputValue("answer1");
                const answer2 = interaction.fields.getTextInputValue("answer2");
                const answer3 = interaction.fields.getTextInputValue("answer3");
                const answer4 = interaction.fields.getTextInputValue("answer4");

                let answers = [ answer1, answer2];
                if (answer3 != '') answers.push(answer3);
                if (answer4 != '') answers.push(answer4);

                let options = [];

                let embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Multiple Choice Poll')
                    .setDescription(question);
                
                for (answer in answers) {
                    embed.addField(`Answer #${answer}:`,`${answers[answer]}`)
                    options.push({
                        label: `Answer ${answer}:`,
                        value: `${answer}`,
                        description: `${answers[answer].slice(0,100)}`,
                    })
                }

                let row = new MessageActionRow()
                    .addComponents(
                        new MessageSelectMenu()
                        .setCustomId('11')
                        .setPlaceholder("No Choice Selected")
                        .addOptions(options)
                    )

                interaction.reply({ embeds: [embed], components: [row] });

            }
        }
    },
};
