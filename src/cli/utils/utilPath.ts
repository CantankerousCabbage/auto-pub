
import fs from 'fs';
import path from 'path';
import { logError } from './logging.js';
import { fileURLToPath } from 'url';
import { config } from '@/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { debug } = config.get();

export const internalPath = (target: string) => {
    const { debug } = config.get();

    // Work from src not src/utils
    const fullPath = path.join( __dirname, "../", target);

    if (!fs.existsSync(fullPath)) {
        if(debug) logError(`Path does not exist: ${fullPath}`);
        return "";
    }

    return path.join(__dirname, target);
};

export const processPath = (target: string) => {
    const { debug } = config.get();

     const fullPath = path.join(process.cwd(), target);

    if (!fs.existsSync(fullPath)) {
        if(debug) logError(`Path does not exist: ${fullPath}`);
        return "";
    }

    return path.join(process.cwd(), target);
};
