import rrModel from "../../schemas/reactionRoleSchema.js";
import {
    MessageEmbed,
    MessageActionRow,
    MessageButton,
    Permissions,
} from "discord.js";
export default {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isButton()) return;
        const data = interaction.customId.split("-");
        const messageId = data[1];
        const channelId = data[2];
        const role = await interaction.guild.roles.cache.find(
            (r) => r.id === data[3]
        );
        const emojiName = data[4];
        if (data[0] == "31") {
            if (
                !interaction.member.permissions.has(
                    Permissions.FLAGS.MANAGE_GUILD
                )
            ) {
                return interaction.update({
                    content: "You cannot respond to this!",
                    embeds: [],
                    components: [],
                    ephemeral: true,
                });
            }
            return await interaction.update({
                content: "canceled",
                embeds: [],
                components: [],
                ephemeral: true,
            });
        }
        const success = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
                "The reaction role has been saved. To delete the reaction role, remove the message of the reaction role or remove the bots reaction to it."
            );
        if (data[0] == "30") {
            if (
                !interaction.member.permissions.has(
                    Permissions.FLAGS.MANAGE_GUILD
                )
            ) {
                return interaction.update({
                    content: "You cannot respond to this!",
                    embeds: [],
                    components: [],
                    ephemeral: true,
                });
            }
            let res = await rrModel.findOne({
                guildId: interaction.guild.id,
                messageId: messageId,
                channelId: channelId,
            });
            if (!res) {
                try {
                    const channel = await interaction.guild.channels.fetch(
                        channelId
                    );
                    const msg = await channel.messages.fetch(messageId);
                    const doc = new rrModel();
                    doc.guildId = interaction.guild.id;
                    doc.messageId = msg.id;
                    doc.channelId = channel.id;
                    doc.reactions = [
                        {
                            reactionRole: {
                                emoji: emojiName,
                                role: role.id,
                            },
                        },
                    ];
                    doc.multiRole = false;
                    doc.save();
                    msg.react(emojiName);
                    return interaction.update({
                        embeds: [success],
                        components: [],
                        ephemeral: true,
                    });
                } catch (e) {
                    return interaction.update({
                        content: "there was an error",
                        embeds: [],
                        components: [],
                    });
                }
            } else {
                const multiEmbed = new MessageEmbed()
                    .setColor("RANDOM")
                    .setDescription(
                        "It seems there are other reaction roles on this message. Would you like the bot to only allow users to pick one or do you want the bot to allow users to react multiple times"
                    )
                    .setFooter({ text: "Please select yes or no" });
                const buttons = new MessageActionRow().addComponents(
                    new MessageButton()
                        .setCustomId(
                            `32-${messageId}-${channelId}-${role.id}-${emojiName}`
                        )
                        .setLabel("Yes")
                        .setStyle("SUCCESS"),
                    new MessageButton()
                        .setCustomId(
                            `33${messageId}-${channelId}-${role.id}-${emojiName}`
                        )
                        .setLabel("No")
                        .setStyle("DANGER")
                );
                try {
                    return await interaction.update({
                        embeds: [multiEmbed],
                        components: [buttons],
                        ephemeral: true,
                    });
                } catch (e) {}
            }
        } else if (data[0] == "32" || data[0] == "33") {
            const res = await rrModel.findOne({
                guildId: interaction.guild.id,
                messageId: messageId,
                channelId: channelId,
            });
            for (const rr of res.reactions) {
                if (rr.reactionRole.emoji != emojiName) continue;
                return interaction.update({
                    content:
                        "There was an error! The emoji you want to use is already assigned to a reaction role on this message",
                    embeds: [],
                    components: [],
                    ephemeral: true,
                });
            }
            try {
                res.reactions.push({
                    reactionRole: {
                        emoji: emojiName,
                        role: role.id,
                    },
                });
                if (data[0] == "33") {
                    res.multiRole = true;
                }
                await res.save();
            } catch (e) {
                return interaction.update({
                    content: "There was an error! Please try again later",
                    embeds: [],
                    components: [],
                    ephemeral: true,
                });
            }
            const bot = await interaction.guild.members.fetch(client.user.id);

            if (!bot.permissions.has(Permissions.FLAGS.MANAGE_ROLES)) {
                return interaction.update({
                    content: "bot missing permission MANAGE_ROLES",
                    ephemeral: true,
                });
            }
            if (!bot.permissions.has(Permissions.FLAGS.ADD_REACTIONS)) {
                return interaction.update({
                    content: "bot missing permission ADD_REACTIONS",
                    ephemeral: true,
                });
            }
            if (!role.editable) {
                return interaction.update({
                    content:
                        "Bot cannot edit role. Try placing the bot higher than the role you want to give in the role hierarchy list",
                    ephemeral: true,
                });
            }
            try {
                const channel = await interaction.guild.channels.fetch(
                    channelId
                );
                const msg = await channel.messages.fetch(messageId);
                msg.react(emojiName);
                return interaction.update({
                    embeds: [success],
                    components: [],
                    ephemeral: true,
                });
            } catch (e) {
                return interaction.update({
                    content:
                        "There was an error! Please make sure the bot has all necessary permissions!",
                    embeds: [],
                    components: [],
                    ephemeral: true,
                });
            }
        }
    },
};
