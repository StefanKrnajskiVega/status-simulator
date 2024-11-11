
import { createLogger, transports, format } from 'winston';
import * as config from './../../config/config';

const transportsArray = [];
transportsArray.push(new transports.Console({ level: config.data.loggerConfiguration.consoleLogLevel }));

if (config.data.loggerConfiguration.logToFile) {
  transportsArray.push(new transports.File({ filename: 'logs/' + config.data.loggerConfiguration.filename, level: config.data.loggerConfiguration.fileLogLevel }));
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
