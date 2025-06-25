import { ActionInput } from '@/types/actionInput.js';
import { Action } from './action.js';
import { logInfo } from '@/utils/logging.js';
import { Config } from '@/types/config.types.js';
import { config } from '@/config.js';

class ProdPublish extends Action {
  constructor() {
    const actionName = 'ProdPublish';
    const prompt = 'Please confirm next action:';
    const helpMessage = `Explain the menu options for the action`;

    super(
      actionName,
      prompt,
      helpMessage
    );
  }

  async execute(): Promise<boolean> {
    const { debug } = config.get();

    await logInfo(`${this.getActionName()} action executed`);

    this.executed = true;
    return Promise.resolve(true);
  }

  async undo(): Promise<void> {
    await logInfo(`${this.getActionName()} action undone`);
  }

  getHelpMessage(): string {
    return "";
  }

  getChildActions(): ActionInput[] {
    return [];
  }
}

export const prodPublish = new ProdPublish();