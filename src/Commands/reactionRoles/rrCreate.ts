import {
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    Permissions,
} from "discord.js";
export default {
    name: "reactionrole",
    description: "create a reaction role",
    options: [
        {
            name: "messageid",
            description:
                "message id of the message you want to add reactions to",
            required: true,
            type: "STRING",
        },
        {
            name: "role",
            description: "The role you would like to be assinged",
            required: true,
            type: "ROLE",
        },
    ],
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        if (
            !interaction.member.permissions.has(
                Permissions.FLAGS.MANAGE_GUILD
            )
        ) {
            return interaction.update({
                content: "You cannot use this command! You are missing the permission MANAGE_GUILD",
                embeds: [],
                components: [],
                ephemeral: true,
            });
        }
        const messageId = interaction.options.getString("messageid");
        const role = interaction.options.getRole("role");
        const bot = await interaction.guild.members.fetch(client.user.id);

        if (!bot.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
            return interaction.followUp({
                content: "bot missing permission MANAGE_ROLES",
            });
        }
        if (!bot.permissions.has(Permissions.FLAGS.ADD_REACTIONS)) {
            return interaction.followUp({
                content: "bot missing permission ADD_REACTIONS",
            });
        }
        if (!role.editable) {
            return interaction.followUp({
                content:
                    "Bot cannot edit role. Try placing the bot higher than the role you want to give in the role hierarchy list",
            });
        }
        const channels = interaction.guild.channels.cache.map(
            (channel: { id: number; }) => channel.id
        );
        let channelId: number;
        for (const id of channels) {
            const channel = await interaction.guild.channels.fetch(id);
            if (channel.type != "GUILD_TEXT") continue;
            try {
                const msg = await channel.messages.fetch(messageId);
                if (msg) {
                    channelId = channel.id;
                    break;
                }
            } catch (e) {}
        }
        if (!channelId) {
            return interaction.followUp({
                content: "this message does not exist",
                ephemeral: true,
            });
        }

        const reactionCollectMsg = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(
                "Please react to this embed within the next 60 seconds with the emoji you would like to use for this reaction role."
            );

        const collectMsg = await interaction.followUp({
            embeds: [reactionCollectMsg],
            ephemeral: true,
        });

        let emoji: { identifier: string; };

        const filter = (_reaction: any, user: { id: number; }) => {
            return (user.id = interaction.user.id);
        };
        await collectMsg
            .awaitReactions({ filter, max: 1, time: 60000, error: ["time"] })
            .then((collected: { first: () => { (): any; new(): any; emoji: { identifier: string; }; }; }) => {
                emoji = collected.first().emoji;
            })

            .catch((_err: any) => {
                return interaction.followUp({
                    content: "did not respond in time",
                    ephemeral: true,
                });
            });
        const conformationButton = new MessageEmbed()
            .setTitle("Review Info:")
            .setColor("RANDOM")
            .addFields(
                {
                    name: "Message ID:",
                    value: messageId,
                },
                {
                    name: "Role:",
                    value: `${role}`,
                },
                {
                    name: "Emoji",
                    value: `${emoji}`,
                }
            )
            .setFooter({
                text: "click accept to accept and cancel to cancel.",
            });

        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId(
                    `30-${messageId}-${channelId}-${role.id}-${emoji.identifier}`
                )
                .setLabel("Accept")
                .setStyle("SUCCESS"),
            new MessageButton()
                .setCustomId(
                    `31-${messageId}-${channelId}-${role.id}-${emoji.identifier}`
                )
                .setLabel("Cancel")
                .setStyle("DANGER")
        );
        await collectMsg.edit({
            embeds: [conformationButton],
            components: [button],
            ephemeral: true,
        });
        collectMsg.reactions.removeAll();
    },
};
