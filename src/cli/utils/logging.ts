import chalk from 'chalk';

/**
 * Logs debug information in white. Debug must be enabled to view.
 * @returns
 */
export const logDebug = (message: string) =>
  console.debug(chalk.yellow("[Debug]"), chalk.white(message));

/**
 * Logs an informational message in blue color.
 * @param {string} message - The message to be logged.
 */
export const logInfo = (message: string) =>
    console.info(chalk.blue(message));

/**
 * Logs a success message in green color.
 * @param {string} message - The message to be logged.
 */
export const logSuccess = (message: string) =>
  console.log(chalk.green(message));

/**
 * Logs a warning message in yellow color.
 * @param {string} message - The message to be logged.
 */
export const logWarning = (message: string) =>
  console.warn(chalk.yellow(message));

/**
 * Logs an error message in red color.
 * @param {string} message - The message to be logged.
 */
export const logError = (message: string) =>
    console.error(chalk.red(message));

const setDebugLevel = (commandFlag: boolean) => {
  process.env.NODE_DEBUG = commandFlag.toString();
}
