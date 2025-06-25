export enum PublisherScripts {
  build = '_build.sh',
  gencontinuous = '_gencontinuous.sh',
  genonce = '_genonce.sh',
  updatePublisher = '_updatePublisher.sh',
}

export type ScriptInput = PublisherScripts;