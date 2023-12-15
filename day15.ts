import { range, readSplit, show, sumBy } from './util.ts';

const input = await readSplit(15, ',', false);

const hash = (s: string): number =>
  s
    .split('')
    .reduce<number>((accum, ch) => ((accum + ch.charCodeAt(0)) * 17) % 256, 0);

await show(sumBy(input, hash));

interface Lens {
  label: string;
  value: number;
}

const boxes: Lens[][] = [...range(0, 256)].map(() => []);

for (const lens of input) {
  const parse = lens.match(/^([a-z]+)(-|=([0-9]+))$/);
  if (!parse) {
    throw new Error(lens);
  }
  const l = parse[1];
  const box = hash(l);
  if (parse[2] === '-') {
    boxes[box] = boxes[box].filter(({ label }) => label !== l);
  } else {
    const power = Number(parse[3]);
    const idx = boxes[box].findIndex(({ label }) => label === l);
    if (idx >= 0) {
      boxes[box][idx].value = power;
    } else {
      boxes[box].push({ label: l, value: power });
    }
  }
}

await show(
  sumBy(boxes, (box, boxIdx) =>
    sumBy(box, ({ value }, i) => (boxIdx + 1) * (i + 1) * value)
  )
);
