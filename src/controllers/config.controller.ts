import { logger } from '../logger';
import { Request, Response } from 'express';
import { get, reloadConfiguration } from '../services/config.service';


export async function getConfig (req: Request, res: Response) {
  try {
    const configuration = get();
    return res.send(configuration);
  } catch (e) {
    logger.error(`configController::getConfig - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}


export async function reloadConfig (req: Request, res: Response) {
  try {
    reloadConfiguration();
    return res.status(200).send();
  } catch (e) {
    logger.error(`configController::reloadConfig - error while reloading the configuration: ${e}`);
    return res.status(500).send(e);
  }
}
