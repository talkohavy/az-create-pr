import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { logger } from '../../common/utils/logger/logger.js';
import { loadConfig, saveConfig } from '../../config/config.js';
import { Context } from '../../config/types.js';
import { inquireNewContextName } from './helpers/inquireNewContextName.js';
import { inquireNewReviewersList } from './helpers/inquireNewReviewersList.js';

export const createContextCommandString = 'create-context [name] [reviewers]';
export const createContextDescription = 'Create a new context.';

export const createContextBuilder: any = (yargs: Argv) => {
  yargs
    .positional('name', {
      describe: 'The name of the context',
      type: 'string',
      demandOption: true,
    })
    .positional('reviewers', {
      describe: 'The reviewers list to choose from',
      type: 'string',
      demandOption: true,
    });
};

type ContextData = {
  name: string;
  reviewers: string;
};

export async function createContext(props: ContextData) {
  const { name, reviewers } = props;

  const config = loadConfig();

  const newContextName = name ?? (await inquireNewContextName());

  if (config.contexts[newContextName]) {
    logger.error(`Context "${newContextName}" already exists.`);

    process.exit(1);
  }

  const prReviewers = reviewers ?? (await inquireNewReviewersList());

  const newContext: Context = {
    defaultTargetBranch: 'develop',
    reviewers: prReviewers ? prReviewers.split(',') : [],
    autoComplete: {
      default: false,
      skip: false,
    },
  };

  config.contexts[newContextName] = newContext;

  saveConfig(config);

  logger.info(`${COLORS.green}Context "${newContextName}" created.${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}