import Stack from '../types/stack.js';
import { Action } from '../actions/action.js';

// Command/action history inputted from the CLI
const actionStack: Stack<Action> = new Stack();

export class ActionStack {
  static push(action: Action) {
    actionStack.push(action);
  }

  static pop(): Action | undefined {
    return actionStack.pop();
  }

  static peek(): Action | undefined {
    return actionStack.peek();
  }

  static isEmpty(): boolean {
    return actionStack.isEmpty();
  }

  static size(): number {
    return actionStack.size();
  }
}
