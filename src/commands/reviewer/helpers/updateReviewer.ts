import { COLORS } from '../../../common/constants/colors.js';
import { inquireConfirm } from '../../../common/utils/inquires/inquireConfirm.js';
import { inquireSelectFromList } from '../../../common/utils/inquires/inquireSelectFromList.js';
import { inquireValue } from '../../../common/utils/inquires/inquireValue.js';
import { logger } from '../../../common/utils/logger/logger.js';
import { loadConfig, saveConfig } from '../../../config/config.js';
import { Context } from '../../../config/types.js';

type UpdateReviewerProps = {
  context: Context;
  name: string;
  email: string;
  checked: boolean;
};

export default async function updateReviewer(props: UpdateReviewerProps) {
  const { context, name, email, checked } = props;

  const nameOfReviewerToUpdate = await inquireSelectFromList(
    context.reviewers.map((r) => r.name),
    'reviewer to update',
  );

  const reviewerToUpdate = context.reviewers.find((r) => r.name === nameOfReviewerToUpdate)!;

  reviewerToUpdate.name =
    name ||
    (await inquireValue({
      message: `${COLORS.cyan}Reviewer name:${COLORS.stop}`,
      defaultValue: reviewerToUpdate.name,
    }));

  reviewerToUpdate.email =
    email ||
    (await inquireValue({
      message: `${COLORS.cyan}Reviewer email:${COLORS.stop}`,
      defaultValue: reviewerToUpdate.email,
    }));

  reviewerToUpdate.checked =
    checked ??
    (await inquireConfirm({
      message: `${COLORS.cyan}Is checked by default?${COLORS.stop}`,
      initialIsTrue: reviewerToUpdate.checked,
    }));

  const config = loadConfig();

  config.contexts[config.currentContext!] = context as Context;

  saveConfig(config);

  logger.info(`${COLORS.green}Reviewer updated successfully!${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
