//Abstract class for actions
export abstract class Action {
  protected actionName: string;

  constructor(actionName: string) {
    this.actionName = actionName;
  }

  abstract execute(): Promise<void>;
  abstract undo(): Promise<void>;
  abstract getChildActions(): Action[];

  getActionName(): string {
    return this.actionName;
  }
}
