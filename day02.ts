import { getNums, readSplit, show, sumBy } from './util.ts';

interface Round {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  rounds: Round[];
}

const parseR = (r: string): Round =>
  Object.assign(
    { red: 0, green: 0, blue: 0 },
    Object.fromEntries(
      r.split(', ').map((s) => {
        const [n, key] = s.split(' ');
        return [key, Number(n)];
      })
    )
  );

const parse = (x: string): Game => {
  const [idpart, ...parts] = x.split(/[:;] /);
  const [id] = getNums(idpart);
  return { id, rounds: parts.map(parseR) };
};

const input = (await readSplit(2)).map(parse);

const okay = ({ rounds }: Game) =>
  rounds.every(
    ({ red, green, blue }) => red <= 12 && green <= 13 && blue <= 14
  );

await show(sumBy(input.filter(okay), ({ id }) => id));

const maxG = (rs: readonly Round[]): Round =>
  rs.reduce(
    (a, b) => ({
      red: Math.max(a.red, b.red),
      green: Math.max(a.green, b.green),
      blue: Math.max(a.blue, b.blue),
    }),
    { red: 0, green: 0, blue: 0 }
  );

const power = ({ rounds }: Game) => {
  const m = maxG(rounds);
  return m.red * m.green * m.blue;
};

await show(sumBy(input, power));
