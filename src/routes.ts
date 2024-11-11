
import { Express, Request, Response } from 'express';
import { getConfig, reloadConfig } from './controllers/config.controller';
import {getDeviceState , resetDeviceState, forceDeviceError} from './controllers/device.controller'

export default function (app: Express) {

  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
  app.get('/configuration', getConfig);
  app.get('/:deviceName/status', getDeviceState);

  app.post('/:deviceName/reset', resetDeviceState);
  app.post('/reload-configuration', reloadConfig);
  app.post('/:deviceName/force_error', forceDeviceError);

}
