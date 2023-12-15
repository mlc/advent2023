import { range, readSplit, show, sumBy } from './util.ts';

const input = await readSplit(15, ',', false);

const hash = (s: string): number =>
  s
    .split('')
    .reduce<number>((accum, ch) => ((accum + ch.charCodeAt(0)) * 17) % 256, 0);

await show(sumBy(input, hash));

interface Lens {
  label: string;
  power: number;
}

const boxes: Lens[][] = [...range(0, 256)].map(() => []);

for (const lens of input) {
  const parse = lens.match(/^([a-z]+)(-|=([0-9]+))$/);
  if (!parse) {
    throw new Error(lens);
  }
  const l = parse[1];
  const box = hash(l);
  const idx = boxes[box].findIndex(({ label }) => label === l);
  if (parse[2] === '-') {
    if (idx >= 0) {
      boxes[box].splice(idx, 1);
    }
  } else {
    const power = Number(parse[3]);
    if (idx >= 0) {
      boxes[box][idx].power = power;
    } else {
      boxes[box].push({ label: l, power });
    }
  }
}

await show(
  sumBy(boxes, (box, boxIdx) =>
    sumBy(box, ({ power }, i) => (boxIdx + 1) * (i + 1) * power)
  )
);
