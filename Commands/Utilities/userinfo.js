const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "dox",
    description: "Gets a users info and avatar",
    options: [
        {
            name: "target",
            description: "Select a target",
            type: "USER",
            required: true,
        },
    ],

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const Target = interaction.options.getMember("target");
        let Response = new MessageEmbed()
            .setAuthor({
                name: `${Target.user.username}`,
                iconURL: Target.user.displayAvatarURL({ dynamic: true }),
            })
            .setThumbnail(Target.user.displayAvatarURL({ dynamic: true }))
            .setColor("RANDOM")
            .addField("UserID", `${Target.user.id}`, false);

        if (
            Target.roles.cache
                .map((r) => r)
                .join(" ")
                .replace("@everyone", " ") != " "
        ) {
            Response.addField(
                "Roles",
                `${Target.roles.cache
                    .map((r) => r)
                    .join(" ")
                    .replace("@everyone", " ")}`
            );
        } else {
            Response.addField(
                "Roles",
                `No Roles`
            );
        }
        Response.addField(
            "Server Member Since",
            `${moment(Target.joinedAt).format(
                "MMMM Do YYYY, h:mm:ss a"
            )}\n**-** ${moment(Target.joinedAt).startOf("day").fromNow()}`
        )
            .addField(
                "Discord User Since",
                `${moment(Target.user.createdAt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                )}\n**-** ${moment(Target.user.createdAt)
                    .startOf("day")
                    .fromNow()}`
            )
            .setFooter({ text: `Requested By ${interaction.user.tag}` });
        interaction.followUp({ embeds: [Response] });
    },
};
