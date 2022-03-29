import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config/config';
import { logger } from './src/logger';
import routes from './src/routes';
export const app = express();
export function stopServer() {
  server.close();
}
import { initPic } from './src/services/pic.service';
import { initAdc } from './src/services/adc.service';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: config.frontOfficeAllowCors }));

const server = app.listen(config.port as number, () => {
  logger.info(`Server up and running  on - ${config.host}:${config.port}`);
  routes(app);
  initPic();
  initAdc();
});
