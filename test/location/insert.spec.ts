import 'dotenv/config';
import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';

let id: number;

describe('LocationController - Insert', () => {
   beforeAll(async () => {
      logger.info('start insert tests');
      id = (await location.listPagination()) + 1;
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test('must make a request to the endpoint post /location and insert location', async () => {
      const { text, status } = await req(server).post(`/location`).send({
         name: 'Samambaia sul',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
      });
      let response: ResponseInt<ResultsLocation> = JSON.parse(text);

      delete response.data.created;

      expect(response.success).toBe(true);
      expect(response.error).toBe(null);
      expect(response.message.description).toBe('Local inserido com sucesso');
      expect(response.data).toEqual({
         id,
         name: 'Samambaia sul',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
         url: `${process.env.BASE_URL}/location/${id}`,
      });
      expect(status).toBe(200);
   });

   test('must make a request to the endpoint post /location and return a error', async () => {
      const { text, status } = await req(server).post(`/location`).send({
         // name: 'Samambaia sul',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
      });
      let response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(false);
      expect(response.error).toBe('the field name is required');
      expect(response.message.description).toBe('O campo name é obrigatório');
      expect(response.data).toBe(null);
      expect(status).toBe(400);
   });
});
