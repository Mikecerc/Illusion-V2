import { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';
import TBA from '../../api/api.js';
export default {
    name: 'interactionCreate',
    async execute(interaction: any) {
        if (interaction.isSelectMenu() || interaction.isButton()) {
            const data = interaction.customId.split('-');
            if (data[1] == '1' && interaction.isSelectMenu()) {
                const eventId = interaction.values[0];
                getQuals(interaction, eventId, data[0]);

            } else if (data[1] == '2' && interaction.isButton()) {
                if (data[2] == '1') {
                    const eventId = data[3];
                    getPlayoffs(interaction, eventId, data[0])

                } else if (data[2] == '2') {
                    const eventId = data[3];
                    getQuals(interaction, eventId, data[0]);
                }
            } else if (data[1] == '3' && interaction.isSelectMenu()) {
                const eventId = data[2];
                getBreakdown(interaction, eventId, data[0]);
            }
        }
    }
}

async function getQuals(interaction: any, eventId: string, team: number) {
    const res = new TBA(process.env.tbaAuth)
    let matches: any = await res.getTeamEventMatchList(team, eventId);
    let embed = new MessageEmbed()
        .setTitle('Match Data')
        .setDescription(`Match data for team ${team} at ${eventId}`)
        .setColor('RANDOM')
        .setFooter({ text: 'Data provided via The Blue Alliance API' })

    let finalQuals = [];
    for (const match in matches) {
        if (matches[match].comp_level == 'qm') {
            finalQuals.push(matches[match])
        }
    }
    finalQuals.sort(function (a, b) {
        var aNum = parseInt(a.match_number);
        var bNum = parseInt(b.match_number);
        return aNum - bNum;
    });
    if (finalQuals.length == 0) {
        embed.addField('Match Data not available', 'Its possible its just not up yet', false)
    }
    let options = []
    for (const match in finalQuals) {
        const time = Number.isInteger(finalQuals[match].actual_time) ? `Actual time: ${new Date(finalQuals[match].actual_time * 1000)}` : ` Predicted time: ${new Date(finalQuals[match].predicted_time * 1000)}`
        const alliance = finalQuals[match].alliances.red.team_keys.includes(`frc${team}`) ? 'red' : 'blue'
        const win = finalQuals[match].winning_alliance == alliance ? 'win' : (finalQuals[match].winning_alliance == '' ? 'tie' : 'loss')
        embed.addField(`Qualifying Match #${finalQuals[match].match_number}`, `${time}]\nAlliance: ${alliance}\nWin?: ${win}`)
        options.push(
            {
                label: `Qualifying Match #${finalQuals[match].match_number}`,
                description: 'view a more descriptive match breakdown',
                value: `${finalQuals[match].match_number}-qm`,
            }
        )
    }

    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`${team}-2-2-${eventId}`)
                .setLabel(`Qualifiers`)
                .setStyle('PRIMARY')
                .setDisabled(true),
            new MessageButton()
                .setCustomId(`${team}-2-1-${eventId}`)
                .setLabel('Playoffs')
                .setStyle('PRIMARY')
                .setDisabled(false),
        );
    if (finalQuals.length > 0) {
        const row0 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(`${team}-3-${eventId}`)
                    .setPlaceholder(`View more data`)
                    .addOptions(options),
            );
        interaction.update({ embeds: [embed], components: [row0, row] });
    } else {
        interaction.update({ embeds: [embed], components: [row] })
    };
}

async function getPlayoffs(interaction, eventId, team) {
    const res = new TBA(process.env.tbaAuth)
    let matches: any = await res.getTeamEventMatchList(team, eventId);
    let embed = new MessageEmbed()
        .setTitle('Match Data')
        .setDescription(`Match data for team ${team} at ${eventId}`)
        .setColor('RANDOM')
        .setFooter({ text: 'Data provided via The Blue Alliance API' })

    let finalPlayoffs = [];
    for (const match in matches) {
        if (matches[match].comp_level == 'f' || matches[match].comp_level == 'sf' || matches[match].comp_level == 'qf') {
            finalPlayoffs.push(matches[match])
        }
    }
    finalPlayoffs.sort(function (a, b) {
        var aNum = parseInt(a.match_number);
        var bNum = parseInt(b.match_number);
        if (a.comp_level == 'f' && b.comp_level != 'f') {
            return 1;
        } else if (b.comp_level == 'f' && a.comp_level != 'f') {
            return -1;
        } else if (a.comp_level == 'sf' && b.comp_level != 'sf') {
            return 1;
        } else if (b.comp_level == 'sf' && a.comp_level != 'sf') {
            return -1;
        } else if (a.comp_level == 'qf' && b.comp_level != 'qf') {
            return 1;
        } else if (b.comp_level == 'qf' && a.comp_level != 'qf') {
            return -1;
        } else {
            return aNum - bNum;
        }
    });
    if (finalPlayoffs.length == 0) {
        embed.addField('Match Data not available', 'Its possible its just not up yet', false)
    }
    let options = [];
    for (const match in finalPlayoffs) {
        const time = Number.isInteger(finalPlayoffs[match].actual_time) ? `Actual time: ${new Date(finalPlayoffs[match].actual_time * 1000)}` : ` Predicted time: ${new Date(finalPlayoffs[match].predicted_time * 1000)}`
        const alliance = finalPlayoffs[match].alliances.red.team_keys.includes(`frc${team}`) ? 'red' : 'blue'
        const win = finalPlayoffs[match].winning_alliance == alliance ? 'win' : (finalPlayoffs[match].winning_alliance == '' ? 'tie' : 'loss')
        const matchType = finalPlayoffs[match].comp_level == 'f' ? 'Final' : (finalPlayoffs[match].comp_level == 'sf' ? 'Semi-Final' : 'Quarter-Final')
        embed.addField(`${matchType} Match #${finalPlayoffs[match].match_number}`, `${time}]\nAlliance: ${alliance}\nWin?: ${win}`)
        options.push(
            {
                label: `${matchType} Match #${finalPlayoffs[match].match_number}`,
                description: 'view a more descriptive match breakdown',
                value: `${finalPlayoffs[match].match_number}-${finalPlayoffs[match].comp_level}`,
            }
        )
    }

    let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId(`${team}-2-2-${eventId}`)
                .setLabel(`Qualifiers`)
                .setStyle('PRIMARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId(`${team}-2-1-${eventId}`)
                .setLabel('Playoffs')
                .setStyle('PRIMARY')
                .setDisabled(true),

        );
    if (finalPlayoffs.length > 0) {
        const row0 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId(`${team}-3-${eventId}`)
                    .setPlaceholder(`View more data`)
                    .addOptions(options),
            )
        interaction.update({ embeds: [embed], components: [row0, row] })
    } else {
        interaction.update({ embeds: [embed], components: [row] })
    };
}

