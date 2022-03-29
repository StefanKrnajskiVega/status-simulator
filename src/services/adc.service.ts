import { clearInterval } from 'timers';
import config from '../../config/config';
import { logger } from '../logger';
import { randomTransitionValue } from '../utils/transition.state';

let adcCurrentState = config.transitionStates[0];
let adcTransitionInterval: any;
let adcFaultTimeout: any;

export function initAdc() {
  logger.info('adcService:: state initialized with idle');
  setTimeout(() => {
    adcCurrentState = config.transitionStates[1];
    startRandomTransitions();
    logger.info(
      `adcService:initAdc - adc idle state changed to ${adcCurrentState} , and random transitions for adc initialized`
    );
  }, (config.adc.transitionTime as number) * 1000);
}

export function startRandomTransitions() {
  adcTransitionInterval = setInterval(() => {
    let randomValue = randomTransitionValue();
    logger.debug(
      `adcService::randomTransitionsInterval - adcCurrentState=${adcCurrentState} - ADCStateAssigned=${randomValue}`
    );
    monitorFault(randomValue);
    adcCurrentState = randomValue;
  }, (config.adc.transitionTime as number) * 1000);
}

export function monitorFault(newVaule: string) {
  if (!adcFaultTimeout && newVaule === config.transitionStates[2]) {
    //start adc fault interval
    adcFaultTimeout = setTimeout(() => {
      // fault recovery time exceeded, cancel adc interval transition and set adc state to fault
      clearInterval(adcTransitionInterval);
      adcTransitionInterval = null;
      adcCurrentState = config.transitionStates[2];
      logger.info(
        `adcService::monitoFault - adcCurrentState=${adcCurrentState} - recovery time exceeded, adc state set to fault`
      );
    }, (config.adc.recoveryTime as number) * 1000);
  }

  if (adcFaultTimeout && newVaule !== config.transitionStates[2]) {
    //adc fault interval already started cancel if new value is not fault
    clearTimeout(adcFaultTimeout);
    adcFaultTimeout = null;
  }
}

export function getState() {
  return { state: adcCurrentState };
}

export function resetState() {
  if (adcFaultTimeout) {
    //clear fault interval if there is one
    clearTimeout(adcFaultTimeout);
    adcFaultTimeout = null;
  }
  if (adcTransitionInterval) {
    clearInterval(adcTransitionInterval);
    adcTransitionInterval = null;
  }
  adcCurrentState = config.transitionStates[3];
  setTimeout(() => {
    adcCurrentState = config.transitionStates[1];
    startRandomTransitions();
  }, (config.adc.resetTime as number) * 1000);
  logger.info(
    `adcService::resetState - adcCurrentState=${adcCurrentState} - after resetTime random transition interval will start`
  );
  return {
    state: adcCurrentState,
  };
}

export function forceErrorState() {
  if (adcFaultTimeout) {
    //clear fault interval if there is one
    clearTimeout(adcFaultTimeout);
    adcFaultTimeout = null;
  }
  if (adcTransitionInterval) {
    clearInterval(adcTransitionInterval);
    adcTransitionInterval = null;
  }
  adcCurrentState = config.transitionStates[2];
  logger.info(
    `adcService::forceErrorState - adcCurrentState=${adcCurrentState} - adc state forced to fault, all intervals stopped`
  );
  return {
    state: adcCurrentState,
  };
}
