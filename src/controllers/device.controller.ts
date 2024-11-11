import { logger } from '../logger';
import { Request, Response } from 'express';
import { getState, resetState, forceErrorState } from '../services/device.service'


export async function getDeviceState (req: Request, res: Response) {
  try {
    const deviceName = req.params["deviceName"];
    const state = getState(deviceName);
    return res.send(state);
  } catch (e) {
    logger.error(`adcController::getState - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}

export async function resetDeviceState (req: Request, res: Response) {
  try {
    const deviceName = req.params["deviceName"];
    const state = resetState(deviceName);
    return res.send(state);
  } catch (e) {
    logger.error(`adcController::resetState - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}


export async function forceDeviceError (req: Request, res: Response) {
  try {
    const deviceName = req.params["deviceName"];
    const state = forceErrorState(deviceName);
    return res.send(state);
  } catch (e) {
    logger.error(`adcController::forceError - error while getting config: ${e}`);
    return res.status(400).send(e);
  }
}
