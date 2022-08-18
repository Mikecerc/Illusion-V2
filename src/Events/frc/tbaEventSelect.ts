import { EmbedBuilder, SelectMenuBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import TBA from "../../classes/tba/tbaApi.js";
export default {
    name: "interactionCreate",
    async execute(interaction: any) {
        if (interaction.isSelectMenu() || interaction.isButton()) {
            const data = interaction.customId.split("-");
            if (data[1] == "1" && interaction.isSelectMenu()) {
                const eventId = interaction.values[0];
                getQuals(interaction, eventId, data[0]);
            } else if (data[1] == "2" && interaction.isButton()) {
                if (data[2] == "1") {
                    const eventId = data[3];
                    getPlayoffs(interaction, eventId, data[0]);
                } else if (data[2] == "2") {
                    const eventId = data[3];
                    getQuals(interaction, eventId, data[0]);
                }
            } else if (data[1] == "3" && interaction.isSelectMenu()) {
                const eventId = data[2];
                getBreakdown(interaction, eventId, data[0]);
            }
        }
    },
};

async function getQuals(interaction: any, eventId: string, team: number) {
    const res = new TBA(process.env.tbaAuth);
    let matches: any = await res.getTeamEventMatchList(team, eventId);
    let embed = new EmbedBuilder()
        .setTitle("Match Data")
        .setDescription(`Match data for team ${team} at ${eventId}`)
        .setColor("Orange")
        .setFooter({ text: "Data provided via The Blue Alliance API" });

    let finalQuals = [];
    for (const match in matches) {
        if (matches[match].comp_level == "qm") {
            finalQuals.push(matches[match]);
        }
    }
    finalQuals.sort(function (a, b) {
        var aNum = parseInt(a.match_number);
        var bNum = parseInt(b.match_number);
        return aNum - bNum;
    });
    if (finalQuals.length == 0) {
        embed.addFields({ name: "Match Data not available", value: "Its possible its just not up yet", inline: false });
    }
    let options = [];
    for (const match in finalQuals) {
        const time = Number.isInteger(finalQuals[match].actual_time)
            ? `Actual time: ${new Date(finalQuals[match].actual_time * 1000)}`
            : ` Predicted time: ${new Date(finalQuals[match].predicted_time * 1000)}`;
        const alliance = finalQuals[match].alliances.red.team_keys.includes(`frc${team}`) ? "red" : "blue";
        const win = finalQuals[match].winning_alliance == alliance ? "win" : finalQuals[match].winning_alliance == "" ? "tie" : "loss";
        embed.addFields({
            name: `Qualifying Match #${finalQuals[match].match_number}`,
            value: `${time}]\nAlliance: ${alliance}\nWin?: ${win}`,
        });
        options.push({
            label: `Qualifying Match #${finalQuals[match].match_number}`,
            description: "view a more descriptive match breakdown",
            value: `${finalQuals[match].match_number}-qm`,
        });
    }

    let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`${team}-2-2-${eventId}`).setLabel(`Qualifiers`).setStyle(ButtonStyle.Primary).setDisabled(true),
        new ButtonBuilder().setCustomId(`${team}-2-1-${eventId}`).setLabel("Playoffs").setStyle(ButtonStyle.Primary).setDisabled(false)
    );
    if (finalQuals.length > 0) {
        const row0 = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder().setCustomId(`${team}-3-${eventId}`).setPlaceholder(`View more data`).addOptions(options)
        );
        interaction.update({ embeds: [embed], components: [row0, row] });
    } else {
        interaction.update({ embeds: [embed], components: [row] });
    }
}

