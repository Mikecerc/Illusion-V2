/* eslint-disable no-unused-vars */
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");
const fs = require("fs");
let pollChannelSend;
let answer1;
let answer2;
let answer3;
let answer4;
let answer5;
let answer6;
let answer7;
let answer8;
let answer9;
let answer10;
let surveyTitle;
let surveyQuestion;

module.exports = {
  name: "poll",
  description: "manage multiple choice polls",
  options: [
    {
      name: "create",
      description: "Creates a multiple choice poll",
      type: "SUB_COMMAND",
      options: [
        {
          name: "title",
          description: "sets the title of the poll",
          type: "STRING",
          required: true,
        },
        {
          name: "question",
          description: "What is the question you would like to ask?",
          type: "STRING",
          required: true,
        },
        {
          name: "answer1",
          description: "answer1",
          type: "STRING",
          required: false,
        },
        {
          name: "answer2",
          description: "answer2",
          type: "STRING",
          required: false,
        },
        {
          name: "answer3",
          description: "answer3",
          type: "STRING",
          required: false,
        },
        {
          name: "answer4",
          description: "answer4",
          type: "STRING",
          required: false,
        },
        {
          name: "answer5",
          description: "answer5",
          type: "STRING",
          required: false,
        },
        {
          name: "answer6",
          description: "answer6",
          type: "STRING",
          required: false,
        },
        {
          name: "answer7",
          description: "answer7",
          type: "STRING",
          required: false,
        },
        {
          name: "answer8",
          description: "answer8",
          type: "STRING",
          required: false,
        },
        {
          name: "answer9",
          description: "answer9",
          type: "STRING",
          required: false,
        },
        {
          name: "answer10",
          description: "answer10",
          type: "STRING",
          required: false,
        },
        {
          name: "polllocation",
          description: "What channel would you like to send the poll in?",
          type: "CHANNEL",
          required: false,
        },
        {
          name: "role1",
          description: "role1",
          type: "ROLE",
          required: false,
        },
        {
          name: "role2",
          description: "role2",
          type: "ROLE",
          required: false,
        },
        {
          name: "role3",
          description: "role3",
          type: "ROLE",
          required: false,
        },
        {
          name: "role4",
          description: "role4",
          type: "ROLE",
          required: false,
        },
        {
          name: "role5",
          description: "role5",
          type: "ROLE",
          required: false,
        },
      ],
    },
    {
      name: "end",
      description: "ends a poll of choice",
      type: "SUB_COMMAND",
    },
    {
      name: "displayresults",
      description: "displays the results of an ended poll of choice",
      type: "SUB_COMMAND",
      options: [
        {
          name: "resultschannel",
          description: "the channel you would like to display the results in",
          type: "CHANNEL",
          required: false,
        },
        {
          name: "ephemeralresults",
          description: "makes the results of the poll only viewable by you.",
          type: "BOOLEAN",
          required: false,
        },
      ],
    },
  ],

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true }).catch(() => {});

    const pollLocation = interaction.options.getChannel("polllocation");
    const pollLocationDefault = interaction.channel;

    answer1 = interaction.options.getString("answer1");
    answer2 = interaction.options.getString("answer2");
    answer3 = interaction.options.getString("answer3");
    answer4 = interaction.options.getString("answer4");
    answer5 = interaction.options.getString("answer5");
    answer6 = interaction.options.getString("answer6");
    answer7 = interaction.options.getString("answer7");
    answer8 = interaction.options.getString("answer8");
    answer9 = interaction.options.getString("answer9");
    answer10 = interaction.options.getString("answer10");

    const role1 = interaction.options.getRole("role1");
    const role2 = interaction.options.getRole("role2");
    const role3 = interaction.options.getRole("role3");
    const role4 = interaction.options.getRole("role4");
    const role5 = interaction.options.getRole("role5");

    surveyTitle = interaction.options.getString("title");
    surveyQuestion = interaction.options.getString("question");

    function randomId(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    function jsonReader(filePath, cb) {
      fs.readFile(filePath, "utf-8", (err, fileData) => {
        if (err) {
          return cb && cb(err);
        }
        try {
          const object = JSON.parse(fileData);
          return cb && cb(null, object);
        } catch (err) {
          return cb && cb(err);
        }
      });
    }

    if (interaction.options.getSubcommand() === "create") {
      const noPerms = new MessageEmbed()
        .setTitle("Error!")
        .setDescription("Oh no! you dont have permissions to use this command.")
        .setColor("RED");

      const canInitPoll =
        interaction.member.roles.cache.some((r) => r.name === "LED") ||
        interaction.member.roles.cache.some((r) => r.name === "Polls/surveys");

      if (!canInitPoll) return interaction.followUp({ embeds: [noPerms] });

      if (pollLocation) {
        pollChannelSend = pollLocation;
      } else {
        pollChannelSend = pollLocationDefault;
      }

      const customId = randomId(25);
      const minans = new MessageEmbed()
        .setColor("RED")
        .setTitle("Error!")
        .setDescription("Please be sure enter at least 2 answers");

      let options = [
        answer1,
        answer2,
        answer3,
        answer4,
        answer5,
        answer6,
        answer7,
        answer8,
        answer9,
        answer10,
      ];

      let testOptions = [];
      let iteration00 = 0;
      for (let answers in options) {
        if (options[iteration00] === null) {
          iteration00++;
          continue;
        }
        testOptions.push(options[iteration00]);
        iteration00++;
      }
      options = testOptions;
      if (options.length <= 1)
        return interaction.followUp({ embeds: [minans] });

      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter(`please select an option from the dropdown below`)
        .setAuthor(
          `${interaction.user.username}`,
          interaction.user.displayAvatarURL({ dynamic: true })
        )
        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: false }))
        .setTitle(surveyTitle)
        .setDescription(surveyQuestion);

      let selectOptions = [];
      let iteration = 0;
      for (let option in options) {
        if (options[iteration] === null) continue;
        selectOptions.push({
          label: `Option: ${[iteration + 1]}`,
          value: option,
          description: `${options[iteration]}`,
        });
        embed.addField(`Option: ${iteration + 1}`, `${options[iteration]}`);
        iteration++;
      }

      const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId(customId)
          .setPlaceholder("Nothing selected")
          .addOptions(selectOptions)
      );

      let message = await pollChannelSend.send({
        embeds: [embed],
        components: [row],
      });
      let pollMessageId = message.id;

      jsonReader("./json/polls.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let array = data;
          let objLength = array.length;
          let newPollObj = { poll: [] };
          let answersArray = [];
          let rolesArray = [];
          let iteration1 = 0;
          for (option in options) {
            if (options[iteration1] === null) continue;
            answersArray.push({
              answerNumber: iteration1,
              answerContent: [
                { answerText: options[iteration1] },
                { votes: 0 },
              ],
            });
            iteration1++;
          }
          let restrictedRolesArray = [role1, role2, role3, role4, role5];
          let iteration2 = 0;
          for (role in restrictedRolesArray) {
            if (restrictedRolesArray[iteration2] === null) continue;
            rolesArray.push(restrictedRolesArray[iteration2].id);
            iteration2++;
          }

          newPollObj.poll.push(
            { pollNumber: objLength },
            { title: `${surveyTitle}` },
            { question: `${surveyQuestion}` },
            { customId: `${customId}` },
            { possibleAnswers: answersArray },
            { restrictedRoles: rolesArray },
            { respondedUsers: [] },
            { embed: embed },
            { channelId: pollChannelSend.id },
            { messageId: pollMessageId }
          );

          array.push(newPollObj);

          fs.writeFile(
            "./json/polls.json",
            JSON.stringify(array, null, 2),
            (err) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      });

      const confmsg = new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Your poll has been created");
      interaction.followUp({ embeds: [confmsg] });
    }

    if (interaction.options.getSubcommand() === "end") {
      jsonReader("./json/endPollRequest.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          const noPerms = new MessageEmbed()
            .setTitle("Error!")
            .setDescription(
              "Oh no! you dont have permissions to use this command."
            )
            .setColor("RED");

          const canInitPoll =
            interaction.member.roles.cache.some((r) => r.name === "LED") ||
            interaction.member.roles.cache.some(
              (r) => r.name === "Polls/surveys"
            );

          if (!canInitPoll) return interaction.followUp({ embeds: [noPerms] });

          let endOptions = [];
          let endCustomId = randomId(15);
          let endRequest = data;
          let iteration0 = 0;
          let pollsArray = [];

          if (endRequest.length > 10) {
            endRequest.shift();
          }
          const endEmbed = new MessageEmbed()
            .setTitle(`End a Poll`)
            .setDescription(`please select what poll you want to end`)
            .setColor("RANDOM");

          jsonReader("./json/polls.json", (err, data0) => {
            if (err) {
              console.log(err);
            } else {
              for (poll in data0) {
                endEmbed.addField(
                  `Survey: ${data0[iteration0].poll[1].title}`,
                  `question: ${data0[iteration0].poll[2].question}`
                );
                endOptions.push({
                  label: `Title: ${data0[iteration0].poll[1].title}`,
                  value: `${data0[iteration0].poll[0].pollNumber}`,
                  description: `${data0[iteration0].poll[2].question}`,
                });
                pollsArray.push({
                  poll: [
                    { pollId: data0[iteration0].poll[0].pollNumber },
                    { title: data0[iteration0].poll[1].title },
                    { question: data0[iteration0].poll[2].question },
                  ],
                });
                iteration0++;
              }
              const ERRR = new MessageEmbed()
                .setColor("RED")
                .setTitle("Error!")
                .setDescription("There are no active polls");

              if (!data0[0]) return interaction.followUp({ embeds: [ERRR] });
              endRequest.push({
                endPoll: [{ endCustomId: endCustomId }, { polls: pollsArray }],
              });

              fs.writeFile(
                "./json/endPollRequest.json",
                JSON.stringify(endRequest, null, 2),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );

              const endRow = new MessageActionRow().addComponents(
                new MessageSelectMenu()
                  .setCustomId(endCustomId)
                  .setPlaceholder("Nothing selected")
                  .addOptions(endOptions)
              );

              interaction.followUp({
                embeds: [endEmbed],
                components: [endRow],
              });
            }
          });
        }
      });
    }
    if (interaction.options.getSubcommand() === "displayresults") {
      const noPerms = new MessageEmbed()
        .setTitle("Error!")
        .setDescription("Oh no! you dont have permissions to use this command.")
        .setColor("RED");

      const canInitPoll =
        interaction.member.roles.cache.some((r) => r.name === "LED") ||
        interaction.member.roles.cache.some((r) => r.name === "Polls/surveys");

      if (!canInitPoll) return interaction.followUp({ embeds: [noPerms] });

      let resultsChannel;
      if (interaction.options.getChannel("resultschannel")) {
        resultsChannel = interaction.options.getChannel("resultschannel").id;
      } else {
        resultsChannel = null;
      }

      let ephemeralresults = false;
      if (interaction.options.getBoolean("ephemeralresults")) {
        ephemeralresults = interaction.options.getBoolean("ephemeralresults");
      }

      const resultsEmbed = new MessageEmbed()
        .setTitle("Choose one")
        .setDescription(
          "Please select an ended poll to display. If the poll has not been ended, it will not be displayed as an option"
        )
        .setColor("RANDOM");

      jsonReader("./json/endedPoll.json", (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let newArry = data;
          if (newArry.length > 10) {
            let length = newArry.length;
            for (length > 10; length++; ) {
              newArry.shift();
            }
          } else if (newArry.length <= 0) {
            const noSavedErr = new MessageEmbed()
              .setColor("RED")
              .setTitle("Error!")
              .setDescription("There are no ended polls currently saved");

            return interaction.followUp({ embeds: [noSavedErr] });
          }

          let displayOptions = [];
          let iteration0 = 0;
          for (polls in newArry) {
            newArry[iteration0].poll[0].pollNumber = randomId(10);

            resultsEmbed.addField(
              `Poll: ${newArry[iteration0].poll[1].title}`,
              `Question: ${newArry[iteration0].poll[2].question}`
            );
            displayOptions.push({
              label: `Title: ${newArry[iteration0].poll[1].title}`,
              value: `${newArry[iteration0].poll[0].pollNumber}`,
              description: `${newArry[iteration0].poll[2].question}`,
            });

            iteration0++;
          }
          const displayCustomId = randomId(20);
          const resultsRow = new MessageActionRow().addComponents(
            new MessageSelectMenu()
              .setCustomId(displayCustomId)
              .setPlaceholder("Nothing Selected")
              .addOptions(displayOptions)
          );

          jsonReader("./json/displayRequest.json", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              let ephemeral =
                interaction.options.getBoolean("ephemeralresults");
              let displayArray = data;
              let displayObj = {
                displayRequest: [
                  { displayCustomId: displayCustomId },
                  { displayChannelId: resultsChannel },
                  { ephemeral: ephemeral },
                  { pollData: newArry },
                ],
              };

              displayArray.push(displayObj);
              fs.writeFile(
                "./json/displayRequest.json",
                JSON.stringify(displayArray, null, 2),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );
            }
          });
          fs.writeFile(
            "./json/endedPoll.json",
            JSON.stringify(newArry, null, 2),
            (err) => {
              if (err) console.log(err);
            }
          );
          return interaction.followUp({
            embeds: [resultsEmbed],
            components: [resultsRow],
          });
        }
      });
    }
  },
};
