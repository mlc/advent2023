import { map2D, readSplit, show, sumBy } from './util.ts';

type Ch = '.' | '#' | 'O';

const input: Ch[][] = (await readSplit(14, '\n', false)).map(
  (r) => r.split('') as Ch[]
);

const height = input.length;

const load = map2D(input, ([x, y], ch): number => {
  if (ch !== 'O') {
    return 0;
  }
  let otherRocks = 0;
  let i: number;
  for (i = x - 1; i >= 0 && input[i][y] !== '#'; --i) {
    if (input[i][y] === 'O') {
      otherRocks++;
    }
  }
  return height - (i + 1) - otherRocks;
});

await show(sumBy(load, (r) => sumBy(r)));
