import { Express } from 'express';
import routemap from 'express-routemap';
import { logger } from '../util/logger';
import routes from '../loaders/routes';
import swagger from '../loaders/swagger';
import express from '../loaders/express';
import errorhandlers from './errorhandlers';
import mysql from '../db';
import { redisClient } from './redis';

export const init = async (app: Express): Promise<Express> => {

    await mysql.connectToDatabase();
    logger.info('🥞  MYSQL Database loaded and connected!');

    await redisClient.connect();
    logger.info('💫  Redis loaded and connected!');

    express(app);
    logger.info('⚡️  Express loaded!');

    swagger(app);

    routes(app);
    logger.info('🛤  Routes loaded!');

    errorhandlers(app);
    logger.info('🛡  Handling errors!');

    routemap(app);

    return app;
};
