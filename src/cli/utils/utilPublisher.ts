
import fs from 'fs';
import path from 'path';
import { logError, logInfo } from './logging.js';
import { fileURLToPath } from 'url';
import { internalPath } from './utilPath.js';
import { IG_PUBLISHER_JAR } from '@/constants/constant.js';
import { PublisherState } from '@/types/choiceInput.js';
import { config } from '@/config.js';
/**
 *
 * @returns PublisherSate enum specifying the state of the publisher.
 */
export const checkPublisher = () : PublisherState => {
    const exists = true;

    const jarPath = internalPath(IG_PUBLISHER_JAR);
    let state : PublisherState = PublisherState.UpToDate;
    if(jarPath !== '' && fs.lstatSync(jarPath).isFile()) {
         logInfo(`Publisher JAR found`);
    } else {
        logError(`Publisher JAR not found: ${jarPath}`);
        state = PublisherState.NotFound;
    }

    return state;
};


    // const { stdout, stderr } = await execPromise(
    //   `make ${[target, ...args].join(' ')}`,
    //   { cwd: workingDirectory },
    // );

    // // Even if stderr is non-empty, we will treat this as non-fatal since error was not thrown
    // if (stdout) logInfo(stdout);
    // if (stderr) logError(stderr);