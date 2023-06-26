import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';


describe('LocationController - Delete by Id', () => {
   const successId = 124;
   const failedId = 200;
   
   beforeAll(async () => {
      logger.info('start tests delete by id');
      await location.listPagination();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test(`must make a request to the endpoint delete /location/${successId} and delete location by id`, async () => {
      const { text, status } = await req(server).delete(`/location/${successId}`);

      const response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(true);
      expect(response.error).toBe(null);
      expect(response.message.description).toBe('Local excluído com sucesso');
      expect(response.data).toEqual(null);
      expect(status).toBe(200);
   });

   test(`must make a request to the endpoint delete /location/${failedId} and return not found error`, async () => {
      const { text, status } = await req(server).delete(`/location/${failedId}`);

      const response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(false);
      expect(response.error).toBe(`the location of id ${failedId} not found`);
      expect(response.message.description).toBe(`O local de id ${failedId} não existe`);
      expect(response.data).toEqual(null);
      expect(status).toBe(400);
   }, 10000);
});
