import { getNums, readSplit, show, sumBy } from './util.ts';

const input = (await readSplit(9, '\n', false)).map((l) => getNums(l, false));

const d = (inputs: number[]) => {
  const result: number[] = [];
  for (let i = 1; i < inputs.length; ++i) {
    result.push(inputs[i] - inputs[i - 1]);
  }
  return result;
};

const done = (ds: number[]) => ds.every((d) => d === 0);

const nextVal = (row: number[]) => {
  const dsets: number[][] = [row];
  while (!done(dsets[dsets.length - 1])) {
    dsets.push(d(dsets[dsets.length - 1]));
  }
  for (let i = dsets.length - 1; i >= 0; --i) {
    const dset = dsets[i];
    const nextSet = dsets[i + 1];
    dsets[i] = [
      ...dset,
      nextSet ? dset[dset.length - 1] + nextSet[nextSet.length - 1] : 0,
    ];
  }
  return dsets[0][dsets[0].length - 1];
};

await show(sumBy(input, nextVal));

const prevVal = (row: number[]) => {
  const dsets: number[][] = [row];
  while (!done(dsets[dsets.length - 1])) {
    dsets.push(d(dsets[dsets.length - 1]));
  }
  for (let i = dsets.length - 1; i >= 0; --i) {
    const dset = dsets[i];
    const nextSet = dsets[i + 1];
    dsets[i] = [nextSet ? dset[0] - nextSet[0] : 0, ...dset];
  }
  return dsets[0][0];
};

await show(sumBy(input, prevVal));
