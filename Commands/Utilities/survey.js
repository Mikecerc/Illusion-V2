const {
    MessageActionRow,
    Modal,
    TextInputComponent,
} = require("discord.js");
module.exports = {
    name: "survey",
    description: "respond to or create a survey here",
    options: [
        {
            name: "type",
            description: "Multiple choice poll or Free-Response Survey",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "Poll",
                    value: "true",
                },
                {
                    name: "Survey",
                    value: "false",
                },
            ],
        },
        {
            name: "anonymity",
            description:
                "Do you want the results of this poll or survey to be publically shared?",
            required: false,
            type: "BOOLEAN",
        },
        {
            name: "response",
            description:
                "Do you want users to be able to respond to multiple answers (polls only)",
            required: false,
            type: "STRING",
            choices: [
                {
                    name: "single response",
                    value: "false",
                },
                {
                    name: "multiple response",
                    value: "true",
                },
            ],
        },
    ],

    async execute(interaction) {
        if (interaction.options.getString("type") == "true") {
            const modal = new Modal()
                .setCustomId(
                    `10-${interaction.options.getString(
                        "type"
                    )}-${interaction.options.getBoolean(
                        "anonymity"
                    )}-${interaction.options.getString("response")}`
                )
                .setTitle("Poll Setup");

            const question = new TextInputComponent()
                .setCustomId("question")
                .setLabel("Question:")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Please enter a question")
                .setRequired(true)
                .setMaxLength(4000);

            const answer1 = new TextInputComponent()
                .setCustomId("answer1")
                .setLabel("Answer #1:")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(true);

            const answer2 = new TextInputComponent()
                .setCustomId("answer2")
                .setLabel("Answer #2:")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(true);

            const answer3 = new TextInputComponent()
                .setCustomId("answer3")
                .setLabel("Answer #3:")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(false);

            const answer4 = new TextInputComponent()
                .setCustomId("answer4")
                .setLabel("Answer #4:")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(false);

            const row1 = new MessageActionRow().addComponents(question);
            const row2 = new MessageActionRow().addComponents(answer1);
            const row3 = new MessageActionRow().addComponents(answer2);
            const row4 = new MessageActionRow().addComponents(answer3);
            const row5 = new MessageActionRow().addComponents(answer4);

            modal.addComponents(row1, row2, row3, row4, row5);
            await interaction.showModal(modal);
        } else {
            const modal = new Modal()
                .setCustomId(
                    `10-${interaction.options.getString(
                        "type"
                    )}-${interaction.options.getBoolean("anonymity")}`
                )
                .setTitle("Survey Setup");

            const question = new TextInputComponent()
                .setCustomId("question")
                .setLabel("Question:")
                .setStyle("PARAGRAPH")
                .setPlaceholder("Please enter a question")
                .setRequired(true)
                .setMaxLength(4000);

            const row = new MessageActionRow().addComponents(question);

            modal.addComponents(row);
            await interaction.showModal(modal);
        }
    },
};
