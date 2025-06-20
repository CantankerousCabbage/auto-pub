export enum MainMenuAction {
  Entry = 'Entry',
  SetupEnvironment = 'SetupEnvironment',
  DevPublish = 'DevPublish',
  ProdPublish = 'ProdPublish',
  Exit = 'Exit',
  Help = 'Help',
}

export type ActionInput = MainMenuAction;
