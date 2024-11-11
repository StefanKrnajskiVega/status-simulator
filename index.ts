import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as config from './config/config';
import { logger } from './src/logger';
import routes from './src/routes';
export const app = express();
export function stopServer() {
  server.close();
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors({ origin: config.data.frontOfficeAllowCors }));

const server = app.listen(config.data.port as number, () => {
  logger.info(`Server up and running  on - ${config.data.host}:${config.data.port}`);
  routes(app);
});