async function getBreakdown(interaction, eventId, team) {
    const data = interaction.values[0].split('-');
    const matchNumber = data[0];
    const compLevel = data[1];

    const res = new TBA(process.env.tbaAuth)
    let matches: any = await res.getTeamEventMatchList(team, eventId);

    let finalMatch: any

    for (const match in matches) {
        if (matches[match].comp_level == compLevel && matches[match].match_number == matchNumber) {
            finalMatch = matches[match];
        }
    }
    const level = compLevel == 'f' ? 'Final' : (compLevel == 'sf' ? 'Semi-Final' : (compLevel == 'qf' ? 'Quarter-Final' : 'Qualifying'))
    const time = Number.isInteger(finalMatch.actual_time) ? ` Actual: ${new Date(finalMatch.actual_time * 1000)}` : `Predicted: ${new Date(finalMatch.predicted_time * 1000)}`
    const winner = finalMatch.alliances.red.score >= finalMatch.alliances.blue.score ? (finalMatch.alliances.red.score == finalMatch.alliances.blue.score ? 'Tie' : 'Red') : 'Blue'
    const color = winner == 'Red' ? 'RED' : (winner == 'Tie' ? 'GREEN' : 'BLUE')
    const embed = new MessageEmbed()
        .setTitle('Match Breakdown')
        .setDescription(`Match Breakdown for ${level} Match #${matchNumber}`)
        .setColor(color)
        .addField(`Time of match:`, time, false)
        .addField(`Red Alliance:`, `${finalMatch.alliances.red.team_keys}`, true)
        .addField(`Blue Alliance:`, `${finalMatch.alliances.blue.team_keys}`, true)
        .addField(`Winning Alliance:`, winner, false)
        .addField(`Red Total Score:`, `${finalMatch.alliances.red.score}`, true)
        .addField(`Red Auton Score:`, `${finalMatch.score_breakdown.red.autoPoints}`, true)
        .addField(`Red Teleop Score:`, `${finalMatch.score_breakdown.red.teleopPoints}`, true)
        .addField(`Red Ranking Points:`, `${finalMatch.score_breakdown.red.rp}`, true)
        .addField('Red Endgame Points:', `${finalMatch.score_breakdown.red.endgamePoints}`, true)
        .addField('Red Endgame Levels', `${finalMatch.score_breakdown.red.endgameRobot1}, ${finalMatch.score_breakdown.red.endgameRobot2}, ${finalMatch.score_breakdown.red.endgameRobot3}`, true)
        .addField('Red fouls', `${finalMatch.score_breakdown.red.foulCount}`, true)
        .addField('Red Technical Fouls', `${finalMatch.score_breakdown.red.techFoulCount}`, true)
        .addField('Red Penalty Points received', `${finalMatch.score_breakdown.red.foulPoints}`, true)
        .addField(`Blue Total Score:`, `${finalMatch.alliances.blue.score}`, true)
        .addField(`Blue Auton Score:`, `${finalMatch.score_breakdown.blue.autoPoints}`, true)
        .addField(`Blue Teleop Score:`, `${finalMatch.score_breakdown.blue.teleopPoints}`, true)
        .addField(`Blue Ranking Points:`, `${finalMatch.score_breakdown.blue.rp}`, true)
        .addField('Blue Endgame Points:', `${finalMatch.score_breakdown.blue.endgamePoints}`, true)
        .addField('Blue Endgame Levels', `${finalMatch.score_breakdown.blue.endgameRobot1}, ${finalMatch.score_breakdown.blue.endgameRobot2}, ${finalMatch.score_breakdown.blue.endgameRobot3}`, true)
        .addField('Blue fouls', `${finalMatch.score_breakdown.blue.foulCount}`, true)
        .addField('Blue Technical Fouls', `${finalMatch.score_breakdown.blue.techFoulCount}`, true)
        .addField('Blue Penalty Points received', `${finalMatch.score_breakdown.blue.foulPoints}`, true);

    let row = new MessageActionRow()
    if (compLevel == 'qm') {
        row.addComponents(
            new MessageButton()
                .setCustomId(`${team}-2-2-${eventId}`)
                .setLabel(`Back to Qualifiers`)
                .setStyle('PRIMARY')
                .setDisabled(false),
        );
    } else {
        row.addComponents(
            new MessageButton()
                .setCustomId(`${team}-2-1-${eventId}`)
                .setLabel('Back to Playoffs')
                .setStyle('PRIMARY')
                .setDisabled(false),

        )
    }
    interaction.update({ embeds: [embed], components: [row] })
}