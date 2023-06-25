interface ClearErrorInt<T> {
   message: string;
   statusCode: number;
   description: string;
   data?: T;
}

export default class ClearError<T> extends Error {
   // error: string;
   // statusCode: number;
   // data?: T;
   errorProperties: ClearErrorInt<T>;

   constructor(errorProperties: ClearErrorInt<T>) {
      super(errorProperties.message);
      this.errorProperties = errorProperties;
   }
}
