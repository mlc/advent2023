import { gcdMany, productBy, readSplit, show } from './util.ts';

const parseNode = (x: string): [string, [string, string]] => {
  const parts = x.split(/[^A-Z]+/);
  return [parts[0], [parts[1], parts[2]]];
};

const [steps, nodeStrs] = await readSplit(8, '\n\n', false);
const nodes = Object.fromEntries(nodeStrs.split('\n').map(parseNode));

const pathLen = (start = 'AAA', target = (n: string) => n === 'ZZZ') => {
  let count = 0;
  let node = start;
  while (!target(node)) {
    const dir = steps[count % steps.length];
    node = nodes[node][dir === 'L' ? 0 : 1];
    count += 1;
  }
  return count;
};

await show(pathLen());

const ghostStarts = Object.keys(nodes).filter((n) => n[2] === 'A');
const ghostLens = ghostStarts.map((gs) => pathLen(gs, (n) => n[2] === 'Z'));

const gcd = gcdMany(...ghostLens);
await show(productBy(ghostLens) / Math.pow(gcd, ghostLens.length - 1));
