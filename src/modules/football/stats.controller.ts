import { inject } from 'inversify';
import { Security, Route, Tags, Get, Path, Options, Request, Controller, Queries, Middlewares, SuccessResponse } from 'tsoa';
import { WeekPlayerRepository } from './repositories/weekPlayer.repository';
import { provideSingleton } from '../../util/provideSingleton';
import { StatsResponse, Period, QueryParams, Stat } from './interfaces/stats.interface';
import { validateQueryParams } from '../../loaders/express/middlewares/query-params.middleware';
import { MonthPlayerRepository } from './repositories/monthPlayer.repository';
import { SeasonPlayerRepository } from './repositories/seasonPlayer.repository';
import { redisClient } from '../../loaders/redis';
import { logger } from '../../util/logger';
import { AUTH_TYPE } from '../../shared/constants';

@Security(AUTH_TYPE)
@Route('stats')
@Tags('Stats')
@provideSingleton(StatsController)
export class StatsController extends Controller {
  constructor(
    @inject(WeekPlayerRepository) private weekPlayerRepository: WeekPlayerRepository,
    @inject(MonthPlayerRepository) private monthPlayerRepository: MonthPlayerRepository,
    @inject(SeasonPlayerRepository) private seasonPlayerRepository: SeasonPlayerRepository
  ) {
    super();
  }

  /**
   * @summary Gets the season, week or month for all the players
  */
  @SuccessResponse("200", "200 response")
  @Get('/{period}')
  @Middlewares(validateQueryParams)
  async getStats(
    @Path() period: Period,
    @Queries() queryParams: QueryParams
  ): Promise<StatsResponse | undefined> {
    let stats: Stat[];

    const { weekId, monthId } = queryParams;

    const cacheKey = period === Period.SEASON
      ? 'season'
      : period === Period.WEEK ? `weekId-${weekId}` : `monthId-${monthId}`;

    const cachedStats = await redisClient.get(cacheKey);
    if (cachedStats) {
      logger.info(`[cache:get] ${cacheKey}`);
      stats = JSON.parse(cachedStats);
    } else {
      if (period === Period.WEEK) {
        stats = await this.weekPlayerRepository.retrieveByWeekId(weekId as number);
      } else if (period === Period.MONTH) {
        stats = await this.monthPlayerRepository.retrieveByMonthId(monthId as number);
      } else {
        stats = await this.seasonPlayerRepository.retrieveBySeason();
      }

      await redisClient.set(cacheKey, JSON.stringify(stats));
      logger.info(`[cache:set] ${cacheKey}`);
    }

    return { period, stats };
  }

  @Options('/{period}')
  async getOptions(): Promise<any> {
    return;
  }
}
