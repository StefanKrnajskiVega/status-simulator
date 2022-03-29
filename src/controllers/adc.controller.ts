import { logger } from '../logger';
import { Request, Response } from 'express';
import { getState, resetState, forceErrorState } from '../services/adc.service'


export async function getADCState (req: Request, res: Response) {
  try {
    const state = getState();
    return res.send(state);
  } catch (e) {
    logger.error(`adcController::getState - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}

export async function resetADCState (req: Request, res: Response) {
    try {
      const state = resetState();
      return res.send(state);
    } catch (e) {
      logger.error(`adcController::resetState - error while getting config: ${e}`);
      return res.status(400).send(e);
    }
  }


  export async function forceADCError (req: Request, res: Response) {
    try {
      const state = forceErrorState();
      return res.send(state);
    } catch (e) {
      logger.error(`adcController::forceError - error while getting config: ${e}`);
      return res.status(400).send(e);
    }
  }