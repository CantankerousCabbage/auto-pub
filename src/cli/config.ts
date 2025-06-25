import { Config } from "./types/config.types.js";

let settings : Config = {
    debug: false,
}

const updateConfig = (partial : Partial<Config>) : void => {
    settings = { ...settings, ...partial };
}

const getConfig = () : Config => {
 return settings;
}

export const config = {
    get: getConfig,
    update: updateConfig
}