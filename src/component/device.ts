import { clearInterval } from 'timers';
import * as config from '../../config/config';
import { logger } from '../logger';
import { randomTransitionValue } from '../utils/transition.state';


export class Device {
  name: string = "";
  recoveryTime: number = 1;
  resetTime: number = 1;
  transitionTime: number = 1;

  currentState: string = config.data.transitionStates[0];
  transitionInterval: any;
  faultTimeout: any;

  destroy() {
    if (this.faultTimeout) {
      clearTimeout(this.faultTimeout);
      this.faultTimeout = null;
    }
    if (this.transitionInterval) {
      clearInterval(this.transitionInterval);
      this.transitionInterval = null;
    }
    logger.info(
      `device::destroy - ${this.name} destroyed`
    );
  }

  initDevice() {
    logger.info('device::initDevice state initialized with idle');
    this.faultTimeout = setTimeout(() => {
      this.currentState = config.data.transitionStates[1];
      this.startRandomTransitions();
      logger.info(
        `device:initDevice - ${this.name} idle state changed to ${this.currentState} , and random transitions for device initialized`
      );
    }, (this.transitionTime as number) * 1000);
  }

  startRandomTransitions() {
    this.transitionInterval = setInterval(() => {
      let randomValue = randomTransitionValue();
      logger.debug(
        `device::randomTransitionsInterval - ${this.name} currentState=${this.currentState} - DeviceStateAssigned=${randomValue}`
      );
      this.monitorFault(randomValue);
      this.currentState = randomValue;
    }, (this.transitionTime as number) * 1000);
  }

  monitorFault(newVaule: string) {
    if (!this.faultTimeout && newVaule === config.data.transitionStates[2]) {
      //start device fault interval
      this.faultTimeout = setTimeout(() => {
        // fault recovery time exceeded, cancel device interval transition and set device state to fault
        clearInterval(this.transitionInterval);
        this.transitionInterval = null;
        this.currentState = config.data.transitionStates[2];
        logger.info(
          `device::monitorFault - ${this.name} currentState=${this.currentState} - recovery time exceeded, ${this.name} state set to fault`
        );
      }, (this.recoveryTime as number) * 1000);
    }

    if (this.faultTimeout && newVaule !== config.data.transitionStates[2]) {
      //device fault interval already started cancel if new value is not fault
      clearTimeout(this.faultTimeout);
      this.faultTimeout = null;
    }
  }

  getState() {
    return { state: this.currentState };
  }

  resetState() {
    if (this.faultTimeout) {
      //clear fault interval if there is one
      clearTimeout(this.faultTimeout);
      this.faultTimeout = null;
    }
    if (this.transitionInterval) {
      clearInterval(this.transitionInterval);
      this.transitionInterval = null;
    }
    this.currentState = config.data.transitionStates[3];
    this.faultTimeout = setTimeout(() => {
      this.currentState = config.data.transitionStates[1];
      this.startRandomTransitions();
    }, (this.resetTime as number) * 1000);
    logger.info(
      `device::resetState - ${this.name} currentState=${this.currentState} - after resetTime random transition interval will start`
    );
    return {
      state: this.currentState,
    };
  }

  forceErrorState() {
    if (this.faultTimeout) {
      //clear fault interval if there is one
      clearTimeout(this.faultTimeout);
      this.faultTimeout = null;
    }
    if (this.transitionInterval) {
      clearInterval(this.transitionInterval);
      this.transitionInterval = null;
    }
    this.currentState = config.data.transitionStates[2];
    logger.info(
      `device::forceErrorState - ${this.name} currentState=${this.currentState} - ${this.name} state forced to fault, all intervals stopped`
    );
    return {
      state: this.currentState,
    };
  }

}
