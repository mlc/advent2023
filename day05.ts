import { getNums, Pair, readSplit, show } from './util.ts';
import { chunk } from 'collections/chunk.ts';

type Entry = [drange: number, srange: number, len: number];

interface SMap {
  from: string;
  to: string;
  entries: Entry[];
}

const parse = (x: string): SMap => {
  const [first, ...rest] = x.split('\n');
  const [from, , to] = first.split(/[- ]/);
  return {
    from,
    to,
    entries: rest.map((r) => getNums(r)) as Entry[],
  };
};

const input = await readSplit(5, '\n\n', false);
const seeds = getNums(input[0]);
const maps = input.slice(1).map(parse);

const doMap = (n: number) => {
  let target = n;
  OUTER: for (const map of maps) {
    for (const [drange, srange, len] of map.entries) {
      const diff = target - srange;
      if (diff >= 0 && diff < len) {
        target = drange + diff;
        continue OUTER;
      }
    }
  }
  return target;
};

await show(Math.min(...seeds.map(doMap)));

// const seedRanges: Pair<number>[] = chunk(seeds, 2);
//
// const doMapRange = (range: Pair<number>, map: SMap): Pair<number>[] => {
//   const result: Pair<number>[] = [];
//
//   for (const [drange, srange, len] of map.entries) {
//     if (srange )
//   }
//
//   return result;
// };
