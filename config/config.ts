import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export default {
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
  frontOfficeAllowCors:
    process.env.FRONTOFFICE_ALLOW_CORS || 'http://localhost:4200',
  transitionStates:["idle", "operational", "fault", "resetting"],
  pic: {
    recoveryTime: process.env.PIC_RECOVERY_TIME || 3,
    resetTime: process.env.PIC_RESET_TIME || 3,
    transitionTime: process.env.PIC_TRANSITION_TIME || 1,
  },
  adc: {
    recoveryTime: process.env.ADC_RECOVERY_TIME || 3,
    resetTime: process.env.ADC_RESET_TIME || 5,
    transitionTime: process.env.ADC_TRANSITION_TIME || 1,
  },
  loggerConfiguration: {
    consoleLogLevel: process.env.LOG_CONSOLE_LEVEL || 'debug',
    logToFile: process.env.LOG_TO_FILE || true,
    fileLogLevel: process.env.LOG_FILE_LEVEL || 'debug',
    filename: 'server.log',
  },
};
