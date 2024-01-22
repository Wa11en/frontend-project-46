import fs from 'fs';

const genDiff = (filepath1, filepath2) => {
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');

  const obj1 = JSON.parse(data1);
  const obj2 = JSON.parse(data2);

  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])];
  keys.sort();

  const diff = keys.map((key) => {
    if (!(key in obj1)) {
      return ` + ${key}: ${obj2[key]}`;
    }
    if (!(key in obj2)) {
      return ` - ${key}: ${obj1[key]}`;
    }
    if (obj1[key] === obj2[key]) {
      return ` ${key}: ${obj1[key]}`;
    }
    return ` - ${key}: ${obj1[key]}\n + ${key}: ${obj2[key]}`;
  });

  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
