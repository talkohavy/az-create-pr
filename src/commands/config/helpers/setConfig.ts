import { COLORS } from '../../../common/constants/colors.js';
import convertTypeByValue from '../../../common/utils/convertTypeByValue.js';
import { logger } from '../../../common/utils/logger/logger.js';
import { KEY_DOESNT_EXIST } from '../../../common/utils/treeWalk/constants.js';
import { getValueFromTree } from '../../../common/utils/treeWalk/getValueFromTree.js';
import { setValueOnTree } from '../../../common/utils/treeWalk/setValueOnTree.js';
import { loadConfig, saveConfig } from '../../../config/config.js';
import { Context } from '../../../config/types.js';

type SetConfigProps = {
  context: Context;
  configKeyToSet: string;
  value: any;
};

export default function setConfig(props: SetConfigProps) {
  const { context, configKeyToSet, value } = props;

  const updatedFieldValue = convertTypeByValue(value);

  const currentFieldValue = getValueFromTree({ tree: context, key: configKeyToSet });

  if (currentFieldValue === KEY_DOESNT_EXIST) {
    logger.error(`${COLORS.red}key "${configKeyToSet}" doesn't exists on the config object.${COLORS.stop}`);

    return;
  }

  if (updatedFieldValue === currentFieldValue) {
    logger.info(
      `${COLORS.green}Provided value "${updatedFieldValue}" is same as current value. Unchanged.${COLORS.stop}`,
    );

    return;
  }

  const config = loadConfig();

  setValueOnTree({ tree: context, key: configKeyToSet, value: updatedFieldValue });

  config.contexts[config.currentContext!] = context as Context;

  saveConfig(config);

  logger.info(`${COLORS.green}Context updated successfully!${COLORS.stop}`, {
    newLineBefore: true,
    newLineAfter: true,
  });
}
