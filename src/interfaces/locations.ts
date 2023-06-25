import { Request } from 'express';

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
