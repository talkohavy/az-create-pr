#!/usr/bin/env node

import os from 'os';
import { hideBin } from 'yargs/helpers';
import yargs from 'yargs/yargs';
import { commandMapper } from './commandMapper.js';
import { configBuilder, configCommandString, configDescription } from './commands/config/config.js';
import {
  createContextBuilder,
  createContextCommandString,
  createContextDescription,
} from './commands/create-context/create-context.js';
import { currentContextCommandString, currentContextDescription } from './commands/current-context/current-context.js';
import {
  deleteContextBuilder,
  deleteContextCommandString,
  deleteContextDescription,
} from './commands/delete-context/delete-context.js';
import { reviewerBuilder, reviewerCommandString, reviewerDescription } from './commands/reviewer/reviewer.js';
import {
  useContextBuilder,
  useContextCommandString,
  useContextDescription,
} from './commands/use-context/use-context.js';
import { COLORS } from './common/constants/colors.js';
import { CLI_TOOL_NAME, toolNameBigText } from './common/constants/globals.js';
import { showVersion } from './common/utils/showVersion.js';

const __no_op__: any = () => {};

// A full description on each of the following functions is found under the `lvlup` project.
const yargsInstance = yargs(hideBin(process.argv))
  .completion()
  .scriptName(`${COLORS.green}${CLI_TOOL_NAME}${COLORS.stop}`)
  .version(false)
  .command(configCommandString, configDescription, configBuilder)
  .command(reviewerCommandString, reviewerDescription, reviewerBuilder)
  .command(createContextCommandString, createContextDescription, createContextBuilder)
  .command(useContextCommandString, useContextDescription, useContextBuilder)
  .command(currentContextCommandString, currentContextDescription, __no_op__)
  .command(deleteContextCommandString, deleteContextDescription, deleteContextBuilder)
  .options({
    v: {
      alias: 'version',
      type: 'boolean',
      description: `Show ${CLI_TOOL_NAME} version`,
      global: false,
      default: false,
    },
    h: {
      alias: 'help',
      type: 'boolean',
      description: 'Show help manual',
      global: true,
      default: false,
    },
  })
  .showHelpOnFail(false, 'Specify --help for available options') // default value is true.
  .strict()
  .updateStrings({
    'Positionals:': `${COLORS.blue}Positionals:${COLORS.stop}`, // <--- I will never use these. only Options, which I alias as 'Flags'.
    'Commands:': `${COLORS.blue}Commands:${COLORS.stop}`,
    'Options:': `${COLORS.blue}Flags:${COLORS.stop}`,
    'Examples:': `${COLORS.blue}Examples:${COLORS.stop}`,
  })
  .help(false);

type ArgsV = { $0: any; _: Array<string> } & Record<string, string | number | boolean>;

async function run() {
  const argv = yargsInstance.parse();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { $0: cliToolName, _: commands, ...flags } = argv as ArgsV;
  if (flags.version) {
    await showVersion();
    process.exit(0);
  }

  const mainHelpMenuAsText = await yargsInstance.getHelp();
  const mainHelpMenuWithBigTitle = `${toolNameBigText}${os.EOL}${os.EOL}${mainHelpMenuAsText}`;

  if (flags.help) {
    console.log(mainHelpMenuWithBigTitle);
    process.exit(0);
  }

  await commandMapper({ commands, flags, helpMenu: mainHelpMenuWithBigTitle });
}

run();
