import { ActionInput } from '@/types/actionInput.js';
import { Action } from './action.js';
import { Config } from '@/types/config.types.js';

class Test extends Action {
  constructor() {
    super('test');
  }

  async execute(): Promise<void> {
    await console.log('Test action executed');
  }

  async undo(): Promise<void> {
    await console.log('Test action undone');
  }

  getHelpMessage(): string {
    return "";
  }

  getChildActions(): ActionInput[] {
    return [];
  }
}

export const testAction = new Test();
