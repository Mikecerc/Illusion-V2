"use strict";
import * as https from "https";
export default class TBA {
    base: string;
    header: string;
    constructor(auth_key: string | undefined) {
        this.header = "?X-TBA-Auth-Key=" + auth_key;
        this.base = "https://www.thebluealliance.com/api/v3/";
    }
    //base method for calling api with a specific uri
    private callAPI(uri: string) {
        return new Promise((resolve, reject) => {
            let content = "";
            https.get(this.base + uri + this.header, (res) => {
                if (res.statusCode != 200) {
                    //  console.log(res)
                    reject(res.statusCode + ": " + res.statusMessage);
                }

                res.on("data", (data) => {
                    content += data;
                });

                res.on("end", (_data: any) => {
                    if (res.statusCode == 200) resolve(JSON.parse(content));
                });
            });
        }).catch((err) => console.log(err));
    }

    public getStatus() {
        return this.callAPI("status");
    }

    //Teams

    public getTeamList(pageNum: string, year: string | undefined) {
        return this.callAPI("teams" + (year === undefined ? "" : "/" + year) + "/" + pageNum);
    }

    public getTeamListSimple(pageNum: string, year: string | undefined) {
        return this.callAPI("teams" + (year === undefined ? "" : "/" + year) + "/" + pageNum + "/simple");
    }

    public getTeam(teamNum: string) {
        return this.callAPI("team/frc" + teamNum);
    }

    public getTeamSimple(teamNum: string) {
        return this.callAPI("team/frc" + teamNum + "/simple");
    }

    public getYearsParticipated(teamNum: string) {
        return this.callAPI("team/frc" + teamNum + "/years_participated");
    }

    public getTeamDistricts(teamNum: string) {
        return this.callAPI("team/frc" + teamNum + "/districts");
    }

    public getTeamRobots(teamNum: string) {
        return this.callAPI("team/frc" + teamNum + "/robots");
    }

    public getTeamEventList(teamNum: string, year: string | undefined) {
        return this.callAPI("team/frc" + teamNum + "/events" + (year === undefined ? "" : "/" + year));
    }

    public getTeamEventListSimple(teamNum: string, year: string | undefined) {
        return this.callAPI("team/frc" + teamNum + "/events" + (year === undefined ? "" : "/" + year) + "/simple");
    }

    public getTeamEventListKeys(teamNum: string, year: string | undefined) {
        return this.callAPI("team/frc" + teamNum + "/events" + (year === undefined ? "" : "/" + year) + "/keys");
    }

    public getTeamEventMatchList(teamNum: string | number, eventKey: string) {
        return this.callAPI("team/frc" + teamNum + "/event/" + eventKey + "/matches");
    }

    public getTeamEventMatchListSimple(teamNum: string, eventKey: string) {
        return this.callAPI("team/frc" + teamNum + "/event/" + eventKey + "/matches/simple");
    }

    public getTeamEventMatchListKeys(teamNum: string, eventKey: string) {
        return this.callAPI("team/frc" + teamNum + "/event/" + eventKey + "/matches/simple");
    }

    public getTeamEventAwards(teamNum: string, eventKey: string) {
        return this.callAPI("team/frc" + teamNum + "/event/" + eventKey + "/awards");
    }

    public getTeamEventStatus(teamNum: string, eventKey: string) {
        return this.callAPI("team/frc" + teamNum + "/event/" + eventKey + "/awards");
    }

    public getTeamAwards(teamNum: string, year: string) {
        return this.callAPI("team/frc" + teamNum + "/awards/" + year);
    }

    public getTeamMatchList(teamNum: string, year: string) {
        return this.callAPI("team/frc" + teamNum + "/matches/" + year);
    }

    public getTeamMatchListSimple(teamNum: string, year: string) {
        return this.callAPI("team/frc" + teamNum + "/matches/" + year + "/simple");
    }

    public getTeamMatchListKeys(teamNum: string, year: string) {
        return this.callAPI("team/frc" + teamNum + "/matches/" + year + "/keys");
    }

    public getTeamMedia(teamNum: string, year: string) {
        return this.callAPI("team/frc" + teamNum + "/media/" + year);
    }

    public getTeamSocialMedia(teamNum: string) {
        return this.callAPI("team/frc" + teamNum + "/social_media");
    }

    //Events - work on this

    public getEventList(year: string) {
        return this.callAPI("events/" + year);
    }

    public getEventListSimple(year: string) {
        return this.callAPI("events/" + year + "/simple");
    }

    public getEventListKeys(year: string) {
        return this.callAPI("events/" + year + "/keys");
    }

    public getEvent(eventKey: string) {
        return this.callAPI("event/" + eventKey);
    }

    public getEventSimple(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/simple");
    }

    public getEventAlliances(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/alliances");
    }

    public getEventInsights(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/insights");
    }

    public getEventOprs(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/oprs");
    }

    public getEventPredictions(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/predictions");
    }

    public getEventTeams(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/teams");
    }

    public getEventTeamsSimple(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/teams/simple");
    }

    public getEventTeamsKeys(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/teams/keys");
    }

    public getEventMatches(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/matches");
    }

    public getEventMatchesSimple(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/matches/simple");
    }

    public getEventMatchesKeys(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/matches/keys");
    }

    public getEventRankings(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/rankings");
    }

    public getEventAwards(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/awards");
    }

    public getEventDistrictPoints(eventKey: string) {
        return this.callAPI("event/" + eventKey + "/district_points");
    }

    //Matches

    public getMatch(matchKey: string) {
        return this.callAPI("match/" + matchKey);
    }

    public getMatchSimple(matchKey: string) {
        return this.callAPI("match/" + matchKey + "/simple");
    }

    //Districts

    public getDistrictList(year: string) {
        return this.callAPI("districts/" + year);
    }

    public getDistrictEvents(districtShort: string) {
        return this.callAPI("district/" + districtShort + "/events");
    }

    public getDistrictEventsSimple(districtShort: string) {
        return this.callAPI("district/" + districtShort + "/events/simple");
    }

    public getDistrictEventsKeys(districtShort: string) {
        return this.callAPI("district/" + districtShort + "/events/keys");
    }

    public getDistrictRankings(districtShort: string, year: string) {
        return this.callAPI("district/" + districtShort + "/" + year + "/rankings");
    }

    public getDistrictTeams(districtShort: string, _year: any) {
        return this.callAPI("district/" + districtShort + "/teams");
    }

    public getDistrictTeamsSimple(districtShort: string, _year: any) {
        return this.callAPI("district/" + districtShort + "/teams/simple");
    }

    public getDistrictTeamsKeys(districtShort: string, _year: any) {
        return this.callAPI("district/" + districtShort + "/teams/keys");
    }
}
