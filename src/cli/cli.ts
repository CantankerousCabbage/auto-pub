#!/usr/bin/env node
import { Command } from 'commander';

import * as fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { MainMenuAction } from './types/actionInput.js';
import { handleAction } from './utils/handleAction.js';

// Loads package.json which is copied to the dist folder at build time
const packageJson = JSON.parse(
  fs
    .readFileSync(fileURLToPath(new URL('../../package.json', import.meta.url)))
    .toString(),
);

// Register the base command
export const program = new Command()
  .name('publish')
  .version(packageJson.version)
  .description(packageJson.description)
  .option('-d, --debug', 'output advanced logs for debug', false);

// TODO: Implement verbose mode, figure out what to do with --config-file
const { debug } = program.opts();

// Set Verbose mode as a env variable
process.env.DEBUG = debug;

// Register the entry command which allows selection of which action to perform
program
  .command(MainMenuAction.Entry, { isDefault: true, hidden: true })
  .action(() => handleAction(program));

// Register the 'devPublish' command, used to publish a development FHIR IG
program
  .command(MainMenuAction.DevPublish)
  .description("Workflow to publish a development FHIR IG for testing purposes")
  .action(() => handleAction(program));

// Register the 'prodPublish' command, used to prepare a FHIR IG for release
program
  .command(MainMenuAction.ProdPublish)
  .description("Workflow to publish FHIR IG release for use of the official portal")
  .action(() => handleAction(program));

program.parse(process.argv);
