export interface ResponseInt<T> {
   service: string;
   success: boolean;
   message: { title: string; description: string };
   error: string | null | unknown | Object;
   data: T;
}

export interface ClearErrorInt<T> {
   message: string;
   statusCode: number;
   description: string;
   data?: T;
}
