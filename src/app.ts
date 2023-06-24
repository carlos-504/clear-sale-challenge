import express, { Express } from 'express';
import 'dotenv/config';
import compression from 'compression';
import helmet from 'helmet';
import routesMap from './routes';
import swaggerDocs from '../swagger.json';
import swaggerUI from 'swagger-ui-express';

class App {
   public server: Express;

   constructor() {
      this.server = express();

      this.middlewares();
      this.routes(this.server);
   }

   middlewares(): void {
      this.server.use(compression());
      this.server.use(helmet());
      this.server.use(express.json());
      this.server.use(express.urlencoded({ extended: true }));
      this.server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
   }

   routes(app: Express): void {
      routesMap(app);
   }
}

export default new App().server;
