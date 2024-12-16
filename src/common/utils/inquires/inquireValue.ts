import { input } from '@inquirer/prompts';
import { COLORS } from '../../constants/colors.js';

type InquireValueProps = {
  message: string;
  defaultValue?: string;
};

export async function inquireValue(props: InquireValueProps) {
  const { defaultValue, message } = props;

  const inputValue = await input({
    message: `${COLORS.cyan}${message}${COLORS.stop}`,
    default: defaultValue,
    theme: { prefix: '✨' },
  });

  return inputValue;
}
