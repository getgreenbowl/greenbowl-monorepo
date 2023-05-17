import {resolve} from "path";
import { APP_SETTINGS } from "../app-settings";

const currentPath = resolve(__dirname);
export const ROOT_FOLDER = currentPath.split(APP_SETTINGS.ROOT_DIR)[0] + APP_SETTINGS.ROOT_DIR;