import { Argv } from 'yargs';
import { CLI_TOOL_NAME, OPEN_HELP_ERROR } from '../../common/constants/globals.js';
import { getContext } from '../../common/utils/getContext.js';
import getConfig from './helpers/getConfig.js';
import setConfig from './helpers/setConfig.js';

export const configCommandString = 'config [name] [value]';
export const configDescription = 'Get/Set parts of your config.';

export const configBuilder: any = (yargs: Argv) => {
  yargs.positional('value', {
    describe: 'Number of items to return',
    type: 'string',
  });

  yargs
    .option('get', {
      type: 'string',
      description: 'Get value of a specific config part.',
    })
    .example(`${CLI_TOOL_NAME} config --get autoComplete`, 'Gets the configuration for autoCompleting the PR.');
};

type ConfigProps = {
  get: string;
  /**
   * A string containing the key on the config.json to set.
   * Needs to be parsed, as it could contains dots for nesting.
   *
   * @example "autoComplete.skip"
   */
  name: string;
  value: any;
};

export async function config(props: ConfigProps) {
  const { name: configKeyToSet, get: configKeyToGet, value } = props;

  const context = getContext();

  const isValueExists = 'value' in props;

  if (configKeyToSet && !isValueExists) throw new Error(OPEN_HELP_ERROR);

  if (!context) throw new Error('No context found!');

  if (configKeyToSet) return setConfig({ context, configKeyToSet, value });

  if (configKeyToGet) return getConfig({ context, configKeyToGet });

  throw new Error(OPEN_HELP_ERROR);
}
