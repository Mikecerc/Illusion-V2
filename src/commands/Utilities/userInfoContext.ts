import { ApplicationCommandType, ContextMenuCommandBuilder, EmbedBuilder } from "discord.js";
import moment from "moment";
export default {
    data: new ContextMenuCommandBuilder().setName("Get Info").setDMPermission(false).setType(ApplicationCommandType.User),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});
        const Target = interaction.targetMember;
        let Response = new EmbedBuilder()
            .setAuthor({
                name: `${Target.user.username}`,
                iconURL: Target.user.displayAvatarURL({ dynamic: true }),
            })
            .setThumbnail(Target.user.displayAvatarURL({ dynamic: true }))
            .setColor("Orange")
            .addFields({
                name: "UserID",
                value: `${Target.user.id}`,
                inline: false,
            });

        if (
            Target.roles.cache
                .map((r: any) => r)
                .join(" ")
                .replace("@everyone", " ") != " "
        ) {
            Response.addFields({
                name: "Roles",
                value: `${Target.roles.cache
                    .map((r: any) => r)
                    .join(" ")
                    .replace("@everyone", " ")}`,
            });
        } else {
            Response.addFields({
                name: "Roles",
                value: `No Roles`,
            });
        }
        Response.addFields(
            {
                name: "Server Member Since",
                value: `${moment(Target.joinedAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-** ${moment(Target.joinedAt)
                    .startOf("day")
                    .fromNow()}`,
            },
            {
                name: "Discord User Since",
                value: `${moment(Target.user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}\n**-** ${moment(Target.user.createdAt)
                    .startOf("day")
                    .fromNow()}`,
            }
        ).setFooter({ text: `Requested By ${interaction.user.tag}` });
        interaction.followUp({ embeds: [Response] });
    },
};
