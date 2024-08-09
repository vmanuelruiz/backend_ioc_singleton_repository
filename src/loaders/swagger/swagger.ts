import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSON from '../../../docs/swagger.json';

export default (app: express.Router): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJSON, {
    swaggerOptions: {
      persistAuthorization: true
    }
  }));
};
