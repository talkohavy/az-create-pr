import { execSync } from 'child_process';

export function openPullRequestInBrowser() {
  const getPullRequestId =
    'az repos pr list --status active --source-branch $(git rev-parse --abbrev-ref HEAD) --query "[0].pullRequestId"';

  const pullRequestId = execSync(getPullRequestId).toString().trim();

  const commandToExecute = `az repos pr show --id ${pullRequestId} --open`;

  execSync(commandToExecute);
}
