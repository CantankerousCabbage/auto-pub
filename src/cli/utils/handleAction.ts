import { Command } from 'commander';

import { select } from '@inquirer/prompts';
import { Action } from '../actions/action.js';
import { ActionInput, MainMenuAction } from '../types/actionInput.js';
import { cleanupAndExit } from '@/cleanupAndExit.js';

import { logError } from './logging.js';
//Actions
import { devPublish } from '@/actions/devPublish.js';
import { entry } from '@/actions/entry.js';
import { prodPublish } from '@/actions/prodPublish.js';
import { exit } from '@/actions/exit.js';
import { ActionStack } from './actionStack.js';

// Inquirer flow for the main menu (not commander) - Refer to @inquirer/prompts
export const handleAction = async (
  publish: Command,
  parsedAction?: ActionInput,
) => {
  const currentInput = parsedAction || MainMenuAction.Entry;
  let currentAction: Action = fetchAction(currentInput);

  while (currentAction.getActionName() !== MainMenuAction.Exit) {

        const choices = currentAction.getChildActions().concat
          ([
             MainMenuAction.Exit,
             MainMenuAction.Help
          ]);

        const actionInput: ActionInput = await select({
          message: currentAction.getPrompt(),
          choices: choices
        })

      //Fetch action designated by the user input
      if (actionInput === MainMenuAction.Help) {
        currentAction.printHelpMessage();
        continue; // Don't progress to next action
      }

      const action: Action = fetchAction(actionInput);

      try {
        await action.execute();
        // Push the action to the stack after execution
        // ActionStack.push(action);
      } catch (error) {
        logError(`Error executing action: ${error.message}`);

        // Attempts tp clean up and gracefully exit
        cleanupAndExit(1);
      }

      // If help selected then action isn't state is not progressed.
       ActionStack.push(action);
       currentAction = action;

    };
  }

//Fetch action based on the action input
const fetchAction = (action: ActionInput) => {
  switch (action) {
    case MainMenuAction.Entry:
      return entry;
      break;

    case MainMenuAction.DevPublish:
      return devPublish;
      break;

    case MainMenuAction.ProdPublish:
    return prodPublish;
    break;

    case MainMenuAction.Exit:
    return exit;
    break;

    default:
      throw new Error(`Action ${action} not found`);
  }
};
