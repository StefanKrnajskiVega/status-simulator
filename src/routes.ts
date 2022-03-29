
import { Express, Request, Response } from 'express';
import { getConfig } from './controllers/config.controller';
import {getPICState , resetPICState, forcePICError} from './controllers/pic.controller'
import {getADCState , resetADCState, forceADCError} from './controllers/adc.controller'

export default function (app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.get('/configuration', getConfig);

  app.get('/pic/status', getPICState);

  app.post('/pic/reset', resetPICState);

  app.post('/pic/force_error', forcePICError);

  app.get('/adc/status', getADCState);

  app.post('/adc/reset', resetADCState);

  app.post('/adc/force_error', forceADCError);
}