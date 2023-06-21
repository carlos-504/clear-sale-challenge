import { Express } from 'express';
import location from './location';

export default (app: Express): void => {
   app.use(location);
};
