import sinon from 'sinon';
import logger from '../../src/config/logger';
import countVowels from '../../src/jobs/countVowels/countVowels';

describe('countVowels', () => {
   let loggerInfoStub: any;
   logger.info('start tests list');

   beforeEach(() => {
      loggerInfoStub = sinon.stub(logger, 'info');
   });

   afterEach(() => {
      loggerInfoStub.restore();
   });

   afterAll(() => {
      logger.info('tests concluded');
   });

   test('should count vowels correctly', () => {
      const word = 'Hello World';

      const executeCb = (count: number): void => {
         logger.info(`number of vowels ${count}`);
      };

      countVowels(word, executeCb);

      sinon.assert.calledWith(loggerInfoStub, 'start job');
      sinon.assert.calledWith(loggerInfoStub, 'counting vowels');
      sinon.assert.calledWith(loggerInfoStub, 'completed vowel count');
      sinon.assert.calledWith(loggerInfoStub, 'number of vowels 3');
      sinon.assert.calledWith(loggerInfoStub, 'end job');
   });

   test('should count vowels correctly', () => {
      const word = 'Wrld';

      const executeCb = (count: number): void => {
         logger.info(`number of vowels ${count}`);
      };

      countVowels(word, executeCb);

      sinon.assert.calledWith(loggerInfoStub, 'start job');
      sinon.assert.calledWith(loggerInfoStub, 'counting vowels');
      sinon.assert.calledWith(loggerInfoStub, 'completed vowel count');
      sinon.assert.calledWith(loggerInfoStub, 'number of vowels 0');
      sinon.assert.calledWith(loggerInfoStub, 'end job');
   });
});
