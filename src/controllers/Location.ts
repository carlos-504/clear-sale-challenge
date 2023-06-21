import axios, { AxiosResponse } from 'axios';
import { Request, Response } from 'express';
import Utils from '../utils';
import logger from '../config/logger';
import { RespListLocation } from '../interfaces/locations';
import ClearError from '../errors/clearError';

export default class Location {
   private apiUrl: string;

   constructor() {
      this.apiUrl = process.env.BASE_URL as string;
   }

   async list(req: Request, res: Response): Promise<Response> {
      logger.info('start request');
      const title = 'Listagem dos locais';
      try {
         let description = 'Locais listados com sucesso';

         const locations = await axios.get<
            any,
            AxiosResponse<RespListLocation>
         >(`${process.env.BASE_URL}/location`);

         if (!locations.data.results.length) {
            description = 'Nenhum local encontrado';
         }

         let ret = Utils.responseSuccess(
            title,
            description,
            locations.data.results
         );

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
}
