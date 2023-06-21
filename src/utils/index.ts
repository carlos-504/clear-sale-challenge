import ClearError from '../errors/clearError';
import { ResponseInt } from '../interfaces/utils';

export default class Utils {
   constructor() {}

   static getErrorMessage<T>(error: unknown) {
      if (error instanceof ClearError) {
         return {
            message: error.message,
            statusCode: error.statusCode,
            data: error.data as T,
         };
      }

      return { message: String(error), statusCode: 400 };
   }

   static responseSuccess<T>(
      title: string,
      description: string,
      data: T
   ): ResponseInt<T> {
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

   static responseFail(
      title: string,
      description: string,
      error: string | unknown | Object | null
   ): ResponseInt<null> {
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
}
