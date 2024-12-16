import { confirm } from '@inquirer/prompts';
import { COLORS } from '../../constants/colors.js';

type InquireConfirmProps = {
  alternativeMessage?: string;
  /**
   * @default false
   */
  initialIsTrue?: boolean;
};

export async function inquireConfirm(props?: InquireConfirmProps) {
  const { initialIsTrue, alternativeMessage } = (props ?? {}) as InquireConfirmProps;

  console.log('');

  const isTrue = await confirm({
    message: `✨ ${alternativeMessage ?? 'Are you sure?'}`,
    default: !!initialIsTrue,
    theme: {
      style: { defaultAnswer: () => `${COLORS.black}(y/n) › ${COLORS.blue}${initialIsTrue ? 'true' : 'false'}` },
    },
  });

  console.log('');

  return isTrue;
}
