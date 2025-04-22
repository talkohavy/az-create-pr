import { COLORS } from '../../common/constants/colors.js';
import { logger } from '../../common/utils/logger/logger.js';
import { openPullRequestInBrowser } from './logic/openPullRequestInBrowser.js';

export const openCommandString = 'open';
export const openDescription = 'Open an existing PR in the browser.';

export async function openInBrowser() {
  openPullRequestInBrowser();

  logger.info(`${COLORS.green}Opening PR in browser...${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
