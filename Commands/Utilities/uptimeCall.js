import { MessageEmbed } from "discord.js";
export default {
  name: "uptime",
  description: "Display's the amount of time Void has been online",
  execute(interaction) {
    let seconds = process.uptime();
    var d = Math.floor(seconds / (3600*24));
    var h = Math.floor(seconds % (3600*24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var d0 = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var h0 = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var m0 = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var s0 = s > 0 ? s + (s == 1 ? " second" : " seconds") : ""; 

    let embed = new MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Uptime:')
    .setDescription(d0 + h0 + m0 + s0);

    interaction.reply({ embeds: [embed] });
  },
};