async function getPlayoffs(interaction, eventId, team) {
    const res = new TBA(process.env.tbaAuth);
    let matches: any = await res.getTeamEventMatchList(team, eventId);
    let embed = new EmbedBuilder()
        .setTitle("Match Data")
        .setDescription(`Match data for team ${team} at ${eventId}`)
        .setColor("Orange")
        .setFooter({ text: "Data provided via The Blue Alliance API" });

    let finalPlayoffs = [];
    for (const match in matches) {
        if (matches[match].comp_level == "f" || matches[match].comp_level == "sf" || matches[match].comp_level == "qf") {
            finalPlayoffs.push(matches[match]);
        }
    }
    finalPlayoffs.sort(function (a, b) {
        var aNum = parseInt(a.match_number);
        var bNum = parseInt(b.match_number);
        if (a.comp_level == "f" && b.comp_level != "f") {
            return 1;
        } else if (b.comp_level == "f" && a.comp_level != "f") {
            return -1;
        } else if (a.comp_level == "sf" && b.comp_level != "sf") {
            return 1;
        } else if (b.comp_level == "sf" && a.comp_level != "sf") {
            return -1;
        } else if (a.comp_level == "qf" && b.comp_level != "qf") {
            return 1;
        } else if (b.comp_level == "qf" && a.comp_level != "qf") {
            return -1;
        } else {
            return aNum - bNum;
        }
    });
    if (finalPlayoffs.length == 0) {
        embed.addFields({ name: "Match Data not available", value: "Its possible its just not up yet", inline: false });
    }
    let options = [];
    for (const match in finalPlayoffs) {
        const time = Number.isInteger(finalPlayoffs[match].actual_time)
            ? `Actual time: ${new Date(finalPlayoffs[match].actual_time * 1000)}`
            : ` Predicted time: ${new Date(finalPlayoffs[match].predicted_time * 1000)}`;
        const alliance = finalPlayoffs[match].alliances.red.team_keys.includes(`frc${team}`) ? "red" : "blue";
        const win =
            finalPlayoffs[match].winning_alliance == alliance ? "win" : finalPlayoffs[match].winning_alliance == "" ? "tie" : "loss";
        const matchType =
            finalPlayoffs[match].comp_level == "f" ? "Final" : finalPlayoffs[match].comp_level == "sf" ? "Semi-Final" : "Quarter-Final";
        embed.addFields({
            name: `${matchType} Match #${finalPlayoffs[match].match_number}`,
            value: `${time}]\nAlliance: ${alliance}\nWin?: ${win}`,
        });
        options.push({
            label: `${matchType} Match #${finalPlayoffs[match].match_number}`,
            description: "view a more descriptive match breakdown",
            value: `${finalPlayoffs[match].match_number}-${finalPlayoffs[match].comp_level}`,
        });
    }

    let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId(`${team}-2-2-${eventId}`).setLabel(`Qualifiers`).setStyle(ButtonStyle.Primary).setDisabled(false),
        new ButtonBuilder().setCustomId(`${team}-2-1-${eventId}`).setLabel("Playoffs").setStyle(ButtonStyle.Primary).setDisabled(true)
    );
    if (finalPlayoffs.length > 0) {
        const row0 = new ActionRowBuilder().addComponents(
            new SelectMenuBuilder().setCustomId(`${team}-3-${eventId}`).setPlaceholder(`View more data`).addOptions(options)
        );
        interaction.update({ embeds: [embed], components: [row0, row] });
    } else {
        interaction.update({ embeds: [embed], components: [row] });
    }
}

