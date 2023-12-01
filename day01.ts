import { readSplit, show, sumBy } from './util.ts';

const parse = (r: string) =>
  r
    .split('')
    .filter((ch) => ch >= '0' && ch <= '9')
    .map(Number);

const input = await readSplit(1, '\n', false);

const calibration = (r: number[]) => r[0] * 10 + r[r.length - 1];

await show(sumBy(input.map(parse), calibration));

const digits = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const re = new RegExp('[0-9]|' + Object.keys(digits).join('|'));
const re2 = new RegExp('^.*([0-9]|' + Object.keys(digits).join('|') + ')');

const replacer = (m: string) =>
  String(m.length === 1 ? m : digits[m as keyof typeof digits]);

const replaceLast = (m: string) => {
  const match = re2.exec(m)?.[1];
  if (!match) {
    return m;
  }
  const idx = m.lastIndexOf(match);
  return m.slice(0, idx) + replacer(match) + m.slice(idx + match.length);
};

const swapem = (r: string) => replaceLast(r.replace(re, replacer));

await show(
  sumBy(
    input.map((r) => parse(swapem(r))),
    calibration
  )
);
