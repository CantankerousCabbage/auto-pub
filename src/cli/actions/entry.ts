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
import { checkPublisher } from '@/utils/utilPublisher.js';

class Entry extends Action {
  constructor() {
    const actionName = 'Entry';
    const prompt = 'What would you like to do?';
    const helpMessage = `Explain the menu options for the action`;

    super(
      actionName, prompt, helpMessage
    );
  }

  async execute(): Promise<boolean> {
    const { debug } = config.get()
    //1. Display welcome message
    //1. Check that publiher.jar exists and is up to date
    //2. Install it if not
    //3. Progress to menu

    logInfo(`Welcome to Auto Publisher.`);
    logInfo(`Checking FHIR IG Publisher version...`);

    //TODO add version check
    const upToDate : ChoiceInput = PublisherState.NotFound; //Placeholder

    if(checkPublisher() === PublisherState.NotFound) {
      const confirmUpdate = await confirm({
        message: 'IG Publisher is not up to date. Do you want to update it?',
      })

      if(confirmUpdate) {
        logInfo('Updating IG Publisher...');
        // TODO: Implement update logic
      } else {
        logInfo('Exiting Auto Publisher.');
        return Promise.resolve(false);
      }
    };


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