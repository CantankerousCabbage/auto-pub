export enum PublisherScripts {
  build = '_build.sh',
  gencontinuous = '_gencontinuous.sh',
  genonce = '_genonce.sh',
  updatePublisher = '_updatePublisher.sh',
}

export enum UtilityScripts {
  checkversion = '_checkversion.sh',
  checkremoteversion = '_checkremoteversion.sh',
  downloadlatest = '_downloadlatest.sh'

}

export type ScriptInput = PublisherScripts | UtilityScripts;