import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';

describe('LocationController - List by Id', () => {
   const successId = 124;
   const failedId = 200;

   beforeAll(async () => {
      logger.info('start tests list by id');
      await location.listPagination();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test(`must make a request to the endpoint get /location/${successId} and list locations by id`, async () => {
      const { text, status } = await req(server).get(`/location/${successId}`);

      const mockLocation = {
         id: 124,
         name: 'Slartivart',
         type: 'Planet',
         dimension: 'Replacement Dimension',
         residents: ['https://rickandmortyapi.com/api/character/797'],
         url: 'https://rickandmortyapi.com/api/location/124',
         created: '2021-11-02T13:07:27.619Z',
      };

      const response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(true);
      expect(response.error).toBe(null);
      expect(response.message.description).toBe('Local listado com sucesso');
      expect(response.data).toEqual(mockLocation);
      expect(status).toBe(200);
   }, 10000);

   test(`must make a request to the endpoint get /location/${failedId} and return null`, async () => {
      const { text, status } = await req(server).get(`/location/${failedId}`);

      const response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(false);
      expect(response.error).toBe(`location id ${failedId} was not exist`);
      expect(response.message.description).toBe(`O local de id ${failedId} não existe`);
      expect(response.data).toEqual(null);
      expect(status).toBe(400);
   }, 10000);
});
