import { getNums, readSplit, setIntersect, show, sumBy } from './util.ts';

interface Card {
  id: number;
  hand: Set<number>;
  winners: Set<number>;
}

const parse = (x: string): Card => {
  const [idpart, handpart, wpart] = x.split(/[:|]/);
  const [id] = getNums(idpart);
  const hand = new Set(getNums(handpart));
  const winners = new Set(getNums(wpart));
  return { id, hand, winners };
};

const input = (await readSplit(4, '\n', false)).map(parse);

const score = ({ hand, winners }: Card) => {
  const n = setIntersect(hand, winners).size;
  return n === 0 ? 0 : 1 << (n - 1);
};

await show(sumBy(input, score));

const counts: [count: number, card: Card][] = input.map((c) => [1, c]);

for (let i = 0; i < counts.length; i += 1) {
  const [count, { hand, winners }] = counts[i];
  const n = setIntersect(hand, winners).size;
  for (let j = 0; j < n; j += 1) {
    const [oc, c] = counts[i + j + 1];
    counts[i + j + 1] = [oc + count, c];
  }
}

await show(sumBy(counts, ([count]) => count));
