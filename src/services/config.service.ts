import * as config from "../../config/config";
import { initDevices } from "./device.service";

export function get () {
  return { 
    devices: config.data.devices
  }
}

export function reloadConfiguration() {
  config.reloadData();
  initDevices();
}
