const fs = require("fs");
module.exports = {
  name: "addtrigger",
  description:
    "Add a trigger to kyle's trigger list",
  options: [
    {
      name: "word",
      description: "what word do you want to add?",
      type: "STRING",
      required: true,
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
    if (canInitPoll != true) return interaction.followUp({ embeds: [noPerms] });
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
        interaction.followUp('done');
      }
    });
  },
};
