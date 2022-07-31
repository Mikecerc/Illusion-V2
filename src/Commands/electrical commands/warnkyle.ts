import { MessageEmbed } from "discord.js";
export default {
    name: "warnkylie",
    description: "warn kyle for acting like a freshman",
    async execute(interaction: any) {
        const embed = new MessageEmbed()
            .setColor("RED")
            .setDescription(
                "<@406629388059410434> stop acting like a freshman"
            );

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
                    const msg = messages
                        .filter((m) => m.author.id === "406629388059410434")
                        .first();
                    if (msg == undefined) {
                        return interaction.reply(
                            "kylie hasn't said anything in a while"
                        );
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
