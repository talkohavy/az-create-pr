import { Argv } from 'yargs';
import { AZ_CREATE_PR_TOOL_NAME, OPEN_HELP_ERROR } from '../../common/constants/globals.js';
import { getContext } from '../../common/utils/getContext.js';
import addReviewer from './helpers/addReviewer.js';
import deleteReviewer from './helpers/deleteReviewer.js';
import updateReviewer from './helpers/updateReviewer.js';

enum CrudOperation {
  Add = 'add',
  Update = 'update',
  Delete = 'delete',
}

export const reviewerCommandString = 'reviewer <crud>';
export const reviewerDescription = 'CRUD operations on a reviewer.';

export const reviewerBuilder: any = (yargs: Argv) => {
  yargs
    .option('name', {
      type: 'string',
      description: 'The name of the reviewer.',
    })
    .example(`${AZ_CREATE_PR_TOOL_NAME} reviewer add --name Tal`, 'Adds a reviewer with name "Tal".');
  yargs
    .option('email', {
      type: 'string',
      description: 'The email of the reviewer.',
    })
    .example(`${AZ_CREATE_PR_TOOL_NAME} reviewer add --email talkohavy@gmail.com`, 'Adds a reviewer with email.');
  yargs
    .option('checked', {
      type: 'boolean',
      description: 'Is the reviewer selected by default?',
    })
    .example(`${AZ_CREATE_PR_TOOL_NAME} reviewer add --checked`, 'Mark the reviewer as checked by default.');
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
