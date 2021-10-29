const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.content.toLowerCase().includes("i want to join programming")) {
      const Reply = new MessageEmbed()
        .setColor("DARK_RED")
        .setTitle(`you cant say that here :/ `)
        .setDescription(`Shame on you <@${message.author.id}>`);
      return message.reply({ embeds: [Reply] });
    }
    if (
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programmlng") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("pr0gramming") ||
      message.content.replace(/\s/g, '').includes("ƿɌØƓɌѦϻϻЇℵƓ") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("ƿrogramming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") ||
      message.content.toLowerCase().replace(/\s/g, '').includes("programming") 
    ) {
      const programming = new MessageEmbed()
        .setColor("RED")
        .setDescription("programming is bad!");
      return message.channel.send({ embeds: [programming] });
    }
    if (message.content.toLowerCase().replace(/\s/g, '').includes("cult")) {
      console.log("here");
      return message.delete();
    }
    /**if(message.author.id === '245626574655848449') {
            const embed = new MessageEmbed()
                .setTitle('don\'t know how you evade the programming response so I have to do this now:')
                .setDescription('Programming Is bad!')
                .setColor('DARK_RED');

            message.channel.send({ embeds: [embed] });
        } */
  },
};
