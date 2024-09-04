import { execSync } from 'child_process';
import os from 'os';
import { Separator, checkbox, input } from '@inquirer/prompts';
import { COLORS } from './constants/colors.js';
import { trimNewLinesAndSpaces } from './utils/trimNewLinesAndSpaces.js';

async function runCliTool() {
  try {
    printCliName();

    const prTitle = await getPrTitle();
    const targetBranch = await getTargetBranch();
    const reviewers = await selectReviewers();

    const commandToExecute = `az repos pr create --title ${prTitle} --target-branch ${targetBranch} --open ${reviewers.length ? `--reviewers ${reviewers.join(' ')}` : ''} --squash --auto-complete`;

    console.log(`\n  ${COLORS.green}• Executing: ${COLORS.yellow}${commandToExecute}${COLORS.stop}\n`);
    execSync(commandToExecute);
  } catch (_error: any) {
    console.log(`${os.EOL}${COLORS.red}Bye.${COLORS.stop}${os.EOL}`);
  }
}

function printCliName() {
  console.log(`${COLORS.blue}
     _     _____    ____                   _          ____  ____  
    / \\   |__  /   / ___|_ __ ___  __ _  _| |_ ___   |  _ \\|  _ \\ 
   / _ \\    / /   | |   | '__/ _ \\/ _\` ||_   _/ _ \\  | |_) | |_) |
  / ___ \\  / /_   | |___| | |  __/ (_| |  | ||  __/  |  __/|  _ < 
 /_/   \\_\\/____|   \\____|_|  \\___|\\__,_|  |_| \\___|  |_|   |_| \\_\\
${COLORS.stop}`);
}

async function getPrTitle() {
  const currentBranchName = execSync('git branch --show-current').toString();
  const branchNameWithoutNewLine = trimNewLinesAndSpaces(currentBranchName);

  const prTitle = await input({
    message: `${COLORS.cyan}Step 1:${COLORS.stop} give PR a title`,
    default: branchNameWithoutNewLine,
    theme: { prefix: '✨' },
  });

  return prTitle;
}

async function getTargetBranch() {
  const targetBranch = await input({
    message: `${COLORS.cyan}Step 2:${COLORS.stop} name of target Branch`,
    default: 'develop',
    theme: { prefix: '✨' },
  });

  return targetBranch;
}

async function selectReviewers() {
  const reviewers = await checkbox({
    message: `${COLORS.cyan}Step 3:${COLORS.stop} Select your PR reviewers`,
    theme: { prefix: '✨' },
    choices: [
      new Separator(),
      {
        name: 'Evgenii',
        value: 'evgenii.belitckii@controlup.com',
        checked: true,
      },
      {
        name: 'Alex Zaidman',
        value: 'alex.zaidman@controlup.com',
        checked: true,
      },
      {
        name: 'Bar Yedidovich',
        value: 'bar.yedidovich@controlup.com',
      },
      {
        name: 'Stav Abergel',
        value: 'stav.abergel@controlup.com',
      },
      {
        name: 'Michael Khaliavski',
        value: 'michael.khaliavski@controlup.com',
      },
      new Separator(),
    ],
  });

  return reviewers;
}

export { runCliTool };
