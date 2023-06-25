import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';

describe('LocationController - List', () => {
   beforeAll(async () => {
      logger.info('start tests list');
      await location.listPagination();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test('must make a request to the endpoint get /location and list locations', async () => {
      const { text, status } = await req(server).get(`/location`);

      const response: ResponseInt<ResultsLocation[]> = JSON.parse(text);

      expect(response.success).toBe(true);
      expect(response.error).toBe(null);
      expect(response.message.description).toBe('Locais listados com sucesso');
      expect(Array.isArray(response.data)).toBe(true);
      expect(status).toBe(200);
   });

   test('must make a request to the endpoint get /location and not find the locations', async () => {
      const { text, status } = await req(server).get(`/location?page=10`);

      let { data, error, message, success }: ResponseInt<ResultsLocation[]> = JSON.parse(text);

      expect(success).toBe(true);
      expect(error).toBe(null);
      expect(message.description).toBe('Nenhum local encontrado');
      expect(Array.isArray(data)).toBe(true);
      expect(status).toBe(200);
   });

   // test('must make a request to the endpoint/location and api integration return error', async () => {
   //    let { text, status } = await req(server).get(`/location?page=10`);

   //    let { data, error, message, success }: ResponseInt<ResultsLocation[]> = JSON.parse(text);

   //    expect(success).toBe(false);
   //    expect(error).toBe('Request failed with status code 404');
   //    expect(message.description).toBe('Erro ao executar integração');
   //    expect(data).toBe(null);
   //    expect(status).toBe(404);
   // });
});
