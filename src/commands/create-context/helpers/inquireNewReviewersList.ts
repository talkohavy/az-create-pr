import { input } from '@inquirer/prompts';
import { COLORS } from '../../../common/constants/colors.js';

export async function inquireNewReviewersList() {
  console.log(
    `${COLORS.green} ✨  Insert all reviewers, separated by a comma delimiter ${COLORS.black}(leave empty to skip)${COLORS.stop}`,
  );

  const reviewersAsStr = await input({ message: 'Reviewers List:' });

  return reviewersAsStr;
}
