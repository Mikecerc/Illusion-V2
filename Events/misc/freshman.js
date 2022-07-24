import { MessageEmbed } from "discord.js";
import fs from 'fs';
export default {
  name: "messageCreate",
  execute(message) {
    /**if (message.author.id != "406629388059410434") return;
    let content = message.content.toLowerCase().replace(/\s/g, "");
    fs.readFile("./json/triggerWords.json", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let bool = testWords(JSON.parse(data), content);
        if (bool == true) {
          const Response = new MessageEmbed()
            .setColor("RED")
            .setDescription(
              "<@406629388059410434> stop acting like a freshman"
            );
          message.reply({ embeds: [Response] });
        }
      }
    });
    function testWords(data, content) {
        let iteration = 0;
        for(const words in data) {
            if (content.includes(data[iteration])) {
                return true;
            }
            iteration++; 
        }
    }*/
  },
};
