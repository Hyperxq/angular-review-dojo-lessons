import { parseFlow, rankFlow } from './flow';

describe('parseFlow', () => {
  it('reads edges with and without labels, keeping node order of first appearance', () => {
    const result = parseFlow('Click -> Store: dispatch\nStore -> View\nStore -> Logger: side effect');
    if (!result.ok) throw new Error(result.error);

    expect(result.value.nodes).toEqual(['Click', 'Store', 'View', 'Logger']);
    expect(result.value.edges).toEqual([
      { from: 'Click', to: 'Store', label: 'dispatch' },
      { from: 'Store', to: 'View', label: null },
      { from: 'Store', to: 'Logger', label: 'side effect' },
    ]);
  });

  it('trims whitespace and skips blank lines', () => {
    const result = parseFlow('\n  request   ->   interceptor A  \n\n');
    if (!result.ok) throw new Error(result.error);

    expect(result.value.edges).toEqual([{ from: 'request', to: 'interceptor A', label: null }]);
  });

  it.each([
    ['', 'empty'],
    ['A to B', '->'],
    ['A -> B -> C', 'one edge'],
    [' -> B', 'node'],
    ['A -> ', 'node'],
    ['A: x -> B', ':'],
    ['A -> : label', 'node'],
  ])('rejects %j with an error that mentions %s', (source, fragment) => {
    const result = parseFlow(source);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.toLowerCase()).toContain(fragment.toLowerCase());
  });

  it('reports the line number of the bad edge', () => {
    expect(parseFlow('A -> B\nB C')).toMatchObject({ ok: false, line: 2 });
  });
});

describe('rankFlow', () => {
  it('places every node one rank after its deepest parent', () => {
    const result = parseFlow('A -> B\nA -> C\nB -> D\nC -> D\nD -> E');
    if (!result.ok) throw new Error(result.error);

    expect(rankFlow(result.value)).toEqual([['A'], ['B', 'C'], ['D'], ['E']]);
  });

  it('terminates on cycles by ignoring the edge that closes the loop', () => {
    const result = parseFlow('Request -> 401\n401 -> Refresh\nRefresh -> Request: replay');
    if (!result.ok) throw new Error(result.error);

    expect(rankFlow(result.value)).toEqual([['Request'], ['401'], ['Refresh']]);
  });
});
