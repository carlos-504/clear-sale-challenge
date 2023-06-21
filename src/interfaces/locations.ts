interface ResultsLocation {
   id: 1;
   name: string;
   type: string;
   dimension: string;
   residents: string[];
   url: string;
   created: string;
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
