export enum PublisherState {
  UpToDate = 'upToDate',
  OutOfDate = 'outOfDate',
  NotFound = 'notFound',
}

export type ChoiceInput = PublisherState;