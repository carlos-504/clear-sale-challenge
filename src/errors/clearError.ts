export default class ClearError<T> extends Error {
   error: string;
   statusCode: number;
   data?: T
   
   constructor(
      message: string,
      statusCode: number = 400,
      data?: T
   ) {
      super(message);
      this.statusCode = statusCode;
      this.error = message;
      this.data = data;
   }
}
