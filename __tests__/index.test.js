import genDiff from '../src/index.js';
import path from 'path';
import fs from 'fs';

test('compare flat JSON files', () => {
  const filepath1 = path.join(__dirname, '__fixtures__', 'file1.json');
  const filepath2 = path.join(__dirname, '__fixtures__', 'file2.json');
  const expected = fs.readFileSync(path.join(__dirname, '__fixtures__', 'expected.txt'), 'utf-8');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});