async function getBreakdown(interaction, eventId, team) {
    const data = interaction.values[0].split("-");
    const matchNumber = data[0];
    const compLevel = data[1];

    const res = new TBA(process.env.tbaAuth);
    let matches: any = await res.getTeamEventMatchList(team, eventId);

    let finalMatch: any;

    for (const match in matches) {
        if (matches[match].comp_level == compLevel && matches[match].match_number == matchNumber) {
            finalMatch = matches[match];
        }
    }
    const level = compLevel == "f" ? "Final" : compLevel == "sf" ? "Semi-Final" : compLevel == "qf" ? "Quarter-Final" : "Qualifying";
    const time = Number.isInteger(finalMatch.actual_time)
        ? ` Actual: ${new Date(finalMatch.actual_time * 1000)}`
        : `Predicted: ${new Date(finalMatch.predicted_time * 1000)}`;
    const winner =
        finalMatch.alliances.red.score >= finalMatch.alliances.blue.score
            ? finalMatch.alliances.red.score == finalMatch.alliances.blue.score
                ? "Tie"
                : "Red"
            : "Blue";
    const color = winner == "Red" ? "Red" : winner == "Tie" ? "Green" : "Blue";
    const embed = new EmbedBuilder()
        .setTitle("Match Breakdown")
        .setDescription(`Match Breakdown for ${level} Match #${matchNumber}`)
        .setColor(color)
        .addFields({ name: `Time of match:`, value: time, inline: false })
        .addFields({ name: `Red Alliance:`, value: `${finalMatch.alliances.red.team_keys}`, inline: true })
        .addFields({ name: `Blue Alliance:`, value: `${finalMatch.alliances.blue.team_keys}`, inline: true })
        .addFields({ name: `Winning Alliance:`, value: winner, inline: false })
        .addFields({ name: `Red Total Score:`, value: `${finalMatch.alliances.red.score}`, inline: true })
        .addFields({ name: `Red Auton Score:`, value: `${finalMatch.score_breakdown.red.autoPoints}`, inline: true })
        .addFields({ name: `Red Teleop Score:`, value: `${finalMatch.score_breakdown.red.teleopPoints}`, inline: true })
        .addFields({ name: `Red Ranking Points:`, value: `${finalMatch.score_breakdown.red.rp}`, inline: true })
        .addFields({ name: "Red Endgame Points:", value: `${finalMatch.score_breakdown.red.endgamePoints}`, inline: true })
        .addFields({ name: "Red Penalty Points received", value: `${finalMatch.score_breakdown.red.foulPoints}`, inline: true })
        .addFields({
            name: "Red Endgame Levels",
            value: `${finalMatch.score_breakdown.red.endgameRobot1}, ${finalMatch.score_breakdown.red.endgameRobot2}, ${finalMatch.score_breakdown.red.endgameRobot3}`,
            inline: true,
        })
        .addFields({ name: "Red fouls", value: `${finalMatch.score_breakdown.red.foulCount}`, inline: true })
        .addFields({ name: "Red Technical Fouls", value: `${finalMatch.score_breakdown.red.techFoulCount}`, inline: true })
        .addFields({ name: `Blue Total Score:`, value: `${finalMatch.alliances.blue.score}`, inline: true })
        .addFields({ name: `Blue Auton Score:`, value: `${finalMatch.score_breakdown.blue.autoPoints}`, inline: true })
        .addFields({ name: `Blue Teleop Score:`, value: `${finalMatch.score_breakdown.blue.teleopPoints}`, inline: true })
        .addFields({ name: `Blue Ranking Points:`, value: `${finalMatch.score_breakdown.blue.rp}`, inline: true })
        .addFields({ name: "Blue Endgame Points:", value: `${finalMatch.score_breakdown.blue.endgamePoints}`, inline: true })
        .addFields({ name: "Blue Penalty Points received", value: `${finalMatch.score_breakdown.blue.foulPoints}`, inline: true })
        .addFields({
            name: "Blue Endgame Levels",
            value: `${finalMatch.score_breakdown.blue.endgameRobot1}, ${finalMatch.score_breakdown.blue.endgameRobot2}, ${finalMatch.score_breakdown.blue.endgameRobot3}`,
            inline: true,
        })
        .addFields({ name: "Blue fouls", value: `${finalMatch.score_breakdown.blue.foulCount}`, inline: true })
        .addFields({ name: "Blue Technical Fouls", value: `${finalMatch.score_breakdown.blue.techFoulCount}`, inline: true });
        

    let row = new ActionRowBuilder();
    if (compLevel == "qm") {
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`${team}-2-2-${eventId}`)
                .setLabel(`Back to Qualifiers`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        );
    } else {
        row.addComponents(
            new ButtonBuilder()
                .setCustomId(`${team}-2-1-${eventId}`)
                .setLabel("Back to Playoffs")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false)
        );
    }
    interaction.update({ embeds: [embed], components: [row] });
}
