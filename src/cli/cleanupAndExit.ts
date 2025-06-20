import { ActionStack } from "./utils/actionStack.js";

export const cleanupAndExit = async (code: number): Promise<void> => {
    while (ActionStack.peek !== undefined) {
        const action = ActionStack.pop();
        if (action) {
            try {
                await action.undo();
            } catch (error) {
                console.error(`Error undoing action: ${error}`);
            }
        }
    }
}