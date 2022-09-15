import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
export default {
    data: new SlashCommandBuilder().setName("warnkylie").setDescription("warn kyle for acting like a freshman"),
    async execute(interaction: any) {
        const embed = new EmbedBuilder().setColor("Orange").setDescription("<@406629388059410434> stop acting like a freshman");

        const messages = await interaction.channel.messages
            .fetch({ limit: 100 })
            .catch((err: any) => {})
            .then(
                (messages: {
                    filter: (arg0: (m: any) => boolean) => {
                        (): any;
                        new (): any;
                        first: { (): any; new (): any };
                    };
                }) => {
                    //filter latest 100 messages in a channel for first message sent by kyle
                    const msg = messages.filter((m) => m.author.id === "406629388059410434").first();
                    // if there is no message within 100 messages in a channel, an error will return, otherwise, the warning embed will be sent
                    if (msg == undefined) {
                        return interaction.reply("kylie hasn't said anything in a while");
                    } else {
                        interaction.reply({
                            content: "ok...",
                            ephemeral: true,
                        });
                        return msg.reply({ embeds: [embed] });
                    }
                }
            );
    },
};
