const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const fs = require("fs");
module.exports = {
  name: "messageCreate",
  execute(message) {
    if (message.author.id != "406629388059410434") return;
    let content = message.content.toLowerCase().replace(/\s/g, "");
    fs.readFile("./json/triggerWords.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let bool = testWords(JSON.parse(data), content);
        if (bool == true) {
          const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId(`kylethinksaboutwhathesays-y-${message.id}`)
              .setLabel("Yes")
              .setStyle('DANGER'),
            new MessageButton()
              .setCustomId(`kylethinksaboutwhathesays-n-${message.id}`)
              .setLabel("No")
              .setStyle('PRIMARY'),
          );

          message.reply({ content: "kyle, this is a not okay message are you sure you want to send?", components: [row] })
        }
      }
    });
    function testWords(data, content) {
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
