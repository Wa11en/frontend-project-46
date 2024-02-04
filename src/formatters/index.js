import stylish from './stylish.js';
import plain from './plain.js';

const getFormatter = (tree, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(tree);
    case 'stylish':
      return stylish(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
export default getFormatter;
