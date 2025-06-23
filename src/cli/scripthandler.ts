import { internalPath } from './utils/utilPath.js';
import { logError, logInfo } from './utils/logging.js';

import { execa } from 'execa';
import path from 'path';
import fs from 'fs';

/**
 *
 * @param scriptName
 * @param args name of the script to run, e.g. 'test.sh'
 * @returns
 */
export const runScript = async (scriptName: string, ...args: string[]) : Promise<string> => {

  const scriptPath = internalPath(`../scripts/${scriptName}`);

  if (!fs.existsSync(scriptPath)) {
    throw new Error(`Script not found: ${scriptPath}`);
  }

  // Ensure it's executable
  try {
    fs.chmodSync(scriptPath, 0o755);
  } catch (error: unknown) {
    // Ignore chmod errors on Windows
  }

  // Will throw an error if script fails (caught in action)
  const { stdout } = await execa(scriptPath, args);

  return stdout;
};