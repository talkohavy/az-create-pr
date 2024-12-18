import { Separator, checkbox } from '@inquirer/prompts';

export type Option = {
  value: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
};

type InquireMultiSelectFromListProps = {
  message: string;
  optionsArray: Array<Option>;
};

export async function inquireMultiSelectFromList(props: InquireMultiSelectFromListProps) {
  const { message, optionsArray } = props;

  console.log('');

  const selectedOptions = await checkbox({
    message,
    theme: { prefix: '✨' },
    choices: [new Separator(), ...optionsArray, new Separator()],
  });

  return selectedOptions;
}
