import { provideSingleton } from "../../util/provideSingleton";
import { Stat } from "./interfaces/stats.interface";

@provideSingleton(StatsParser)
export class StatsParser {

    parse(data: any): Stat[] {

        const parsedStats: Stat[] = data.map((stat: any) => {
            stat.id = stat.PlayerId;
            stat.firstName = stat['Player.firstName'];
            stat.lastName = stat['Player.lastName'];
            stat.position = stat['Player.position'];
            stat.teamName = stat['Player.Team.teamName'];
            delete stat.PlayerId;
            delete stat['Player.Team.id'];
            delete stat['Player.firstName'];
            delete stat['Player.lastName'];
            delete stat['Player.position'];
            delete stat['Player.Team.teamName'];
            return stat;
        });

        return parsedStats;
    }
}