import { inject } from 'inversify';
import { Player, WeekPlayer, Team } from '../../../db/models';
import { provideSingleton } from '../../../util/provideSingleton';
import { Stat } from '../interfaces/stats.interface';
import { StatsParser } from '../stats.parser';

interface IWeekPlayerRepository {
    retrieveByWeekId(weekId: number): Promise<Stat[] | []>;
}

@provideSingleton(WeekPlayerRepository)
export class WeekPlayerRepository implements IWeekPlayerRepository {

    constructor(
        @inject(StatsParser) private statsParser: StatsParser
    ) { }

    async retrieveByWeekId(weekId: number): Promise<Stat[] | []> {
        try {
            const data: any = await WeekPlayer.findAll({
                where: { weekId },
                attributes: { exclude: ['added', 'updated', 'weekId', 'playerId'] },
                include: [{
                    model: Player,
                    attributes: ['firstName', 'lastName', 'position'],
                    include: [{
                        model: Team,
                        attributes: [['name', 'teamName']]
                    }]
                }],
                raw: true
            }).catch((err) => console.log(err));

            const parsedStats = this.statsParser.parse(data);

            return parsedStats || [];
        } catch (error) {
            throw new Error("Failed to retrieve stats from WeekPlayer!");
        }
    }

}