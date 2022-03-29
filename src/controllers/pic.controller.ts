import { logger } from '../logger';
import { Request, Response } from 'express';
import { getState, resetState, forceErrorState } from './../services/pic.service'


export async function getPICState (req: Request, res: Response) {
  try {
    const state = getState();
    return res.send(state);
  } catch (e) {
    logger.error(`picController::getState - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}

export async function resetPICState (req: Request, res: Response) {
    try {
      const state = resetState();
      return res.send(state);
    } catch (e) {
      logger.error(`picController::resetState - error while getting config: ${e}`);
      return res.status(400).send(e);
    }
  }


  export async function forcePICError (req: Request, res: Response) {
    try {
      const state = forceErrorState();
      return res.send(state);
    } catch (e) {
      logger.error(`picController::forceError - error while getting config: ${e}`);
      return res.status(400).send(e);
    }
  }