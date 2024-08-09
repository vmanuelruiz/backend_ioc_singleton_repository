import { inject } from 'inversify';
import { Player, Team, SeasonPlayer } from '../../../db/models';
import { provideSingleton } from '../../../util/provideSingleton';
import { Stat } from '../interfaces/stats.interface';
import { StatsParser } from '../stats.parser';

interface ISeasonPlayerRepository {
    retrieveBySeason(): Promise<Stat[] | []>;
}

@provideSingleton(SeasonPlayerRepository)
export class SeasonPlayerRepository implements ISeasonPlayerRepository {

    constructor(
        @inject(StatsParser) private statsParser: StatsParser,
    ) { }

    async retrieveBySeason(): Promise<Stat[] | []> {
        try {
            const data: any = await SeasonPlayer.findAll({
                attributes: { exclude: ['added', 'updated', 'playerId'] },
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
            throw new Error("Failed to retrieve stats from SeasonPlayer!");
        }
    }

}