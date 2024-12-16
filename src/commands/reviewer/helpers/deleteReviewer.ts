import { COLORS } from '../../../common/constants/colors.js';
import { inquireSelectFromList } from '../../../common/utils/inquires/inquireSelectFromList.js';
import { logger } from '../../../common/utils/logger/logger.js';
import { loadConfig, saveConfig } from '../../../config/config.js';
import { Context } from '../../../config/types.js';

type DeleteReviewer = {
  context: Context;
};

export default async function deleteReviewer(props: DeleteReviewer) {
  const { context } = props;

  const nameOfReviewerToDelete = await inquireSelectFromList(
    context.reviewers.map((r) => r.name),
    'reviewer to delete',
  );

  const indexOfReviewerToDelete = context.reviewers.findIndex((r) => r.name === nameOfReviewerToDelete)!;

  context.reviewers.splice(indexOfReviewerToDelete, 1);

  const config = loadConfig();

  config.contexts[config.currentContext!] = context as Context;

  saveConfig(config);

  logger.info(`${COLORS.green}Reviewer was removed successfully.${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
