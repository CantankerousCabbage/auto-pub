import { Command } from 'commander';
// const { Select } from 'enquirer';

import { select } from '@inquirer/prompts';
import { Action } from '../actions/action.js';
import { ActionInput, MainMenuAction } from '../types/actionInput.js';
import { testAction } from '../actions/test.js';

// Inquirer flow for the main menu (not commander) - Refer to @inquirer/prompts
// Add state to track the current menu
export const handleAction = async (
  publish: Command,
  parsedAction?: ActionInput,
) => {
  const actionInput =
    parsedAction ||
    (await select({
      message: 'What would you like to do?',
      choices: [
        {
          name: 'Test actions',
          value: MainMenuAction.Test,
        },
      ],
    }));

  const action: Action = fetchAction(actionInput);

  try {
    await action.execute();
    // Push the action to the stack after execution
    // ActionStack.push(action);
  } catch (error) {
    console.error(`Error executing action: ${error.message}`);

    //TODO execute cleanup use undo/stack
  }
};

//Fetch action based on the action input
const fetchAction = (action: ActionInput) => {
  switch (action) {
    case testAction.getActionName():
      return testAction;
      break;

    default:
      throw new Error(`Action ${action} not found`);
  }
};
