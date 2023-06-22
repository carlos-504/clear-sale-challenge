import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import Utils from '../utils';
import logger from '../config/logger';
import { RespListLocation, ResultsLocation } from '../interfaces/locations';
import locationArray from '../../mock.json';

export default class Location {
   private static apiUrl: string;
   private static locationsItems: ResultsLocation[];

   constructor() {
      Location.apiUrl = process.env.BASE_URL as string;
      Location.locationsItems = [];
   }

   async list(req: Request, res: Response): Promise<Response> {
      logger.info('start request');
      const title = 'Listagem dos locais';
      try {
         let description = 'Locais listados com sucesso';

         const locations = await axios.get<any, AxiosResponse<RespListLocation>>(
            `${Location.apiUrl}/location`
         );

         if (!locations.data.results.length) {
            description = 'Nenhum local encontrado';
         }

         if (Location.locationsItems.length === 0) {
            Location.locationsItems.push(...locations.data.results);
         }

         const ret = Utils.responseSuccess(title, description, Location.locationsItems);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('list locations failed');
         logger.error(err);

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   async listById(req: Request<{ id: number }>, res: Response): Promise<Response> {
      logger.info('start request');
      const title = 'Listagem de local por id';
      try {
         const { id } = req.params;
         let description = 'Local listado com sucesso';

         const location = await axios.get<any, AxiosResponse<ResultsLocation>>(
            `${Location.apiUrl}/location/${id}`
         );
         const ret = Utils.responseSuccess(title, description, location.data);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('list location by id failed');
         logger.error(err);

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   insert(req: Request, res: Response): Response {
      logger.info('start request');
      const title = 'Inserção de local Rick e Morty';
      try {
         const { id, ...rest }: ResultsLocation = req.body || ({} as ResultsLocation);
         const description = 'Local inserido com sucesso';
         const locationsItems = Location.locationsItems;

         locationsItems.push({
            id: locationsItems.length + 1,
            ...rest,
         });

         const itemIndex = locationsItems.length - 1;

         const ret = Utils.responseSuccess(title, description, locationsItems[itemIndex]);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('insert location failed');
         logger.error(err);

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }
}
