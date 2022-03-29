import config from "../../config/config";

export function get () {
  return { 
      pic: config.pic,
      adc: config.adc
    }
}
