import { getNums, readSplit, show, sumBy } from './util.ts';

interface Round {
  red?: number;
  green?: number;
  blue?: number;
}

interface Game {
  id: number;
  rounds: Round[];
}

const parseR = (r: string): Round => {
  const entries = r.split(', ');
  return Object.fromEntries(
    entries.map((s) => {
      const [n, key] = s.split(' ');
      return [key, Number(n)];
    })
  ) as Round;
};

const parse = (x: string): Game => {
  const [idpart, ...parts] = x.split(/[:;] /);
  const [id] = getNums(idpart);
  return { id, rounds: parts.map(parseR) };
};

const input = (await readSplit(2)).map(parse);

const okay = ({ rounds }: Game) =>
  rounds.every(
    ({ red, green, blue }) =>
      (red ?? 0) <= 12 && (green ?? 0) <= 13 && (blue ?? 0) <= 14
  );

await show(sumBy(input.filter(okay), ({ id }) => id));

const maxG = (rs: readonly Round[]): Round =>
  rs.reduce(
    (a, b) => ({
      red: Math.max(a.red ?? 0, b.red ?? 0),
      green: Math.max(a.green ?? 0, b.green ?? 0),
      blue: Math.max(a.blue ?? 0, b.blue ?? 0),
    }),
    { red: 0, green: 0, blue: 0 }
  );

const power = ({ rounds }: Game) => {
  const m = maxG(rounds);
  return m.red! * m.green! * m.blue!;
};

await show(sumBy(input, power));
