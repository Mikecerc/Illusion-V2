const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.id != "406629388059410434") return;
    let content = message.content.toLowerCase().replace(/\s/g, "");
    fs.readFile("../json/triggerwords.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (testWords(JSON.parse(data), content) == true) {
          const Response = new MessageEmbed()
            .setColor("RED")
            .setDescription(
              "<@406629388059410434> stop acting like a freshman"
            );
          message.reply({ embeds: [Response] });
        }
      }
    });
    async function testWords(data, content) {
        let iteration = 0;
        for(let words in data) {
            if (content.includes(data[iteration])) {
                return true;
            }
            iteration++; 
        }
    }
  },
};
