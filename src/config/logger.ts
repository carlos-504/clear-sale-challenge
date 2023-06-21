import { createLogger, transports, format } from 'winston';

const customFormat = format.printf(({ level, message, label, timestamp }) => {
   return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
   format: format.combine(
      format.timestamp({
         format: 'DD-MM-YYYY HH:mm:ss',
      }),
      customFormat
   ),
   transports: [new transports.Console()],
   level: 'debug',
});

export default logger;
