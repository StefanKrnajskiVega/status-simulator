import { logger } from '../logger';
import { Request, Response } from 'express';
import { get } from '../services/config.service';


export async function getConfig (req: Request, res: Response) {
  try {
    const configuration = get();
    return res.send(configuration);
  } catch (e) {
    logger.error(`configController::getConfig - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}