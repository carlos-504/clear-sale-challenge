import logger from '../../config/logger';
import countVowels from './countVowels';

const executeCb = (count: number): void => {
   logger.info(`number of vowels ${count}`);
};

countVowels('Clear', executeCb);
