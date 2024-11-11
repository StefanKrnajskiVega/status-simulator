import * as config from '../../config/config';

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomTransitionValue() {
  return config.data.transitionStates[randomIntFromInterval(1, 2)];
  //return config.transitionStates[2];
}
