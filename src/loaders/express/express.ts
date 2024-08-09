import helmet from 'helmet';
import express from 'express';
import config from '../../config';
import cors from 'cors';


export default (app: express.Express): express.Express => {
  app.enable('trust proxy');

  app.set('env', config.env);
  app.set('port', config.port);

  app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS']
  }));

  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'", "http://api.pro", "http://api.dev"],
      },
    },
  }));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  return app;
};
