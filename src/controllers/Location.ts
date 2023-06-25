import axios, { AxiosError } from 'axios';
import { Request, Response } from 'express';
import Utils from '../utils';
import logger from '../config/logger';
import { RespListLocation, ResultsLocation } from '../interfaces/locations';
import ClearError from '../errors/clearError';

class Location {
   private static apiUrl: string;
   public static locationsItems: ResultsLocation[];
   private static isUpdated: boolean;
   private static isDeleted: boolean;

   constructor() {
      Location.apiUrl = process.env.BASE_URL as string;
      Location.locationsItems = [];
      Location.isUpdated = false;
      Location.isDeleted = false;
   }

   async list(req: Request, res: Response): Promise<Response> {
      logger.info('start request');
      const title = 'Listagem dos locais';
      try {
         let description = 'Locais listados com sucesso';
         let pageQuery = '?page=1';
         const { page } = req.query;

         if (page) {
            pageQuery = `?page=${page}`;
         }

         const locations = await axios.get<RespListLocation>(`${Location.apiUrl}/location${pageQuery}`);

         const locationsSize = locations.data.results.length;

         if (!locationsSize) {
            description = 'Nenhum local encontrado';
         }

         let ret = Utils.responseSuccess(title, description, locations.data.results);

         if (Location.locationsItems.length > locationsSize || Location.isUpdated || Location.isDeleted) {
            const PER_PAGE = 20;
            const startIndex = (parseInt(page as string) - 1) * PER_PAGE;
            const endIndex = startIndex + PER_PAGE;

            const newItems = Location.locationsItems.slice(startIndex, endIndex);

            ret = Utils.responseSuccess(title, description, newItems);
         }

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('list locations failed');
         logger.error(err);

         if (err instanceof AxiosError) {
            const ret = Utils.responseFail(title, 'Erro ao executar integração', err.message);

            logger.info('end request');
            return res.status(err.response?.status!).send(ret);
         }

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   async listById(req: Request, res: Response): Promise<Response> {
      logger.info('start request');
      const title = 'Listagem de local por id';
      try {
         const { id } = req.params;
         let description = 'Local listado com sucesso';

         const newItem = Location.locationsItems.filter((item) => {
            return item.id == parseInt(id);
         });

         if (!newItem.length) {
            description = 'Local não encontrado';
         }

         const ret = Utils.responseSuccess(title, description, newItem[0] || null);

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
         const description = 'Local inserido com sucesso';
         const locationsItems = Location.locationsItems;
         const id = locationsItems.length + 1;

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

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }

   async listPagination(): Promise<void> {
      try {
         let locations = await axios.get<RespListLocation>(`${Location.apiUrl}/location`);
         Location.locationsItems.push(...locations.data.results);

         while (locations.data.info.next) {
            locations = await axios.get(locations.data.info.next);
            Location.locationsItems.push(...locations.data.results);
         }
      } catch (err) {
         logger.error('error on pagination');
         logger.error(err);
      }
   }

   update(req: Request<{ id: number }>, res: Response): Response {
      logger.info('start request');
      const title = 'Atualização do local por id';
      try {
         const description = 'Local atualizado com sucesso';
         const { id } = req.params;

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

         Location.isUpdated = true;

         const updateLocal = Location.locationsItems.filter((item) => item.id == id);

         if (!updateLocal.length) {
            throw new ClearError('Não é possível atualizar o item');
         }

         const ret = Utils.responseSuccess(title, description, updateLocal[0]);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('update failed');
         logger.error(err);

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

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
            throw new ClearError('O id do local não existe');
         }

         Location.locationsItems = Location.locationsItems.filter((location) => location.id != id);
         Location.isDeleted = true;

         const ret = Utils.responseSuccess(title, description, null);

         logger.info('end request');
         return res.send(ret);
      } catch (err) {
         logger.error('error on proccess');
         logger.error('delete failed');
         logger.error(err);

         const { message, statusCode } = Utils.getErrorMessage(err);
         const ret = Utils.responseFail(title, message, err);

         logger.info('end request');
         return res.status(statusCode).send(ret);
      }
   }
}

export default new Location();
