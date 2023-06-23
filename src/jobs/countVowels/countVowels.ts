import logger from '../../config/logger';

const countVowels = (word: string, cb: (count: number) => void): void => {
   logger.info('start job');
   const vowels = ['a', 'e', 'i', 'o', 'u'];

   logger.info('countig vowels');
   const volwelsWOrd = word.split('').filter((letter) => vowels.includes(letter.toLocaleLowerCase()));
   logger.info('completed vowel count');

   cb(volwelsWOrd.length);
   logger.info('end job');
};

export default countVowels;
