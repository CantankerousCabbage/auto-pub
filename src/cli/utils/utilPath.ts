
import fs from 'fs';
import path from 'path';
import { logDebug, logError } from './logging.js';
import { fileURLToPath } from 'url';

// Path to compiled CLI root dir
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Backtrack to root (src) -> dist/src <here>/utils
const projectRoot = path.resolve(__dirname, '../');

export const generateInternalPath = (target: string) : string => {
    return path.join(projectRoot, target);
}

export const generateProcessPath = (target: string) : string => {
    return path.join(process.cwd(), target);
}

export const internalPathExists = (target: string) : boolean => {


    // Work from src not src/utils
    const fullPath = path.join(projectRoot, target);

    if (!fs.existsSync(fullPath)) {
        logDebug(`Path does not exist: ${fullPath}`);
        return false;
    }

    return true;
};

export const processPathExists = (target: string) : boolean => {

    const fullPath = path.join(process.cwd(), target);

    if (!fs.existsSync(fullPath)) {
        logError(`Path does not exist: ${fullPath}`);
        return false;
    }

    return true;
};

export const createFolder = (path: string) : boolean => {

    let success = false;
    logDebug(`Creating folder: ${path}`);

    if (!fs.existsSync(path)) {

        try {
            fs.mkdirSync(path);
        } catch (error) {
            logError(`Error creating folder ${path}: ${error.message}`);
            success = false;
        }

        logError(`Path does not exist: ${path}`);
    } else {
        logDebug(`Folder: ${path} already exists.`);
    }

    return success;
}

