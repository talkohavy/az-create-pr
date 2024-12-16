import { COLORS } from '../../../common/constants/colors.js';
import { logger } from '../../../common/utils/logger/logger.js';
import { KEY_DOESNT_EXIST } from '../../../common/utils/treeWalk/constants.js';
import { getValueFromTree } from '../../../common/utils/treeWalk/getValueFromTree.js';
import { Context } from '../../../config/types.js';

type GetConfigProps = {
  context: Context;
  configKeyToGet: string;
};

export default function getConfig(props: GetConfigProps) {
  const { context, configKeyToGet } = props;

  const configFieldValue = getValueFromTree({ tree: context, key: configKeyToGet });

  if (configFieldValue === KEY_DOESNT_EXIST) {
    logger.error(`${COLORS.red}- key "${configKeyToGet}" doesn't exists on the config object.${COLORS.stop}`, {
      newLineBefore: true,
      newLineAfter: true,
    });

    return;
  }

  console.log(configFieldValue);
}
