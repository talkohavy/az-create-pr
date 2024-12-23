import { Argv } from 'yargs';
import { COLORS } from '../../common/constants/colors.js';
import { CLI_TOOL_NAME_COLORED, OPEN_HELP_ERROR } from '../../common/constants/globals.js';
import { getContext } from '../../common/utils/getContext.js';
import addReviewer from './helpers/addReviewer.js';
import deleteReviewer from './helpers/deleteReviewer.js';
import updateReviewer from './helpers/updateReviewer.js';

enum CrudOperation {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
}

const coloredAdd = `${COLORS.green}add${COLORS.stop}`;
const coloredUpdate = `${COLORS.yellow}update${COLORS.stop}`;
const coloredDelete = `${COLORS.red}delete${COLORS.stop}`;

export const reviewerCommandString = 'reviewer [CRUD]';
export const reviewerDescription = `CRUD operations on a reviewer. Allowed sub-commands are: ${COLORS.green}add${COLORS.stop} | ${COLORS.yellow}update${COLORS.stop} | ${COLORS.red}delete${COLORS.stop}.`;

export const reviewerBuilder: any = (yargs: Argv) => {
  yargs.positional('CRUD', {
    choices: ['add', 'update', 'delete'],
    describe: 'sub-command to execute.',
    type: 'string',
  });

  yargs
    .option('name', {
      type: 'string',
      description: 'The name of the reviewer.',
    })
    .option('email', {
      type: 'string',
      description: 'The email of the reviewer.',
    })
    .option('checked', {
      type: 'boolean',
      description: 'Is the reviewer selected by default?',
    });

  yargs
    .example(`${CLI_TOOL_NAME_COLORED} reviewer ${coloredAdd} --name Tal`, 'Adds a reviewer with name "Tal".')
    .example(
      `${CLI_TOOL_NAME_COLORED} reviewer ${coloredAdd} --email talkohavy@gmail.com`,
      'Adds a reviewer with email.',
    )
    .example(`${CLI_TOOL_NAME_COLORED} reviewer ${coloredAdd} --checked`, 'Mark reviewer as checked.')
    .example(`${CLI_TOOL_NAME_COLORED} reviewer ${coloredUpdate}`, 'Update a reviewer from reviewers list.')
    .example(`${CLI_TOOL_NAME_COLORED} reviewer ${coloredDelete}`, 'Delete a reviewer from the reviewers list.');
};

type ReviewerProps = {
  crud: CrudOperation;
  name: string;
  email: string;
  checked: boolean;
};

export async function reviewer(props: ReviewerProps) {
  const { crud, name, email, checked } = props;

  const context = getContext();

  if (!context) throw new Error('No context found!');

  if (crud === CrudOperation.Add) return addReviewer({ context, name, email, checked });
  if (crud === CrudOperation.Update) return updateReviewer({ context, name, email, checked });
  if (crud === CrudOperation.Delete) return deleteReviewer({ context });

  throw new Error(OPEN_HELP_ERROR);
}
