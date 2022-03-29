
import { createLogger, transports, format } from 'winston';
import config from './../../config/config';

const transportsArray = [];
transportsArray.push(new transports.Console({ level: config.loggerConfiguration.consoleLogLevel }));

if (config.loggerConfiguration.logToFile) {
  transportsArray.push(new transports.File({ filename: 'logs/' + config.loggerConfiguration.filename, level: config.loggerConfiguration.fileLogLevel }));
}

export const logger = createLogger({
  transports: transportsArray,
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}]::${level}::${message}`;
    })
  )
});