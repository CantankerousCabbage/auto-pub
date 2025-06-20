import { resolve } from 'path';
import { Action } from './action.js';
import { logInfo } from '@/utils/logging.js';

import { prodPublish } from './prodPublish.js';
import { devPublish } from './devPublish.js';
import { ActionInput, MainMenuAction } from '@/types/actionInput.js';

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
    await logInfo(`${this.getActionName()} action executed`);

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