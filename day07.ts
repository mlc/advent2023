import { readSplit, show, sumBy } from './util.ts';
import { MultiSet } from 'mnemonist';

interface Entry {
  hand: string;
  bid: number;
}

const parse = (x: string): Entry => {
  const [hand, bids] = x.split(' ');
  return { hand, bid: Number(bids) };
};

const input = (await readSplit(7, '\n', false)).map(parse);

const rank = (hand: string) => {
  const s: MultiSet<string> = MultiSet.from(hand.split(''));
  const ms: number[] = [...s.multiplicities()]
    .map(([_, v]) => v)
    .sort((a, b) => b - a);

  if (ms[0] === 5) {
    return 99;
  } else if (ms[0] === 4) {
    return 98;
  } else if (ms[0] === 3 && ms[1] === 2) {
    return 97;
  } else if (ms[0] === 3) {
    return 96;
  } else if (ms[0] === 2 && ms[1] === 2) {
    return 95;
  } else if (ms[0] === 2) {
    return 94;
  } else {
    return 93;
  }
};

const baseCards: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
};

const compare = (
  r: (hand: string) => number,
  cards: Record<string, number>
) => {
  const digitRank = (hand: string) =>
    sumBy(hand.split(''), (ch, idx) => cards[ch] * Math.pow(20, 5 - idx));

  return ({ hand: h1 }: Entry, { hand: h2 }: Entry) => {
    const r1 = r(h1);
    const r2 = r(h2);
    if (r1 !== r2) {
      return r1 - r2;
    } else {
      return digitRank(h1) - digitRank(h2);
    }
  };
};

const wah = [...input].sort(compare(rank, baseCards));
await show(sumBy(wah, ({ bid }, i) => bid * (i + 1)));

const jokCards: Record<string, number> = {
  A: 14,
  K: 13,
  Q: 12,
  T: 10,
  '9': 9,
  '8': 8,
  '7': 7,
  '6': 6,
  '5': 5,
  '4': 4,
  '3': 3,
  '2': 2,
  J: 1,
};

const jokRank = (hand: string) => {
  if (hand.indexOf('J') === -1) {
    return rank(hand);
  } else {
    return Math.max(
      ...Object.keys(jokCards).map((card) => rank(hand.replaceAll('J', card)))
    );
  }
};

const wah2 = [...input].sort(compare(jokRank, jokCards));
await show(sumBy(wah2, ({ bid }, i) => bid * (i + 1)));
