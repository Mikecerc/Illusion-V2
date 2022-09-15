import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    EmbedBuilder,
    PermissionFlagsBits,
    SlashCommandBuilder,
} from "discord.js";
export default {
    data: new SlashCommandBuilder()
        .setName("rr")
        .setDescription("create a reaction role")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild & PermissionFlagsBits.ManageRoles)
        .addStringOption((o) =>
            o.setName("messageid").setDescription("message id of the message you want to add reactions to").setRequired(true)
        )
        .addRoleOption((o) => o.setName("role").setDescription("The role you would like to be assinged").setRequired(true)),
    async execute(interaction: any, client: any) {
        await interaction.deferReply();
        const messageId = interaction.options.getString("messageid");
        const role = interaction.options.getRole("role");
        const bot = await interaction.guild.members.fetch(client.user.id);

        if (!bot.permissions.has(PermissionFlagsBits.ManageRoles)) {
            return interaction.followUp({
                content: "bot missing permission MANAGE_ROLES",
            });
        }
        if (!bot.permissions.has(PermissionFlagsBits.AddReactions)) {
            return interaction.followUp({
                content: "bot missing permission ADD_REACTIONS",
            });
        }
        if (!role.editable) {
            return interaction.followUp({
                content: "Bot cannot edit role. Try placing the bot higher than the role you want to give in the role hierarchy list",
            });
        }
        const channels = interaction.guild.channels.cache.map((channel: { id: number }) => channel.id);
        let channelId: number;
        for (const id of channels) {
            const channel = await interaction.guild.channels.fetch(id);
            if (channel.type != ChannelType.GuildText) continue;
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

        const reactionCollectMsg = new EmbedBuilder()
            .setColor("Orange")
            .setDescription(
                "Please react to this embed within the next 60 seconds with the emoji you would like to use for this reaction role."
            );

        const collectMsg = await interaction.followUp({
            embeds: [reactionCollectMsg],
            ephemeral: true,
        });

        let emoji: { identifier: string };

        const filter = (_reaction: any, user: { id: number }) => {
            return (user.id = interaction.user.id);
        };
        await collectMsg
            .awaitReactions({ filter, max: 1, time: 60000, error: ["time"] })
            .then((collected: { first: () => { (): any; new (): any; emoji: { identifier: string } } }) => {
                emoji = collected.first().emoji;
            })

            .catch((_err: any) => {
                return interaction.followUp({
                    content: "did not respond in time",
                    ephemeral: true,
                });
            });
        const conformationButton = new EmbedBuilder()
            .setTitle("Review Info:")
            .setColor("Orange")
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

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`30-${messageId}-${channelId}-${role.id}-${emoji.identifier}`)
                .setLabel("Accept")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId(`31-${messageId}-${channelId}-${role.id}-${emoji.identifier}`)
                .setLabel("Cancel")
                .setStyle(ButtonStyle.Danger)
        );
        await collectMsg.edit({
            embeds: [conformationButton],
            components: [button],
            ephemeral: true,
        });
        collectMsg.reactions.removeAll();
    },
};
