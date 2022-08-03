import {
    ActionRowBuilder,
    ModalBuilder,
    TextInputBuilder,
    SlashCommandBuilder,
    TextInputStyle,
    ModalActionRowComponentBuilder,
} from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("survey")
        .setDescription("create a survey here")
        .setDMPermission(false)
        .addStringOption((o) =>
            o
                .setName("type")
                .setDescription("Multiple choice poll or Free-Response Survey")
                .setRequired(true)
                .setChoices(
                    {
                        name: "Poll",
                        value: "true",
                    },
                    {
                        name: "Survey",
                        value: "false",
                    }
                )
        )
        .addBooleanOption((o) =>
            o
                .setName("anonymity")
                .setDescription(
                    "Do you want the results of this poll or survey to be shared anonymously?"
                )
                .setRequired(false)
        )
        .addStringOption((o) =>
            o
                .setName("response")
                .setDescription(
                    "Do you want users to be able to respond to multiple answers (polls only)"
                )
                .setRequired(false)
                .setChoices(
                    {
                        name: "single response",
                        value: "false",
                    },
                    {
                        name: "multiple response",
                        value: "true",
                    }
                )
        ),
    async execute(interaction: any) {
        if (interaction.options.getString("type") == "true") {
            const modal = new ModalBuilder()
                .setCustomId(
                    `10-${interaction.options.getString(
                        "type"
                    )}-${interaction.options.getBoolean(
                        "anonymity"
                    )}-${interaction.options.getString("response")}`
                )
                .setTitle("Poll Setup");

            const question = new TextInputBuilder()
                .setCustomId("question")
                .setLabel("Question:")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("Please enter a question")
                .setRequired(true)
                .setMaxLength(4000);

            const answer1 = new TextInputBuilder()
                .setCustomId("answer1")
                .setLabel("Answer #1:")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(true);

            const answer2 = new TextInputBuilder()
                .setCustomId("answer2")
                .setLabel("Answer #2:")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(true);

            const answer3 = new TextInputBuilder()
                .setCustomId("answer3")
                .setLabel("Answer #3:")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(false);

            const answer4 = new TextInputBuilder()
                .setCustomId("answer4")
                .setLabel("Answer #4:")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("Please enter a possible answer")
                .setMaxLength(1024)
                .setRequired(false);

            const row1 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    question
                );
            const row2 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    answer1
                );
            const row3 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    answer2
                );
            const row4 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    answer3
                );
            const row5 =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    answer4
                );

            modal.addComponents(row1, row2, row3, row4, row5);
            await interaction.showModal(modal);
        } else {
            const modal = new ModalBuilder()
                .setCustomId(
                    `10-${interaction.options.getString(
                        "type"
                    )}-${interaction.options.getBoolean("anonymity")}`
                )
                .setTitle("Survey Setup");

            const question = new TextInputBuilder()
                .setCustomId("question")
                .setLabel("Question:")
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder("Please enter a question")
                .setRequired(true)
                .setMaxLength(4000);

            const row =
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    question
                );

            modal.addComponents(row);
            await interaction.showModal(modal);
        }
    },
};
