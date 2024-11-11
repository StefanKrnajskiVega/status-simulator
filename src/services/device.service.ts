import * as config from "../../config/config";
import { Device } from "../component/device";

let devices = new Map<string, Device>();
initDevices();

export function initDevices() {
  devices.forEach(device => {
    device.destroy();
  });
  devices.clear();
  config.data.devices.forEach((deviceData: Device) => {
    let device = new Device();
    device.name = deviceData.name;
    device.recoveryTime = deviceData.recoveryTime;
    device.resetTime = deviceData.resetTime;
    device.transitionTime = deviceData.transitionTime;
    device.initDevice();
    devices.set(device.name, device);
  });
}

export function resetState(deviceName: string) {
  return devices.get(deviceName)?.resetState();
}

export function getState(deviceName: string) {
  return devices.get(deviceName)?.getState();
}

export function forceErrorState(deviceName: string) {
  return devices.get(deviceName)?.forceErrorState();
}
