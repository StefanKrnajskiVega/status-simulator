import { clearInterval } from 'timers';
import config from '../../config/config';
import { logger } from '../logger';
import { randomTransitionValue } from './../utils/transition.state';

let picCurrentState = config.transitionStates[0];
let picTransitionInterval: any;
let picFaultTimeout: any;

export function initPic() {
  logger.info('picService:: state initialized with idle');
  setTimeout(() => {
    picCurrentState = config.transitionStates[1];
    startRandomTransitions();
    logger.info(
      `picService:initPic - pic idle state changed to ${picCurrentState} , and random transitions for pic initialized`
    );
  }, (config.pic.transitionTime as number) * 1000);
}

export function startRandomTransitions() {
  picTransitionInterval = setInterval(() => {
    let randomValue = randomTransitionValue();
    logger.debug(
      `picService::randomTransitionsInterval - picCurrentState=${picCurrentState} - PICStateAssigned=${randomValue}`
    );
    monitorFault(randomValue);
    picCurrentState = randomValue;
  }, (config.pic.transitionTime as number) * 1000);
}

export function monitorFault(newVaule: string) {
  if (!picFaultTimeout && newVaule === config.transitionStates[2]) {
    //start pic fault interval
    picFaultTimeout = setTimeout(() => {
      // fault recovery time exceeded, cancel pic interval transition and set pic state to fault
      clearInterval(picTransitionInterval);
      picTransitionInterval = null;
      picCurrentState = config.transitionStates[2];
      logger.info(
        `picService::monitoFault - picCurrentState=${picCurrentState} - recovery time exceeded, pic state set to fault`
      );
    }, (config.pic.recoveryTime as number) * 1000);
  }

  if (picFaultTimeout && newVaule !== config.transitionStates[2]) {
    //pic fault interval already started cancel if new value is not fault
    clearTimeout(picFaultTimeout);
    picFaultTimeout = null;
  }
}

export function getState() {
  return { state: picCurrentState };
}

export function resetState() {
  if (picFaultTimeout) {
    //clear fault interval if there is one
    clearTimeout(picFaultTimeout);
    picFaultTimeout = null;
  }
  if (picTransitionInterval) {
    clearInterval(picTransitionInterval);
    picTransitionInterval = null;
  }
  picCurrentState = config.transitionStates[3];
  setTimeout(() => {
    picCurrentState = config.transitionStates[1];
    startRandomTransitions();
  }, (config.pic.resetTime as number) * 1000);
  logger.info(
    `picService::resetState - picCurrentState=${picCurrentState} - after resetTime random transition interval will start`
  );
  return {
    state: picCurrentState,
  };
}

export function forceErrorState() {
  if (picFaultTimeout) {
    //clear fault interval if there is one
    clearTimeout(picFaultTimeout);
    picFaultTimeout = null;
  }
  if (picTransitionInterval) {
    clearInterval(picTransitionInterval);
    picTransitionInterval = null;
  }
  picCurrentState = config.transitionStates[2];
  logger.info(
    `picService::forceErrorState - picCurrentState=${picCurrentState} - pic state forced to fault, all intervals stopped`
  );
  return {
    state: picCurrentState,
  };
}
