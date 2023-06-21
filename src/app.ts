import express, { Express } from 'express';
import 'dotenv/config';
import compression from 'compression';
import helmet from 'helmet';
import routesMap from './routes';

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
   }

   routes(app: Express): void {
      routesMap(app);
   }
}

export default new App().server;
