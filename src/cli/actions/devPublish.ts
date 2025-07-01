import { ActionInput } from '@/types/actionInput.js';
import { Action } from './action.js';
import { logError, logInfo, logDebug } from '@/utils/logging.js';
import { runScript } from '@/scripthandler.js';
import { Config } from '@/types/config.types.js';
  import axios from 'axios';
import { spawnSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { IG_PUBLISHER_JAR } from '@/constants/constant.js';
import { FHIR_ORG_URL } from '@/constants/constant.js';
import { generateInternalPath, generateProcessPath } from '@/utils/utilPath.js';
import { httpClient } from '@/utils/utilWebClient.js';
// const publisherJar = 'publisher.jar';
// const inputCachePath = './input-cache';
// const publisherPath = path.join(inputCachePath, publisherJar);

class DevPublish extends Action {
  constructor() {
    const actionName = 'DevPublish';
    const prompt = 'Please confirm next action:';
    const helpMessage = `Explain the menu options for the action`;

    super(
      actionName,
      prompt,
      helpMessage
    );
  }

  async execute(): Promise<boolean> {
    let success = true;

  logDebug('Checking internet connection...');

  let txOption = '';
  try {
    await httpClient.get('https://tx.fhir.org');
    logDebug('Online');
  } catch {
    logDebug('Offline');
    txOption = '-tx n/a';
  }

  console.log(txOption);

  const publisherPath = generateInternalPath(IG_PUBLISHER_JAR);
  const igPath = generateProcessPath('./');


  if (fs.existsSync(publisherPath)) {
    const args = [
      '-Dfile.encoding=UTF-8',
      '-jar',
      publisherPath,
      '-ig',
      igPath,
      ...txOption.split(' '),
      ...process.argv.slice(2),
    ];

    //Set IO variables to inherit from current process
    const result = spawnSync('java', args, { stdio: 'inherit' });

    if (result.error) {
      console.error('Error running IG Publisher:', result.error);
      process.exit(1);
    }
  } else {
    console.error('IG Publisher NOT FOUND in input-cache. Please run _updatePublisher. Aborting...');
    process.exit(1);
  }



    return Promise.resolve(success);
  }

  async undo(): Promise<void> {
    logInfo(`${this.getActionName()} action undone`);
  }

  getHelpMessage(): string {
    return "";
  }

  getChildActions(): ActionInput[] {
    return [];
  }
}

export const devPublish = new DevPublish();