//Abstract class for actions
import { ActionInput } from "@/types/actionInput.js";
import { logInfo } from "@/utils/logging.js";

export abstract class Action {
  protected actionName: string;
  protected prompt: string;
  protected executed: boolean = false;

  protected helpMessage: string;

  constructor(actionName: string, helpMessage?: string,  prompt?: string) {
    this.actionName = actionName;
    this.helpMessage = helpMessage || "";
    this.prompt = prompt || "";
  }

  abstract execute(): Promise<boolean | void>;
  abstract undo(): Promise<void>;
  abstract getChildActions(): ActionInput[];

  printHelpMessage(): void {
    logInfo(this.helpMessage);
  }

  tooExecute(): boolean {
    return !this.executed;
  }

  getActionName(): string {
    return this.actionName;
  }

  getPrompt(): string {
    return this.prompt;
  }
}
