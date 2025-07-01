import { ActionInput } from '@/types/actionInput.js';
import { Action } from './action.js';
import { logError, logInfo } from '@/utils/logging.js';
import { runScript } from '@/scripthandler.js';
import { Config } from '@/types/config.types.js';

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
    logInfo(`Executing action for ${this.getActionName()}`);

    // const target = internalPath('../scripts/test.sh');
    const target = '_genonce.sh';

    try {
      const stdout = await runScript(target);
      logInfo(`Script output: ${stdout}`);

    } catch (error) {
        logError(`Error running script: ${error.message}`);
        success = false;
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