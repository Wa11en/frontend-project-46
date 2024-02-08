import _ from 'lodash';

const makeTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  return sortedKeys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { key, children: makeTree(obj1[key], obj2[key]), status: 'nested' };
    }
    if (!(key in obj1)) {
      return { key, value: obj2[key], status: 'added' };
    }
    if (!(key in obj2)) {
      return { key, value: obj1[key], status: 'removed' };
    }
    if (obj1[key] === obj2[key]) {
      return { key, value: obj1[key], status: 'unupdated' };
    }
    return {
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
      status: 'updated',
    };
  });
};
export default makeTree;
