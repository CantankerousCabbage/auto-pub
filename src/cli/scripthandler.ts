import { generateInternalPath } from './utils/utilPath.js';
import { logError, logInfo, logDebug } from './utils/logging.js';

import { execa } from 'execa';
import path from 'path';
import fs from 'fs';
import { stdout } from 'process';

/**
 *
 * @param scriptName
 * @param args name of the script to run, e.g. 'test.sh'
 * @returns
 */
export const runScript = async (scriptName: string, ...args: string[]) : Promise<string> => {

  logDebug(`Arguements received:  ${args}`);

  const scriptPath = generateInternalPath(`./scripts/${scriptName}`);

  const scriptFound = fs.existsSync(scriptPath);
  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Script not found: ${scriptPath}`);
  }

  // Ensure it's executable
  try {
    fs.chmodSync(scriptPath, 0o755);
  } catch (error: unknown) {
    // Ignore chmod errors on Windows
    logDebug(`Failed to update script permissions`)
  }

  // Will throw an error if script fails (caught in action)
  const result = await execa(scriptPath, args);
  logDebug(`Script result code: ${result.code}`);

  const { stdout } = result;

  return stdout;
};