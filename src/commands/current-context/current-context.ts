import { COLORS } from '../../common/constants/colors.js';
import { colorizeJson } from '../../common/utils/colorize-json/colorize-json.js';
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

  logger.info(`${COLORS.green}Context name:${COLORS.stop} ${config.currentContext}`, {
    newLineBefore: true,
    newLineAfter: true,
  });

  const colorizedJson = colorizeJson(JSON.stringify(context, null, 2));

  console.log(colorizedJson);
  console.log('');
}
