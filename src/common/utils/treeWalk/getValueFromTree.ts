import { KEY_DOESNT_EXIST } from './constants.js';
import { getKeysArrFromDottedKey } from './getKeysArrFromDottedKey.js';

type GetValueFromTreeProps = {
  key: string;
  tree: Record<string, any>;
};

export function getValueFromTree(props: GetValueFromTreeProps) {
  const { tree, key } = props;

  const keysArr = getKeysArrFromDottedKey(key);

  let subTree: any = tree;

  for (const currentKey of keysArr) {
    if (!(currentKey in subTree)) return KEY_DOESNT_EXIST;

    subTree = subTree[currentKey];
  }

  return subTree;
}
