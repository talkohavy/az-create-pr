import { getKeysArrFromDottedKey } from './getKeysArrFromDottedKey.js';

type SetValueFromTreeProps = {
  key: string;
  tree: Record<string, any>;
  value: any;
};

export function setValueOnTree(props: SetValueFromTreeProps) {
  const { tree, key, value } = props;

  const keysArr = getKeysArrFromDottedKey(key);

  let subTree = tree;
  const lastIndex = keysArr.length - 1;

  keysArr.forEach((currentKey, currentIndex) => {
    if (currentIndex === lastIndex) return;

    subTree = subTree[currentKey];
  });

  subTree[keysArr[lastIndex]!] = value;
}
