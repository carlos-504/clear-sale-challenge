import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import Utils from '../utils';
import logger from '../config/logger';
import ClearError from '../errors/clearError';
import { RespListLocation, ResultsLocation, InputLocationReq, QueryReq } from '../interfaces/locations';

class Location {
   private static apiUrl: string;
   private static locationsItems: ResultsLocation[];

   constructor() {
      Location.apiUrl = process.env.BASE_URL as string;
      Location.locationsItems = [];
   }

   async list(req: Request<any, any, any, QueryReq>, res: Response): Promise<Response> {
      logger.info('start request');
      const title = 'Listagem dos locais';
      try {
         let description = 'Locais listados com sucesso';
         let { page, per_page } = req.query;

         if (!page) {
            page = 1;
         }

         if (!per_page) {
            per_page = 20;
         }

         const PER_PAGE = per_page;
         const startIndex = (page - 1) * PER_PAGE;
         const endIndex = startIndex + PER_PAGE;

         const newItems = Location.locationsItems.slice(startIndex, endIndex);

         if (!newItems.length) {
            description = 'Nenhum local encontrado';
         }

         const ret = Utils.responseSuccess(title, description, newItems);

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

         const newItem = Location.locationsItems.filter((item) => {
            return item.id == id;
         });

         if (!newItem.length) {
            throw new ClearError({
               message: `location id ${id} was not exist`,
               statusCode: 400,
               description: `O local de id ${id} não existe`,
            });
         }

         const ret = Utils.responseSuccess(title, description, newItem[0]);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('list location by id failed');
         logger.error(err);

         const { message, statusCode, description } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, description, message);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   insert(req: InputLocationReq, res: Response): Response {
      logger.info('start request');
      const title = 'Inserção de local Rick e Morty';
      try {
         const description = 'Local inserido com sucesso';
         const locationsItems = Location.locationsItems;
         const id = locationsItems.length + 1;

         Utils.validatesFieldsLocations(req.body);

         locationsItems.push({
            id,
            ...req.body,
            url: `${Location.apiUrl}/location/${id}`,
            created: new Date(),
         });

         const itemIndex = locationsItems.length - 1;

         const ret = Utils.responseSuccess(title, description, locationsItems[itemIndex]);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('insert location failed');
         logger.error(err);

         const { statusCode, description, message } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, description, message);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   async listPagination(): Promise<number> {
      let locations = await axios.get<RespListLocation>(`${Location.apiUrl}/location`);
      Location.locationsItems.push(...locations.data.results);
      try {
         while (locations.data.info.next) {
            locations = await axios.get(locations.data.info.next);
            Location.locationsItems.push(...locations.data.results);
         }
      } catch (err) {
         logger.error('error on pagination');
         logger.error(err);

         if (err instanceof AxiosError) {
            throw new ClearError({ message: err.message, statusCode: 400, description: 'Erro na integração de dados' });
         }
      }
      return Location.locationsItems.length;
   }

   update(req: Request<{ id: number }>, res: Response): Response {
      logger.info('start request');
      const title = 'Atualização do local por id';
      try {
         const description = 'Local atualizado com sucesso';
         const { id } = req.params;

         Utils.validatesFieldsLocations(req.body as ResultsLocation);

         Location.locationsItems = Location.locationsItems.map((location) => {
            if (id == location.id) {
               location = {
                  id: parseInt(id.toString()),
                  ...req.body,
                  url: location.url,
                  created: location.created,
               };
            }
            return location;
         });

         const updateLocal = Location.locationsItems.filter((item) => item.id == id);

         if (!updateLocal.length) {
            throw new ClearError({
               message: `the location of id ${id} not found`,
               statusCode: 400,
               description: `O local de id ${id} não existe`,
            });
         }

         const ret = Utils.responseSuccess(title, description, updateLocal[0]);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('update failed');
         logger.error(err);

         const { statusCode, description, message } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, description, message);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   delete(req: Request<{ id: number }>, res: Response): Response {
      logger.info('start request');
      const title = 'Exclusão do local por id';
      try {
         const description = 'Local excluído com sucesso';
         const { id } = req.params;

         const verify = Location.locationsItems.some((location) => location.id == id);

         if (!verify) {
            throw new ClearError({
               message: `the location of id ${id} not found`,
               statusCode: 400,
               description: `O local de id ${id} não existe`,
            });
         }

         Location.locationsItems = Location.locationsItems.filter((location) => location.id != id);

         const ret = Utils.responseSuccess(title, description, null);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('delete failed');
         logger.error(err);

         const { message, statusCode, description } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, description, message);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }
}

export default new Location();
