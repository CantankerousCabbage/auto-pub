
import fs from 'fs';
import path from 'path';
import { logError, logInfo } from './logging.js';
import { generateInternalPath, internalPathExists } from './utilPath.js';
import { IG_PUBLISHER_DOWNLOAD_URL, IG_PUBLISHER_JAR, IG_PUBLISHER_VERSION_URL } from '@/constants/constant.js';
import { PublisherState } from '@/types/choiceInput.js';
import { config } from '@/config.js';

import { runScript } from '@/scripthandler.js';
import { UtilityScripts } from '@/types/scriptInput.js';
import { logDebug } from './logging.js';
import { httpClient } from './utilWebClient.js';


/**
 *
 * @returns PublisherSate enum specifying the state of the publisher.
 */
export const checkPublisher = async () : Promise<PublisherState> => {
    const { debug } = config.get();

    const jarPath = generateInternalPath(IG_PUBLISHER_JAR);

    let state : PublisherState = PublisherState.UpToDate;

    if(internalPathExists(IG_PUBLISHER_JAR)) {
        logDebug(`Publisher.jar found.`);
        logDebug(`Verfiying version...`)

        try {
            const localVersion = await localVersionCheck();
            const remoteVersion = await remoteVersionCheck();

            logDebug((localVersion) ? `Current version: ${localVersion}` : 'Unable to determine current version');
            logDebug((remoteVersion) ? `Remote version: ${remoteVersion}` : 'Failed to retrieve latest version');

            if(localVersion === remoteVersion){
                logDebug("Local version matches latest release version.")
            } else {
                logDebug("IG Publisher is out of date.")
                state = state = PublisherState.OutOfDate;
            }
        } catch (error) {
            logDebug(`Error checking version numbers: ${error.message}`);
        }

    } else {
        logDebug(`Publisher.jar not found: ${jarPath}`);
        state = PublisherState.NotFound;
    }

    return state;
};

const localVersionCheck = async () : Promise<string> => {

    logDebug(`Running script: ${UtilityScripts.checkversion}`);

    const fullPath = generateInternalPath(IG_PUBLISHER_JAR);
    const stdout : string = await runScript(UtilityScripts.checkversion, fullPath);
    logDebug(`Script output: \n ${stdout.trimStart()}`);

    logDebug(`Parsing output...`)
    const parsedOutput = parseOutput(stdout);
    const version = parsedOutput['version'];

    logDebug(`Parsed version number: ${version}`);

    return version;
}

const remoteVersionCheck = async () : Promise<string> => {

    let version = "";
    try {
        logDebug(`Requesting latest publisher version number from ${IG_PUBLISHER_VERSION_URL}`)
        const response = await httpClient.get(IG_PUBLISHER_VERSION_URL);
        // logDebug(`Http response: ${response.data[0]?.name}`);
        version = response.data[0]?.name;

    } catch (error) {
        logDebug(`Error fetching latest publisher version number: ${error.message}`)
    }

    return version;
}

const parseOutput = (stdout: string) : Record<string, string> => {

  const result: Record<string, string> = {};

  stdout.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || !trimmed.includes('=')) return;

    const [key, ...rest] = trimmed.split('=');
    result[key] = rest.join('=').trim();
  });

  return result;
}

export const downloadPublisherJar = async () => {

//   const outputPath = path.resolve('publisher.jar'); // You can change this to include subdirs
    logDebug("Generating output path");
    const outputPath = generateInternalPath(`${IG_PUBLISHER_JAR}`);

    // Create target directory if needed
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });

    logDebug(`Requesting ${IG_PUBLISHER_JAR} from ${IG_PUBLISHER_DOWNLOAD_URL}.`);
  // Start request with redirect-follow enabled (like -L)
    const response = await httpClient.get(`${IG_PUBLISHER_DOWNLOAD_URL}${IG_PUBLISHER_JAR}`, {
        responseType: 'stream',
    });

    logDebug(`Writing response to file...`);
  // Pipe to file
  const writer = fs.createWriteStream(outputPath);
  await response.data.pipe(writer);

  // Wait for stream to finish
  await new Promise<void>((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  logDebug('Download complete');
}
