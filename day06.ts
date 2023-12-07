import { getNums, Pair, productBy, range, readSplit, show } from './util.ts';
import { zip } from 'collections/zip.ts';

const input = (await readSplit(6, '\n', false)).map((line) => getNums(line));

const races = zip(input[0], input[1]) as Pair<number>[];

const winCount = ([time, distance]: Pair<number>) => {
  let count = 0;
  for (const q of range(1, time)) {
    if (q * (time - q) > distance) {
      count += 1;
    }
  }
  return count;
};

await show(productBy(races, winCount));

await show(winCount([Number(input[0].join('')), Number(input[1].join(''))]));
