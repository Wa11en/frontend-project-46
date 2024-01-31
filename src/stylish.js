import _ from 'lodash';

const getReplacer = (depth, replacer = ' ', leftIndent = 2) => replacer.repeat(depth * 4 - leftIndent);

const getString = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const string = entries.map(([key, value]) => `${getReplacer(depth)}  ${key}: ${getString(value, depth + 1)}`);
  return `{\n${string.join('\n')}\n${getReplacer(depth - 1, ' ', 0)}}`;
};

const getStylish = (tree) => {
  const iter = (data, depth) => data.map((obj) => {
    const {
      key, value, children, status, oldValue, newValue,
    } = obj;
    switch (status) {
      case 'nested':
        return `${getReplacer(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${getReplacer(depth, ' ', 0)}}`;
      case 'unupdated':
        return `${getReplacer(depth)}  ${key}: ${getString(value, depth + 1)}`;
      case 'removed':
        return `${getReplacer(depth)}- ${key}: ${getString(value, depth + 1)}`;
      case 'added':
        return `${getReplacer(depth)}+ ${key}: ${getString(value, depth + 1)}`;
      case 'updated': {
        const string1 = `${getReplacer(depth)}- ${key}: ${getString(oldValue, depth + 1)}`;
        const string2 = `${getReplacer(depth)}+ ${key}: ${getString(newValue, depth + 1)}`;
        return `${string1}\n${string2}`;
      }
      default:
        throw new Error(`${status} is not defined`);
    }
  }).join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};

export default getStylish;
