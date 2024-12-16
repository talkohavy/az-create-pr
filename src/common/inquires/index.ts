import { execSync } from 'child_process';
import { Separator, checkbox, confirm, input } from '@inquirer/prompts';
import { Reviewer } from '../../config/types.js';
import { COLORS } from '../constants/colors.js';
import { trimNewLinesAndSpaces } from '../utils/trimNewLinesAndSpaces.js';

export async function inquireShouldAutoComplete(defaultShouldComplete: boolean) {
  const shouldAutoComplete = await confirm({
    message: `${COLORS.cyan}Step 3:${COLORS.stop} Should auto-complete? ${COLORS.black}(${defaultShouldComplete ? 'Yes' : 'No'})`,
    default: defaultShouldComplete,
    theme: { prefix: '✨' },
  });

  return shouldAutoComplete;
}

export async function inquirePrTitle() {
  const currentBranchName = execSync('git branch --show-current').toString();
  const branchNameWithoutNewLine = trimNewLinesAndSpaces(currentBranchName);

  const prTitle = await input({
    message: `${COLORS.cyan}Step 1:${COLORS.stop} give PR a title`,
    default: branchNameWithoutNewLine,
    theme: { prefix: '✨' },
  });

  return prTitle;
}

export async function inquireTargetBranch() {
  const targetBranch = await input({
    message: `${COLORS.cyan}Step 2:${COLORS.stop} name of target Branch`,
    default: 'develop',
    theme: { prefix: '✨' },
  });

  return targetBranch;
}

export async function inquireReviewers(reviewersList: Array<Reviewer>) {
  const reviewers = await checkbox({
    message: `${COLORS.cyan}Step 3:${COLORS.stop} Select your PR reviewers`,
    theme: { prefix: '✨' },
    choices: [
      new Separator(),
      ...reviewersList.map(({ name, email, checked }) => ({ name, value: email, checked })),
      new Separator(),
    ],
  });

  return reviewers;
}
