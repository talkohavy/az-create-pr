import { execSync } from 'child_process';
import { COLORS } from '../../common/constants/colors.js';
import { bigTextAzCreatePrTool } from '../../common/constants/globals.js';
import {
  inquirePrTitle,
  inquireReviewers,
  inquireShouldAutoComplete,
  inquireTargetBranch,
} from '../../common/inquires/index.js';
import { getContext } from '../../common/utils/getContext.js';
import { logger } from '../../common/utils/logger/logger.js';

export async function createPR() {
  const context = getContext();

  console.log(bigTextAzCreatePrTool);

  if (!context) throw new Error('No context found!');

  const { reviewers: reviewersList, autoComplete } = context;

  const prTitle = await inquirePrTitle();

  const targetBranch = await inquireTargetBranch();

  const reviewers = reviewersList.length ? await inquireReviewers(reviewersList) : [];

  const shouldAutoComplete = autoComplete.skip
    ? autoComplete.default
    : await inquireShouldAutoComplete(autoComplete.default);

  const commandToExecute = `az repos pr create --title ${prTitle} --target-branch ${targetBranch} --open --squash ${reviewers.length ? `--reviewers ${reviewers.join(' ')}` : ''} ${shouldAutoComplete ? '--auto-complete' : ''}`;

  logger.info(`\n  ${COLORS.green}• Executing: ${COLORS.yellow}${commandToExecute}${COLORS.stop}\n`);

  execSync(commandToExecute);
}
