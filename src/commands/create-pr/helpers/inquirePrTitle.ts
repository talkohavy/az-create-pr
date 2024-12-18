import { execSync } from 'child_process';
import { COLORS } from '../../../common/constants/colors.js';
import { inquireValue } from '../../../common/utils/inquires/inquireValue.js';
import { trimNewLinesAndSpaces } from '../../../common/utils/trimNewLinesAndSpaces.js';

export async function inquirePrTitle() {
  const currentBranchName = execSync('git branch --show-current').toString();
  const branchNameWithoutNewLine = trimNewLinesAndSpaces(currentBranchName);

  const prTitle = await inquireValue({
    message: `${COLORS.cyan}Step 1:${COLORS.stop} give PR a title`,
    defaultValue: branchNameWithoutNewLine,
  });

  return prTitle;
}
