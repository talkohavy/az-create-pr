import { execSync } from 'child_process';
import { COLORS } from '../../common/constants/colors.js';
import { toolNameBigText } from '../../common/constants/globals.js';
import { getContext } from '../../common/utils/getContext.js';
import { inquireConfirm } from '../../common/utils/inquires/inquireConfirm.js';
import { inquireValue } from '../../common/utils/inquires/inquireValue.js';
import { logger } from '../../common/utils/logger/logger.js';
import { inquirePrTitle } from './helpers/inquirePrTitle.js';
import { inquireReviewers } from './helpers/inquireReviewers.js';

export async function createPR() {
  const context = getContext();

  console.log(toolNameBigText);

  if (!context) throw new Error('No context found!');

  const { reviewers: reviewersList, autoComplete } = context;

  const prTitle = await inquirePrTitle();

  const targetBranch = await inquireValue({
    message: `${COLORS.cyan}Step 2:${COLORS.stop} name of target Branch`,
    defaultValue: context.defaultTargetBranch,
  });

  const reviewers = reviewersList.length ? await inquireReviewers(reviewersList) : [];

  const shouldAutoComplete = autoComplete.skip
    ? autoComplete.default
    : await inquireConfirm({
        message: `${COLORS.cyan}Step 3:${COLORS.stop} Should auto-complete? ${COLORS.black}(${autoComplete.default ? 'Yes' : 'No'})`,
        initialIsTrue: autoComplete.default,
      });

  const commandToExecute = `az repos pr create --title ${prTitle} --target-branch ${targetBranch} --open --squash ${reviewers.length ? `--reviewers ${reviewers.join(' ')}` : ''} ${shouldAutoComplete ? '--auto-complete' : ''}`;

  logger.info(`\n  ${COLORS.green}• Executing: ${COLORS.yellow}${commandToExecute}${COLORS.stop}\n`);

  execSync(commandToExecute);
}
