import { ActionInput } from '@/types/actionInput.js';
import { Action } from './action.js';
import { logInfo } from '@/utils/logging.js';
import { Config } from '@/types/config.types.js';
import { config } from '@/config.js';

class Help extends Action {
  constructor() {
    super('Exit');
  }

  async execute(): Promise<void> {
    const { debug } = config.get()
    //TODO check that state is fine to exit
    await logInfo('Exiting application.');

    this.executed = true;
    process.exit(0);
  }

  async undo(): Promise<void> {
    //Exit is final, no undo needed
  }

  getHelpMessage(): string {
    return "";
  }

  getChildActions(): ActionInput[] {
    return [];
  }
}

export const exit = new Help();