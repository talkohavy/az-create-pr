import { COLORS } from '../../common/constants/colors.js';
import { logger } from '../../common/utils/logger/logger.js';
import { loadConfig } from '../../config/config.js';

export const currentContextCommandString = 'current-context';
export const currentContextDescription = 'Show the current context.';

export function currentContext() {
  const config = loadConfig();

  if (!config.currentContext) {
    logger.info(`${COLORS.green}No context is currently set.${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    process.exit(0);
  }

  const context = config.contexts[config.currentContext]!;

  logger.info(`${COLORS.green}Current context:${COLORS.stop} ${config.currentContext}`, { newLineBefore: true });
  logger.info(`${COLORS.green}Default target branch:${COLORS.stop} ${context.defaultTargetBranch}`);
  logger.info(`${COLORS.green}Default auto-complete:${COLORS.stop} ${context.autoComplete.default}`);
  logger.info(`${COLORS.green}Should skip auto-complete:${COLORS.stop} ${context.autoComplete.skip}`);
  logger.info(`${COLORS.green}Reviewers:${COLORS.stop} [${context.reviewers.join(', ')}]`, {
    newLineAfter: true,
  });
}
