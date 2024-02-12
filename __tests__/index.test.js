import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJSON = readFile('expectedJson.txt');

test.each(['json', 'yaml', 'yml'])('genDiff-test', (extension) => {
  const firstFile = getFixturePath(`file1.${extension}`);
  const secondFile = getFixturePath(`file2.${extension}`);
  expect(genDiff(firstFile, secondFile)).toEqual(expectedStylish);
  expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(expectedStylish);
  expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expectedPlain);
  expect(genDiff(firstFile, secondFile, 'json')).toEqual(expectedJSON);
});
