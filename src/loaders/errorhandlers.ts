import { logger } from '../util/logger';
import express, { ErrorRequestHandler } from 'express';
import { ValidateError } from 'tsoa';
import config from '../config';
import { APIError } from '../shared/errors/api-error';
import { UnauthorizedError } from '../shared/errors/unauthorized.error';
import { ValidationError } from '../shared/errors/validation.error';


export default (app: express.Express): void => {

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    if (err instanceof ValidateError) {
      logger.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }

    if (err instanceof SyntaxError) {
      return res.status(400).json({
        name: 'Syntax error',
        message: err.message
      });
    }

    if (err instanceof UnauthorizedError) {
      return res.status(401).json({
        name: err.name,
        message: err.message
      });
    }

    if (err instanceof ValidationError) {
      logger.warn(`Caught Validation Error for ${req.path}`, err.message);

      return res.status(err.status).json({
        message: 'Forbidden',
        details: err.message
      });
    }

    if (err instanceof APIError || err instanceof Error) {
      if (err.stack) {
        logger.error(err.stack);
      }

      const status = err instanceof APIError ? err.status : 500;

      if (config.env === 'production') {
        return res.status(status).json({
          name: err.name,
          message: status === 500 ? 'Internal Server Error' : err.message
        });
      }

      return res.status(status).json({
        name: err.name,
        message: err.message,
        stack: err.stack
      });
    }

    return res.status(500).send();
  };


  app.use(errorHandler);
};
