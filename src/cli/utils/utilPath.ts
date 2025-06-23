
import fs from 'fs';
import path from 'path';
import { logError } from './logging.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const internalPath = (target: string) => {

    const fullPath = path.join(__dirname, target);

    if (!fs.existsSync(fullPath)) {
        logError(`Path does not exist: ${fullPath}`);
        return "";
    }

    return path.join(__dirname, target);
};

export const processPath = (target: string) => {

     const fullPath = path.join(process.cwd(), target);

    if (!fs.existsSync(fullPath)) {
        logError(`Path does not exist: ${fullPath}`);
        return "";
    }

    return path.join(process.cwd(), target);
};
