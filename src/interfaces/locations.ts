import { Request, Express } from 'express';

export interface ResultsLocation {
   id?: number;
   name: string;
   type: string;
   dimension: string;
   residents: string[];
   url?: string;
   created?: Date;
}

export interface RespListLocation {
   info: {
      count: number;
      pages: number;
      next: string;
      prev: null;
   };
   results: ResultsLocation[];
}

export interface InputLocationReq extends Request {
   body: ResultsLocation;
}

export interface QueryReq {
   // Defina a estrutura e os tipos esperados para req.query
   // Exemplo:
   page: number;
   per_page: number;
   // ...
}
