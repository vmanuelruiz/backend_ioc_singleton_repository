import 'dotenv/config';
import 'reflect-metadata';
import { logger } from './util/logger';
import express from 'express';
import * as loaders from './loaders';

async function bootstrap(): Promise<void> {
  const app = express();
  await loaders.init(app);

  const env: string = app.get('env') as string;
  const port: number = app.get('port') as number;

  const server = app.listen(port, () => {
    const message = `Server listening on ${port}, in ${env} mode`;

    const line = '#'.repeat(message.length + 4);

    logger.info(line);
    logger.info(`# ${message} #`);
    logger.info(line);
  });

  const gracefulShutdown = (signal: string) => {
    logger.info(`${signal} kill signal received\nclosing...`);
    server?.close(() => {
      logger.info('HTTP server closed.');
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

bootstrap().catch((error: Error) => logger.error(`${error.message}\n${error.stack ?? ''}`));
