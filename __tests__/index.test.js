import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => readFileSync(getFixturePath(filepath), 'utf-8');

const expected = readFile('expected.txt');

test.each(['json', 'yaml', 'yml'])('genDiff-test', (extension) => {
  const fileBefore = `__fixtures__/file1.${extension}`;
  const fileAfter = `__fixtures__/file2.${extension}`;
  expect(genDiff(fileBefore, fileAfter)).toEqual(expected);
});
