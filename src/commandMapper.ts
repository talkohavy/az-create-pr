import { config } from './commands/config/config.js';
import { createContext } from './commands/create-context/create-context.js';
import { createPR } from './commands/create-pr/create-pr.js';
import { currentContext } from './commands/current-context/current-context.js';
import { deleteContext } from './commands/delete-context/delete-context.js';
import { useContext } from './commands/use-context/use-context.js';
import { Commands } from './common/constants/types.js';

const COMMAND_MAPPER = {
  [Commands.CreateContext]: createContext,
  [Commands.CurrentContext]: currentContext,
  [Commands.DeleteContext]: deleteContext,
  [Commands.UseContext]: useContext,
  [Commands.Config]: config,
  [Commands.Main]: createPR,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
};

export async function commandMapper(props: commandMapperProps) {
  try {
    const { commands, flags } = props;

    if (commands.length === 0) commands.push(Commands.Main);

    const [command] = commands as [Commands];

    await COMMAND_MAPPER[command]({ commands, ...flags });
  } catch (_error) {
    _error;
  }
}
