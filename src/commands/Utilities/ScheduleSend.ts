import { EmbedBuilder, SlashCommandBuilder, Channel, PermissionFlagsBits } from "discord.js";
import moment from "moment";
export default {
    data: new SlashCommandBuilder()
        .setName("schedule-send")
        .setDescription("Send a message in a channel at a certain time (EST)")
        .addStringOption((option) =>
            option.setName("type").setDescription("The type of message that will be sent").setRequired(true).addChoices(
                {
                    name: "Text",
                    value: "0",
                },
                {
                    name: "embed",
                    value: "1",
                }
            )
        )
        .addStringOption((option) => option.setName("day").setDescription("date in mm/dd/yyyy").setRequired(true))
        .addStringOption((option) => option.setName("time").setDescription("time in hh:mm").setRequired(true))
        .addChannelOption((option) => option.setName("channel").setDescription("channel to post in").setRequired(true))
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    async execute(interaction) {
        await interaction.deferReply();

        const time = interaction.options.getString("time");
        const date = interaction.options.getString("day");
        const channel = interaction.options.getChannel("channel");

        if (!checkChannelPermissions(interaction.member, interaction.channel))
            interaction.followUp({
                embeds: [new EmbedBuilder().setDescription("You do not have permission to send messages in this channel").setColor("Red")],
            });
        if (!checkValidTime(time))
            interaction.followUp({ embeds: [new EmbedBuilder().setDescription("Invalid time format").setColor("Red")] });
        if (!checkValidDate(date))
            interaction.followUp({ embeds: [new EmbedBuilder().setDescription("Invalid date format").setColor("Red")] });

        interaction.followUp({ embeds: [new EmbedBuilder().setDescription("Message scheduled").setColor("Green")] });
    },
};

function checkValidTime(time: string): boolean {
    return moment(time, "MM/DD/YYYY", true).isValid();
}

function checkValidDate(date: string): boolean {
    return moment(date, "HH:mm", true).isValid();
}
function checkChannelPermissions(user, channel): boolean {
    return channel.permissionsFor(user).has(PermissionFlagsBits.SendMessages);
}
