import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

const plain = (diffTree, ancestry = '') => {
  const lines = diffTree.flatMap((node) => {
    const {
      key, status, value, oldValue, newValue, children,
    } = node;
    const property = `${ancestry}${key}`;

    switch (status) {
      case 'nested':
        return plain(children, `${property}.`);
      case 'added':
        return `Property '${property}' was added with value: ${stringify(value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'updated':
        return `Property '${property}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
      default:
        return [];
    }
  });

  return lines.join('\n');
};
export default plain;
