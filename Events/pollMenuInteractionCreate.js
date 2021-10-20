const fs = require("fs");
const { MessageEmbed } = require("discord.js");
const { channel } = require("diagnostics_channel");
module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (interaction.isSelectMenu()) {
      await interaction.deferReply({ ephemeral: true }).catch(() => {});

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

      if (interaction.customId.length == 25) {
        jsonReader("./json/polls.json", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let iteration0 = 0;
            let pollIdNumber;

            //matches id of dropdown with custom id save to a poll, gets the polls unique id

            for (polls in data) {
              if (interaction.customId == data[iteration0].poll[3].customId) {
                pollIdNumber = data[iteration0].poll[0].pollNumber;
              }
              iteration0++;
            }

            const endedErr = new MessageEmbed()
              .setColor("RED")
              .setTitle("Error!")
              .setDescription("This poll has aleady ended");

            let hasEnded = true;
            if (pollIdNumber > 0 || pollIdNumber == 0) hasEnded = false;
            if (hasEnded == true)
              return interaction.followUp({ embeds: [endedErr] });

            console.log(`ID Of POLL: ${pollIdNumber}`);
            let placeOnArray; //very important - determines where the poll is in the arry
            let iteration1 = 0;

            for (polls in data) {
              if (data[iteration1].poll[0].pollNumber == pollIdNumber) {
                placeOnArray = iteration1;
              }
              iteration1++;
            }
            console.log(`LOCATION ON ARRAY: ${placeOnArray}`);

            //lmao me trying to comment things
            //determines if user has one of the roles (if restrict)
            let userHasRole = false;
            if (data[placeOnArray].poll[5].restrictedRoles[0]) {
              let iteration4 = 0;
              for (roles in data[placeOnArray].poll[5].restrictedRoles[
                iteration4
              ]) {
                if (
                  interaction.member.roles.cache.some(
                    (r) =>
                      r.id ===
                      data[placeOnArray].poll5.restrictedRoles[iteration4]
                  )
                ) {
                  userHasRole = true;
                }
                iteration4++;
              }
            } else {
              userHasRole = true;
            }
            //determines if user has already responded
            let canRespond = true;
            let iteration3 = 0;

            for (users in data[placeOnArray].poll[6].respondedUsers) {
              if (
                interaction.user.id ==
                data[placeOnArray].poll[6].respondedUsers[iteration3]
              ) {
                canRespond = false;
              }
              iteration3++;
            }
            if (canRespond === true && userHasRole === true) {
              //if user can respond, update json with response
              let array = data;
              const answer = interaction.values[0];
              let iteration2 = 0;

              for (answers in data[placeOnArray].poll[4].possibleAnswers) {
                if (
                  answer ==
                  data[placeOnArray].poll[4].possibleAnswers[iteration2]
                    .answerNumber
                ) {
                  answerPlaceOnArray = iteration2;
                }
                iteration2++;
              }
              let votes =
                data[placeOnArray].poll[4].possibleAnswers[answerPlaceOnArray]
                  .answerContent[1].votes;
              votes++;

              array[placeOnArray].poll[4].possibleAnswers[
                answerPlaceOnArray
              ].answerContent.splice(1, 1, { votes: votes });
              array[placeOnArray].poll[6].respondedUsers.push(
                interaction.user.id
              );

              fs.writeFile(
                "./json/polls.json",
                JSON.stringify(array, null, 2),
                (err) => {
                  if (err) {
                    console.log(err);
                  }
                }
              );

              const successEmbed = new MessageEmbed()
                .setDescription("Your vote has been recorded")
                .setTitle("Success!")
                .setColor("GREEN")
                .setTimestamp();

              return interaction.followUp({ embeds: [successEmbed] });
            } else if (canRespond === false) {
              const alreadyResEmbed = new MessageEmbed()
                .setTitle(`Sorry!`)
                .setDescription("You cannot respond to a poll more than once")
                .setColor("RED")
                .setTimestamp();

              return interaction.followUp({ embeds: [alreadyResEmbed] });
            } else if (userHasRole === false) {
              const noPermsEmbed = new MessageEmbed()
                .setTitle(`Sorry!`)
                .setDescription("You cannot participate in this poll")
                .setColor("RED")
                .setTimestamp();

              return interaction.followUp({ embeds: [noPermsEmbed] });
            } else {
              return interaction.followUp(
                "an unknown error has occured, please report this to Michael"
              );
            }
          }
        });
      } else if (interaction.customId.length == 15) {
        jsonReader("./json/endPollRequest.json", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let iteration0 = 0;
            let placeOnArray;
            for (requests in data) {
              if (
                interaction.customId == data[iteration0].endPoll[0].endCustomId
              ) {
                placeOnArray = iteration0;
              }
              iteration0++;
            }

            const endedErr = new MessageEmbed()
              .setColor("RED")
              .setTitle("Error!")
              .setDescription(
                "you can no longer respond to this. Please use /poll end again"
              );

            let hasEnded = true;
            if (placeOnArray > 0 || placeOnArray == 0) hasEnded = false;
            if (hasEnded == true)
              return interaction.followUp({ embeds: [endedErr] });

            const noPerms = new MessageEmbed()
              .setTitle("Error!")
              .setDescription(
                "Oh no! you dont have permissions to use this command."
              )
              .setColor("RED");

            const canInitPoll =
              interaction.member.roles.cache.some(
                (r) => r.id === "692799900009627759"
              ) || interaction.member.roles.cache.some((r) => r.name === "LED");

            if (!canInitPoll)
              return interaction.followUp({ embeds: [noPerms] });

            jsonReader("./json/polls.json", (err, data0) => {
              if (err) {
                console.log(err);
              } else {
                let pollToEnd;
                let pollPlaceOnArray;
                let iteration1 = 0;
                const answer = interaction.values[0];

                let pollPlaceOnAnswerArray;
                let iteration2 = 0;

                for (polls in data[placeOnArray].endPoll[1].polls) {
                  if (
                    data[placeOnArray].endPoll[1].polls[iteration2].poll[0]
                      .pollId == answer
                  ) {
                    pollPlaceOnAnswerArray = iteration2;
                  }
                  iteration2++;
                }

                for (polls in data0) {
                  if (
                    data0[iteration1].poll[0].pollNumber ==
                    data[placeOnArray].endPoll[1].polls[pollPlaceOnAnswerArray]
                      .poll[0].pollId
                  ) {
                    pollToEnd = data0[iteration1];
                    pollPlaceOnArray = iteration1;
                  }
                  iteration1++;
                }

                const usedErr = new MessageEmbed()
                  .setColor("RED")
                  .setTitle("Error!")
                  .setDescription("This Poll has already ended");

                if (pollToEnd == undefined) {
                  let errAry = data;
                  errAry.splice(placeOnArray, 1);
                  fs.writeFile(
                    "./json/endPollRequest.json",
                    JSON.stringify(errAry, null, 2),
                    (err) => {
                      if (err) console.log(err);
                    }
                  );
                  return interaction.followUp({ embeds: [usedErr] });
                }

                jsonReader("./json/endedPoll.json", (err, data1) => {
                  if (err) {
                    console.log(err);
                  } else {
                    let array = data1;
                    array.push(pollToEnd);

                    fs.writeFile(
                      "./json/endedPoll.json",
                      JSON.stringify(array, null, 2),
                      (err) => {
                        if (err) console.log(err);
                      }
                    );

                    let newPollArray = data0;
                    newPollArray.splice(pollPlaceOnArray, 1);

                    fs.writeFile(
                      "./json/polls.json",
                      JSON.stringify(newPollArray, null, 2),
                      (err) => {
                        if (err) console.log(err);
                      }
                    );

                    let newEndRequestArray = data;
                    newEndRequestArray.splice(placeOnArray, 1);

                    fs.writeFile(
                      "./json/endPollRequest.json",
                      JSON.stringify(newEndRequestArray, null, 2),
                      (err) => {
                        if (err) console.log(err);
                      }
                    );

                    const successEmbed = new MessageEmbed()
                      .setColor("GREEN")
                      .setTitle("You have succesfully ended the poll:")
                      .addField(
                        `Survey: ${pollToEnd.poll[1].title}`,
                        `Question: ${pollToEnd.poll[2].question}`
                      );

                    interaction.followUp({ embeds: [successEmbed] });
                  }
                });
              }
            });
          }
        });
      } else if (interaction.customId.length === 20) {
        jsonReader("./json/displayRequest.json", (err, data) => {
          if (err) {
            console.log(err);
          } else {
            let iteration0 = 0;
            let placeOnArray;
            for (requests in data) {
              if (
                interaction.customId ==
                data[iteration0].displayRequest[0].displayCustomId
              ) {
                placeOnArray = iteration0;
              }
              iteration0++;
            }

            const endedErr = new MessageEmbed()
              .setColor("RED")
              .setTitle("Error!")
              .setDescription(
                "you can no longer use this to display results. Try doing /poll displayresults again"
              );

            let hasEnded = true;
            if (placeOnArray > 0 || placeOnArray == 0) hasEnded = false;
            if (hasEnded == true)
              return interaction.followUp({ embeds: [endedErr] });

            const noPerms = new MessageEmbed()
              .setTitle("Error!")
              .setDescription(
                "Oh no! you dont have permissions to use this command."
              )
              .setColor("RED");

            const canInitPoll =
              interaction.member.roles.cache.some(
                (r) => r.id === "692799900009627759"
              ) || interaction.member.roles.cache.some((r) => r.name === "LED");

            if (!canInitPoll)
              return interaction.followUp({ embeds: [noPerms] });

            let iteration1 = 0;
            let answer = interaction.values[0];
            let pollPlaceOnAnswerArray;
            for (polls in data[placeOnArray].displayRequest[3].pollData) {
              if (
                data[placeOnArray].displayRequest[3].pollData[iteration1]
                  .poll[0].pollNumber == answer
              ) {
                pollPlaceOnAnswerArray = iteration1;
              }
              iteration1++;
            }

            const errEmbed = new MessageEmbed()
              .setColor("RED")
              .setTitle("Error!")
              .setDescription("You can no longer request this poll");
            if (pollPlaceOnAnswerArray == undefined)
              return interaction.followUp({ embeds: [errEmbed] });

            let channelId;
            let ephemeral = true;
            if (data[placeOnArray].displayRequest[1].displayChannelId == null) {
              channelId = interaction.channel.id;
            } else {
              channelId = data[placeOnArray].displayRequest[1].displayChannelId;
            }

            const channel = interaction.guild.channels.cache.find(
              (c) => c.id === channelId
            );
            if (
              data[placeOnArray].displayRequest[2].ephemeral == null ||
              data[placeOnArray].displayRequest[2].ephemeral == false
            ) {
              ephemeral = false;
            }

            const embed = new MessageEmbed()
              .setColor("RANDOM")
              .setTitle(
                `Poll results for: ${data[placeOnArray].displayRequest[3].pollData[pollPlaceOnAnswerArray].poll[1].title}`
              )
              .setDescription(
                `question: ${data[placeOnArray].displayRequest[3].pollData[pollPlaceOnAnswerArray].poll[2].question}`
              )
              .setAuthor(
                `${interaction.user.username}`,
                interaction.user.displayAvatarURL({ dynamic: true })
              )
              .setThumbnail(
                interaction.user.displayAvatarURL({ dynamic: false })
              );

            let iteration2 = 0;
            for (answers in data[placeOnArray].displayRequest[3].pollData[
              pollPlaceOnAnswerArray
            ].poll[4].possibleAnswers) {
              embed.addField(
                `Option ${iteration2 + 1}: ${
                  data[placeOnArray].displayRequest[3].pollData[
                    pollPlaceOnAnswerArray
                  ].poll[4].possibleAnswers[iteration2].answerContent[0]
                    .answerText
                }`,
                `Votes: ${data[placeOnArray].displayRequest[3].pollData[pollPlaceOnAnswerArray].poll[4].possibleAnswers[iteration2].answerContent[1].votes}`
              );
              iteration2++;
            }

            const successEmbed = new MessageEmbed()
              .setColor("RANDOM")
              .setTitle("Success!")
              .setDescription(
                `The results have been posted in <#${channel.id}> `
              );

            interaction.followUp({ embeds: [successEmbed] });
            if (ephemeral == true) {
              interaction.followUp({ embeds: [embed], ephemeral: true });
            } else {
              channel.send({ embeds: [embed] });
            }

            let newEndRequestArray = data;
            newEndRequestArray.splice(placeOnArray, 1);

            fs.writeFile(
              "./json/displayRequest.json",
              JSON.stringify(newEndRequestArray, null, 2),
              (err) => {
                if (err) console.log(err);
              }
            );
          }
        });
      }
    }
  },
};
