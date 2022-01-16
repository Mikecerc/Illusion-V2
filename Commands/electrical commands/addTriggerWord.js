const fs = require("fs");
module.exports = {
  name: "addtrigger",
  description:
    "A command for people with the polls/survey role that allows them to add a trigger to kyle's trigger list",
  options: [
    {
      name: "word",
      description: "what word do you want to add?",
      required: true,
      type: "STRING",
    },
  ],
  async execute(interaction) {
    let response = interaction.options.getString("word");
    const noPerms = new MessageEmbed()
      .setTitle("Error!")
      .setDescription("Oh no! you dont have permissions to use this command.")
      .setColor("RED");

    const canInitPoll = interaction.member.roles.cache.some(
      (r) => r.name === "Polls/surveys"
    );
    if (canInitPoll != true) return;
    fs.readFile("../../json/triggerWords.json", "utf-8", (err, data0) => {
      if (err) {
        console.log(err);
      } else {
        let data = JSON.parse(data0);
        data.push(word);
        fs.writeFile(
          "../../json/triggerWords.json",
          JSON.stringify(data),
          (err) => {
            if (err) console.log(err);
          }
        );
      }
    });
  },
};
