import { input } from '@inquirer/prompts';
import { COLORS } from '../../../common/constants/colors.js';

export async function inquireNewContextName() {
  console.log('');

  console.log(`${COLORS.green} ✨  Please enter a new context name:`);

  const newContextName = await input({ message: 'Context name:' });

  return newContextName;
}
