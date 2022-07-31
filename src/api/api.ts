'use strict';
import * as https from 'https'
export default class TBA {
	base;
	header;
	constructor(auth_key: string | undefined) {
		this.header = '?X-TBA-Auth-Key=' + auth_key;
		this.base = 'https://www.thebluealliance.com/api/v3/';
	}

	callAPI(uri: string) {
		return new Promise((resolve, reject) => {
			let content = '';
			https.get(this.base + uri + this.header, res => {
				if (res.statusCode != 200) {
                  //  console.log(res)
					reject(res.statusCode + ': ' + res.statusMessage);
				}

				res.on('data', data => {
					content += data;
				});

				res.on('end', (_data: any) => {
					if (res.statusCode == 200) resolve(JSON.parse(content));
				});
			});
		}).catch((err) => console.log(err));
	}

	getStatus() {
		return this.callAPI('status');
	}

	//Teams

	getTeamList(pageNum: string, year: string | undefined) {
		return this.callAPI('teams' + (year === undefined ? '' : '/' + year) + '/' + pageNum);
	}

	getTeamListSimple(pageNum: string, year: string | undefined) {
		return this.callAPI('teams' + (year === undefined ? '' : '/' + year) + '/' + pageNum + '/simple');
	}

	getTeam(teamNum: string) {
		return this.callAPI('team/frc' + teamNum);
	}

	getTeamSimple(teamNum: string) {
		return this.callAPI('team/frc' + teamNum + '/simple');
	}

	getYearsParticipated(teamNum: string) {
		return this.callAPI('team/frc' + teamNum + '/years_participated');
	}

	getTeamDistricts(teamNum: string) {
		return this.callAPI('team/frc' + teamNum + '/districts');
	}

	getTeamRobots(teamNum: string) {
		return this.callAPI('team/frc' + teamNum + '/robots');
	}

	getTeamEventList(teamNum: string, year: string | undefined) {
		return this.callAPI('team/frc' + teamNum + '/events' + (year === undefined ? '' : '/' + year));
	}

	getTeamEventListSimple(teamNum: string, year: string | undefined) {
		return this.callAPI('team/frc' + teamNum + '/events' + (year === undefined ? '' : '/' + year) + '/simple');
	}

	getTeamEventListKeys(teamNum: string, year: string | undefined) {
		return this.callAPI('team/frc' + teamNum + '/events' + (year === undefined ? '' : '/' + year) + '/keys');
	}

	getTeamEventMatchList(teamNum: string | number, eventKey: string) {
		return this.callAPI('team/frc' + teamNum + '/event/' + eventKey + '/matches');
	}

	getTeamEventMatchListSimple(teamNum: string, eventKey: string) {
		return this.callAPI('team/frc' + teamNum + '/event/' + eventKey + '/matches/simple');
	}

	getTeamEventMatchListKeys(teamNum: string, eventKey: string) {
		return this.callAPI('team/frc' + teamNum + '/event/' + eventKey + '/matches/simple');
	}

	getTeamEventAwards(teamNum: string, eventKey: string) {
		return this.callAPI('team/frc' + teamNum + '/event/' + eventKey + '/awards');
	}

	getTeamEventStatus(teamNum: string, eventKey: string) {
		return this.callAPI('team/frc' + teamNum + '/event/' + eventKey + '/awards');
	}

	getTeamAwards(teamNum: string, year: string) {
		return this.callAPI('team/frc' + teamNum + '/awards/' + year);
	}

	getTeamMatchList(teamNum: string, year: string) {
		return this.callAPI('team/frc' + teamNum + '/matches/' + year);
	}

	getTeamMatchListSimple(teamNum: string, year: string) {
		return this.callAPI('team/frc' + teamNum + '/matches/' + year + '/simple');
	}

	getTeamMatchListKeys(teamNum: string, year: string) {
		return this.callAPI('team/frc' + teamNum + '/matches/' + year + '/keys');
	}

	getTeamMedia(teamNum: string, year: string) {
		return this.callAPI('team/frc' + teamNum + '/media/' + year);
	}

	getTeamSocialMedia(teamNum: string) {
		return this.callAPI('team/frc' + teamNum + '/social_media');
	}

	//Events - work on this

	getEventList(year: string) {
		return this.callAPI('events/' + year);
	}

	getEventListSimple(year: string) {
		return this.callAPI('events/' + year + '/simple');
	}

	getEventListKeys(year: string) {
		return this.callAPI('events/' + year + '/keys');
	}

	getEvent(eventKey: string) {
		return this.callAPI('event/' + eventKey);
	}

	getEventSimple(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/simple');
	}

	getEventAlliances(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/alliances');
	}

	getEventInsights(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/insights');
	}

	getEventOprs(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/oprs');
	}

	getEventPredictions(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/predictions');
	}

	getEventTeams(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/teams');
	}

	getEventTeamsSimple(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/teams/simple');
	}

	getEventTeamsKeys(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/teams/keys');
	}

	getEventMatches(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/matches');
	}

	getEventMatchesSimple(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/matches/simple');
	}

	getEventMatchesKeys(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/matches/keys');
	}

	getEventRankings(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/rankings');
	}

	getEventAwards(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/awards');
	}

	getEventDistrictPoints(eventKey: string) {
		return this.callAPI('event/' + eventKey + '/district_points');
	}

	//Matches

	getMatch(matchKey: string) {
		return this.callAPI('match/' + matchKey);
	}

	getMatchSimple(matchKey: string) {
		return this.callAPI('match/' + matchKey + '/simple');
	}

	//Districts

	getDistrictList(year: string) {
		return this.callAPI('districts/' + year);
	}

	getDistrictEvents(districtShort: string) {
		return this.callAPI('district/' + districtShort + '/events');
	}

	getDistrictEventsSimple(districtShort: string) {
		return this.callAPI('district/' + districtShort + '/events/simple');
	}

	getDistrictEventsKeys(districtShort: string) {
		return this.callAPI('district/' + districtShort + '/events/keys');
	}

	getDistrictRankings(districtShort: string, year: string) {
		return this.callAPI('district/' + districtShort + '/' + year + '/rankings');
	}

	getDistrictTeams(districtShort: string, _year: any) {
		return this.callAPI('district/' + districtShort + '/teams');
	}

	getDistrictTeamsSimple(districtShort: string, _year: any) {
		return this.callAPI('district/' + districtShort + '/teams/simple');
	}

	getDistrictTeamsKeys(districtShort: string, _year: any) {
		return this.callAPI('district/' + districtShort + '/teams/keys');
	}
}