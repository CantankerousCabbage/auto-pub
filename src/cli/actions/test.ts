import { Action } from './action.js';

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

  getChildActions(): Action[] {
    return [];
  }
}

export const testAction = new Test();
