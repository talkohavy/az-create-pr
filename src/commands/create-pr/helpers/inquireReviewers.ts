import { COLORS } from '../../../common/constants/colors.js';
import { inquireMultiSelectFromList } from '../../../common/utils/inquires/inquireMultiSelectFromList.js';
import { Reviewer } from '../../../config/types.js';

export async function inquireReviewers(reviewersList: Array<Reviewer>) {
  const optionsArray = reviewersList.map(({ name, email, checked }) => ({ name, value: email, checked }));

  const reviewers = await inquireMultiSelectFromList({
    message: `${COLORS.cyan}Step 3:${COLORS.stop} Select your PR reviewers`,
    optionsArray,
  });

  return reviewers;
}
