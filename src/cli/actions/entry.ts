import { resolve } from 'path';
import { Action } from './action.js';
import { logInfo } from '@/utils/logging.js';

import { confirm, input, select } from '@inquirer/prompts';
import { Config } from '@/types/config.types.js';
import { ActionInput, MainMenuAction } from '@/types/actionInput.js';
import { ChoiceInput, PublisherState } from '@/types/choiceInput.js';
import { OptionValues } from 'commander';
import { config } from '@/config.js';

//Utils
import { checkPublisher, downloadPublisherJar } from '@/utils/utilPublisher.js';
import { runScript } from '@/scripthandler.js';

class Entry extends Action {
  constructor() {
    const actionName = 'Entry';
    const prompt = 'What would you like to do?';
    const helpMessage = `Choose publication mode:`;

    super(
      actionName, prompt, helpMessage
    );
  }

  async execute(): Promise<boolean> {

    logInfo(`Welcome to Auto Publisher.`);
    logInfo(`Checking FHIR IG Publisher version...`);

    //TODO add version check
    const pubState : PublisherState = await checkPublisher(); //Placeholder

    if(pubState === PublisherState.NotFound || pubState === PublisherState.OutOfDate) {

      logInfo(`Downloading latest version of IG Publisher...`)

      await downloadPublisherJar();
      logInfo(`IG Publisher updated.`)
    } else {
      logInfo(`IG Publisher is up to date.`)
    }

    this.executed = true;
    return Promise.resolve(true);
  }

  async undo(): Promise<void> {
    await logInfo(`${this.getActionName()} action undone`);
  }

  getChildActions(): ActionInput[] {
    return [
        MainMenuAction.DevPublish,
        MainMenuAction.ProdPublish,
    ];
  }
}

export const entry = new Entry();