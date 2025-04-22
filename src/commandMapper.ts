import { config } from './commands/config/config.js';
import { createContext } from './commands/create-context/create-context.js';
import { createPR } from './commands/create-pr/create-pr.js';
import { currentContext } from './commands/current-context/current-context.js';
import { deleteContext } from './commands/delete-context/delete-context.js';
import { openInBrowser } from './commands/open-in-browser/open-in-browser.js';
import { reviewer } from './commands/reviewer/reviewer.js';
import { useContext } from './commands/use-context/use-context.js';
import { OPEN_HELP_ERROR } from './common/constants/globals.js';
import { Commands } from './common/types.js';

const COMMAND_MAPPER = {
  [Commands.CreateContext]: createContext,
  [Commands.CurrentContext]: currentContext,
  [Commands.DeleteContext]: deleteContext,
  [Commands.UseContext]: useContext,
  [Commands.Config]: config,
  [Commands.Reviewer]: reviewer,
  [Commands.Main]: createPR,
  [Commands.Open]: openInBrowser,
};

type commandMapperProps = {
  commands: Array<string>;
  flags: any;
  helpMenu: string;
};

export async function commandMapper(props: commandMapperProps) {
  try {
    const { commands, flags } = props;

    if (commands.length === 0) commands.push(Commands.Main);

    const [command] = commands as [Commands];

    await COMMAND_MAPPER[command]({ commands, ...flags });
  } catch (error: any) {
    if (error.message === OPEN_HELP_ERROR) {
      console.log(props.helpMenu);
      process.exit(0);
    }
  }
}
