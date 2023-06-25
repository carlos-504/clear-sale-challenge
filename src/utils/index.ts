import ClearError from '../errors/clearError';
import { ResultsLocation } from '../interfaces/locations';
import { ResponseInt } from '../interfaces/utils';

export default class Utils {
   constructor() {}

   static getErrorMessage<T>(error: unknown) {
      if (error instanceof ClearError) {
         return {
            message: error.errorProperties.message,
            statusCode: error.errorProperties.statusCode,
            data: error.errorProperties.data as T,
            description: error.errorProperties.description,
         };
      }

      return { message: String(error), statusCode: 400, description: 'Aconteceu algum erro no processo, tente novamente' };
   }

   static responseSuccess<T>(title: string, description: string, data: T): ResponseInt<T> {
      return {
         service: 'CLEAR-SALE-API',
         success: true,
         message: {
            title,
            description,
         },
         error: null,
         data,
      };
   }

   static responseFail(title: string, description: string, error: string | unknown | Object | null): ResponseInt<null> {
      return {
         service: 'CLEAR-SALE-API',
         success: false,
         message: {
            title,
            description,
         },
         error,
         data: null,
      };
   }

   static validatesFieldsLocations(fiels: ResultsLocation) {
      const requiredFields = ['name', 'type', 'dimension', 'residents'];

      for (const prop of requiredFields) {
         if (!(prop in fiels)) {
            throw new ClearError({ message: `the field ${prop} is required`, statusCode: 400, description: `O campo ${prop} é obrigatório` });
         }
      }
   }
}
