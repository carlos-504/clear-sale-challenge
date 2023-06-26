import { ClearErrorInt } from '../interfaces/utils';

export default class ClearError<T> extends Error {
   errorProperties: ClearErrorInt<T>;

   constructor(errorProperties: ClearErrorInt<T>) {
      super(errorProperties.message);
      this.errorProperties = errorProperties;
   }
}
