import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../../shared/errors/validation.error';
import { Period, QueryParams } from '../../../modules/football/interfaces/stats.interface';

export function validateQueryParams(req: Request, res: Response, next: NextFunction) {
    const { period } = req.params;
    const { weekId, monthId } = req.query;

    if (period === Period.WEEK) {
        const availableWeekIds = [1, 2, 3, 4, 6, 7, 8];
        if (!weekId) {
            throw new ValidationError(`The weekId '${weekId}' must be defined.`);
        }
        if (!availableWeekIds.includes(parseInt(weekId as string, 10))) {
            throw new ValidationError(`The weekId '${monthId}' is not valid. Available weekIds are ${availableWeekIds.toString()}`);
        }
    }

    if (period === Period.MONTH) {
        const availableMonthsIds = [9, 10, 11];
        if (!monthId) {
            throw new ValidationError(`The monthId '${monthId}' must be defined.`);
        }
        if (!availableMonthsIds.includes(parseInt(monthId as string, 10))) {
            throw new ValidationError(`The monthId '${monthId}' is not valid. Available monthIds are 9 (September), 10 (October) and 11 (November)`);
        }
    }

    next();
}
