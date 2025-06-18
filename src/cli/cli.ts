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

// Register a default command that will be used to run the interactive workflow if no other command is provided
program
  .command(MainMenuAction.Test, { isDefault: true, hidden: true })
  .action(() => handleAction(program));

// Register the `init` command, this will be used to initialise a new project
// program
//   .command(MainMenuAction.Init)
//   .description('Start the interactive workflow to provision a new project')
//   .action(() => handleAction(sga, MainMenuAction.Init));

program.parse(process.argv);
