import express from 'express';
import * as pjson from 'pjson';
import { RegisterRoutes } from './routes';
import swaggerJSON from '../../../docs/swagger.json';

export default (app: express.Express): void => {
  app.get('/', (_, res) => {
    res.send({
      name: pjson.name,
      version: pjson.version
    });
  });

  app.get('/docs/swagger.json', (_, res) => {
    res.send(swaggerJSON);
  });

  RegisterRoutes(app);

  app.use((_, res) => {
    res.status(404).send({
      message: 'Endpoint Not Found'
    });
  });

  app.use((err: any, req: any, res: any) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong_');
  });
};
