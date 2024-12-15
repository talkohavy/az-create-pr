import { input } from '@inquirer/prompts';
import { COLORS } from '../../../common/constants/colors.js';

export async function inquireNewReviewersList() {
  console.log(`${COLORS.green} ✨  Enter all reviewers, separated by a comma delimiter.`);

  const reviewersAsStr = await input({ message: 'New Reviewers List:' });

  return reviewersAsStr;
}
