import { readFileSync } from "fs";

export function reloadData() {
  data = JSON.parse(readFileSync("./config/devices.json", "utf8"));
}

export let data = JSON.parse(readFileSync("./config/devices.json", "utf8"));
