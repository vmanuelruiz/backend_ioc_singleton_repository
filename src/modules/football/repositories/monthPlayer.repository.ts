import { inject } from 'inversify';
import { Player, Team, MonthPlayer } from '../../../db/models';
import { provideSingleton } from '../../../util/provideSingleton';
import { Stat } from '../interfaces/stats.interface';
import { StatsParser } from '../stats.parser';

interface IMonthPlayerRepository {
    retrieveByMonthId(weekId: number): Promise<Stat[] | []>;
}

@provideSingleton(MonthPlayerRepository)
export class MonthPlayerRepository implements IMonthPlayerRepository {

    constructor(
        @inject(StatsParser) private statsParser: StatsParser,
    ) { }

    async retrieveByMonthId(monthId: number): Promise<Stat[] | []> {
        try {
            const data: any = await MonthPlayer.findAll({
                where: { monthId },
                attributes: { exclude: ['added', 'updated', 'monthId', 'playerId'] },
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
            throw new Error("Failed to retrieve stats from MonthPlayer!");
        }
    }

}