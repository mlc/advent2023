import { Coord, productBy, range, readSplit, show } from './util.ts';

const input = await readSplit(3, '\n', false);

const digits = /[0-9]+/g;

const isSym = (ch: string | undefined) => {
  return typeof ch === 'string' && ch !== '.' && (ch < '0' || ch > '9');
};

let sum = 0;

input.forEach((row, x) => {
  let match: RegExpMatchArray | null;
  while ((match = digits.exec(row)) !== null) {
    const n = Number(match[0]);
    const y = match!.index!;
    const valid = [...range(x - 1, x + 2)].some((cx) =>
      [...range(y - 1, y + match![0].length + 1)].some((cy) =>
        isSym(input[cx]?.[cy])
      )
    );
    if (valid) {
      sum += n;
    }
  }
});

await show(sum);

const adjacencies = new Map<string, number[]>();
const addAdj = ([x, y]: Coord, n: number) => {
  const key = `${x},${y}`;
  adjacencies.set(key, [...(adjacencies.get(key) ?? []), n]);
};

input.forEach((row, x) => {
  let match: RegExpMatchArray | null;
  while ((match = digits.exec(row)) !== null) {
    const n = Number(match[0]);
    const y = match!.index!;
    for (const cx of range(x - 1, x + 2)) {
      for (const cy of range(y - 1, y + match![0].length + 1)) {
        if (input[cx]?.[cy] === '*') {
          addAdj([cx, cy], n);
        }
      }
    }
  }
});

sum = 0;
for (const val of adjacencies.values()) {
  if (val.length === 2) {
    sum += productBy(val);
  }
}

await show(sum);
