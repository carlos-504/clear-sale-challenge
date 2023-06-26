import 'dotenv/config';
import req from 'supertest';
import server from '../../src/app';
import logger from '../../src/config/logger';
import location from '../../src/controllers/Location';
import { ResponseInt } from '../../src/interfaces/utils';
import { ResultsLocation } from '../../src/interfaces/locations';

describe('LocationController - Update', () => {
   const successId = 98;
   const failedId = 200;

   beforeAll(async () => {
      logger.info('start update tests');
      await location.listPagination();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test(`must make a request to the endpoint put /location/${successId} and update location`, async () => {
      const { text, status } = await req(server).put(`/location/${successId}`).send({
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
         id: successId,
         name: 'Taguatinga',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
         url: `${process.env.BASE_URL}/location/${successId}`,
      });
      expect(status).toBe(200);
   });

   test(`must make a request to the endpoint put /location/${successId} and return a field required error`, async () => {
      const { text, status } = await req(server).put(`/location/${successId}`).send({
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

   test(`must make a request to the endpoint put /location/${failedId} and return a location not found error`, async () => {
      const { text, status } = await req(server).put(`/location/${failedId}`).send({
         name: 'Taguatinga',
         type: 'Planeta Terra',
         dimension: 'C-137',
         residents: [],
      });
      let response: ResponseInt<ResultsLocation> = JSON.parse(text);

      expect(response.success).toBe(false);
      expect(response.error).toBe(`the location of id ${failedId} not found`);
      expect(response.message.description).toBe(`O local de id ${failedId} não existe`);
      expect(response.data).toBe(null);
      expect(status).toBe(400);
   });
});
