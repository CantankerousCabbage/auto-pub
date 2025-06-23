import { logError, logInfo } from './logging.js';

//Shell library
import { exec } from 'child_process';

//Async version of exec
import { promisify } from 'util';
const execPromise = promisify(exec);

/**
 * Runs a given make command in the specified working directory.
 * @param workingDirectory - The directory in which the make command should be run.
 * @param target - The target to be built by the make command.
 * @param args - Additional arguments to be passed to the make command.
 * @returns {boolean} - True if the make command was successful, false otherwise.
 */
export const runMake = async (
  workingDirectory: string,
  target: string,
  ...args: string[]
) => {
  try {
    const { stdout, stderr } = await execPromise(
      `make ${[target, ...args].join(' ')}`,
      { cwd: workingDirectory },
    );

    // Even if stderr is non-empty, we will treat this as non-fatal since error was not thrown
    if (stdout) logInfo(stdout);
    if (stderr) logError(stderr);
  } catch (error) {
    if (error?.stdout) logInfo(error.stdout);
    if (error?.stderr) logError(error.stderr);
    logError(error.message);
    return false;
  }

  return true;
};