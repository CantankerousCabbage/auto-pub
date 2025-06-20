import { ActionStack } from './actionStack.js';
import { Action } from '../actions/action.js';

const currentAction: Action | null = ActionStack.peek() || null;

//Returns the available child actions of the last executed action.
export const stateMap = currentAction?.getChildActions() || [];
