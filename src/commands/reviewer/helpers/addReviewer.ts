import { COLORS } from '../../../common/constants/colors.js';
import { inquireConfirm } from '../../../common/utils/inquires/inquireConfirm.js';
import { inquireValue } from '../../../common/utils/inquires/inquireValue.js';
import { logger } from '../../../common/utils/logger/logger.js';
import { loadConfig, saveConfig } from '../../../config/config.js';
import { Context, Reviewer } from '../../../config/types.js';

type AddReviewerProps = {
  context: Context;
  name: string;
  email: string;
  checked: boolean;
};

export default async function addReviewer(props: AddReviewerProps) {
  const { context, name, email, checked } = props;

  const reviewerFound = context.reviewers.find(({ email: currentEmail }) => currentEmail === email);

  if (reviewerFound) {
    logger.info(`${COLORS.green}Reviewer "${reviewerFound.name}" already exists.${COLORS.stop}`);

    return;
  }

  const reviewerName = name || (await inquireValue({ message: `${COLORS.cyan}Reviewer name:${COLORS.stop}` }));
  const reviewerEmail = email || (await inquireValue({ message: `${COLORS.cyan}Reviewer email:${COLORS.stop}` }));
  const reviewerChecked =
    checked ?? (await inquireConfirm({ message: `${COLORS.cyan}Is checked by default?${COLORS.stop}` }));

  const newReviewer: Reviewer = { name: reviewerName, email: reviewerEmail, checked: reviewerChecked };

  context.reviewers.push(newReviewer);

  const config = loadConfig();

  config.contexts[config.currentContext!] = context as Context;

  saveConfig(config);

  logger.info(`${COLORS.green}Context updated successfully!${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
