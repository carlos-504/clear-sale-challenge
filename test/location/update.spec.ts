import 'dotenv/config';
import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';

describe('LocationController - Update', () => {
   beforeAll(async () => {
      logger.info('start update tests');
      await location.listPagination();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test('must make a request to the endpoint put /location and update location', async () => {
      const id = 98;

      const { text, status } = await req(server).put(`/location/${id}`).send({
         name: 'Taguatinga',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
      });
      let response: ResponseInt<ResultsLocation> = JSON.parse(text);

      delete response.data.created;

      expect(response.success).toBe(true);
      expect(response.error).toBe(null);
      expect(response.message.description).toBe('Local atualizado com sucesso');
      expect(response.data).toEqual({
         id,
         name: 'Taguatinga',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
         url: `${process.env.BASE_URL}/location/${id}`,
      });
      expect(status).toBe(200);
   });

   test('must make a request to the endpoint put /location/{id} and return a field required error', async () => {
      const { text, status } = await req(server).put(`/location/98`).send({
         // name: 'Taguatinga',
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

   test('must make a request to the endpoint put /location/{id} and return a location not found error', async () => {
      const id = 189;

      const { text, status } = await req(server).put(`/location/${id}`).send({
         name: 'Taguatinga',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
      });
      let response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(false);
      expect(response.error).toBe(`the location of id ${id} not found`);
      expect(response.message.description).toBe(`O local de id ${id} não existe`);
      expect(response.data).toBe(null);
      expect(status).toBe(400);
   });
});
