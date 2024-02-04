import yaml from 'js-yaml';

const parse = (data, format) => {
  if (!data || typeof data !== 'string') {
    throw new Error('Data is not a valid string');
  }

  switch (format) {
    case 'json':
      try {
        return JSON.parse(data);
      } catch (error) {
        throw new Error('Invalid JSON format');
      }
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default parse;
