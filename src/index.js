import { readFileSync } from 'fs';
import path from 'path';
import makeTree from './buildTree.js';
import getStylish from './stylish.js';
import parse from './parsers.js';

const getPath = (fileName) => path.resolve(process.cwd(), fileName);

const getExtension = (fileName) => path.extname(fileName).slice(1);

const genDiff = (filepath1, filepath2) => {
  const filePath1 = getPath(filepath1);
  const filePath2 = getPath(filepath2);

  const fileExtension1 = getExtension(filepath1);
  const fileExtension2 = getExtension(filepath2);

  const fileData1 = readFileSync(filePath1, 'utf-8');
  const fileData2 = readFileSync(filePath2, 'utf-8');

  const parsedData1 = parse(fileData1, fileExtension1);
  const parsedData2 = parse(fileData2, fileExtension2);
  const tree = makeTree(parsedData1, parsedData2);
  return getStylish(tree);
};

export default genDiff;
