import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';

describe('LocationController - List by Id', () => {
   beforeAll(async () => {
      logger.info('start tests list by id');
      await location.listPagination();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test('must make a request to the endpoint /location/{id} and list locations by id', async () => {
      const { text, status } = await req(server).get(`/location/124`);

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

   test('must make a request to the endpoint /location/{id} and return null', async () => {
      const { text, status } = await req(server).get(`/location/188`);

      const response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(true);
      expect(response.error).toBe(null);
      expect(response.message.description).toBe('Local não encontrado');
      expect(response.data).toEqual(null);
      expect(status).toBe(200);
   }, 10000);
});
