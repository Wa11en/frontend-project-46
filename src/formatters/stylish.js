import _ from 'lodash';

const getIndentation = (depth, replacer = ' ', leftIndent = 2) => replacer.repeat(depth * 4 - leftIndent);

const getString = (data, depth) => {
  if (!_.isObject(data)) {
    return `${data}`;
  }
  const entries = Object.entries(data);
  const string = entries.map(([key, value]) => `${getIndentation(depth)}  ${key}: ${getString(value, depth + 1)}`);
  return `{\n${string.join('\n')}\n${getIndentation(depth - 1, ' ', 0)}}`;
};

const stylish = (tree) => {
  const iter = (data, depth) => data.map((obj) => {
    const {
      key, value, children, status, oldValue, newValue,
    } = obj;
    switch (status) {
      case 'nested':
        return `${getIndentation(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${getIndentation(depth, ' ', 0)}}`;
      case 'unupdated':
        return `${getIndentation(depth)}  ${key}: ${getString(value, depth + 1)}`;
      case 'removed':
        return `${getIndentation(depth)}- ${key}: ${getString(value, depth + 1)}`;
      case 'added':
        return `${getIndentation(depth)}+ ${key}: ${getString(value, depth + 1)}`;
      case 'updated': {
        const string1 = `${getIndentation(depth)}- ${key}: ${getString(oldValue, depth + 1)}`;
        const string2 = `${getIndentation(depth)}+ ${key}: ${getString(newValue, depth + 1)}`;
        return `${string1}\n${string2}`;
      }
      default: throw new Error(`Status "${status}" is not defined for key "${key}"`);
    }
  }).join('\n');
  return `{\n${iter(tree, 1)}\n}`;
};

export default stylish;
