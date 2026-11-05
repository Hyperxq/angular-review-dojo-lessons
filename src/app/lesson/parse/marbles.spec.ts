import { parseMarbles } from './marbles';

const contractExample = [
  'id$:     1-----2----------',
  'first:   --a---x            // cancelled by switchMap',
  'second:  ------------b|',
  'result$: ------------b----',
].join('\n');

describe('parseMarbles', () => {
  it('reads labels, values and the shared time axis', () => {
    const result = parseMarbles(contractExample);
    if (!result.ok) throw new Error(result.error);

    expect(result.value.rows.map((row) => row.label)).toEqual(['id$', 'first', 'second', 'result$']);
    expect(result.value.frames).toBe(17);
    expect(result.value.rows[0]).toEqual({
      label: 'id$',
      start: 0,
      end: 17,
      note: null,
      events: [
        { frame: 0, kind: 'value', value: '1' },
        { frame: 6, kind: 'value', value: '2' },
      ],
    });
  });

  it('marks cancellation with x and keeps the trailing note', () => {
    const result = parseMarbles(contractExample);
    if (!result.ok) throw new Error(result.error);

    expect(result.value.rows[1]).toEqual({
      label: 'first',
      start: 0,
      end: 7,
      note: 'cancelled by switchMap',
      events: [
        { frame: 2, kind: 'value', value: 'a' },
        { frame: 6, kind: 'cancel' },
      ],
    });
  });

  it('marks completion with | and errors with #', () => {
    const result = parseMarbles('ok:  -a|\nbad: --#');
    if (!result.ok) throw new Error(result.error);

    expect(result.value.rows[0].events).toEqual([
      { frame: 1, kind: 'value', value: 'a' },
      { frame: 2, kind: 'complete' },
    ]);
    expect(result.value.rows[1].events).toEqual([{ frame: 2, kind: 'error' }]);
  });

  it('starts a row late when its timeline begins in a later column', () => {
    const result = parseMarbles('outer: a-----b\ninner:    --c|');
    if (!result.ok) throw new Error(result.error);

    expect(result.value.rows[1].start).toBe(3);
    expect(result.value.rows[1].events).toEqual([
      { frame: 5, kind: 'value', value: 'c' },
      { frame: 6, kind: 'complete' },
    ]);
  });

  it('accepts dashes after a terminal as alignment padding', () => {
    const result = parseMarbles('a: -1|---\nb: ---#--');
    if (!result.ok) throw new Error(result.error);

    expect(result.value.rows[0].events).toEqual([
      { frame: 1, kind: 'value', value: '1' },
      { frame: 2, kind: 'complete' },
    ]);
    expect(result.value.frames).toBe(6);
  });

  it('ignores blank lines', () => {
    const result = parseMarbles('\na: -1-\n\n');
    expect(result.ok).toBe(true);
  });

  it.each([
    ['', 'empty'],
    ['just text', 'label: timeline'],
    [': --a', 'label'],
    ['a:    ', 'timeline'],
    ['a: --a-->', "'>'"],
    ['a: --(ab)', "'('"],
    ['a: --a|-b', 'after'],
    ['a: --#-b', 'after'],
    ['a: --a b', 'after the timeline'],
    ['a:\t--a\nb:  --b', 'tab'],
  ])('rejects %j with an error that mentions %s', (source, fragment) => {
    const result = parseMarbles(source);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.toLowerCase()).toContain(fragment.toLowerCase());
  });

  it('reports the line number of the bad row', () => {
    const result = parseMarbles('a: --a\nb: --?');

    expect(result).toMatchObject({ ok: false, line: 2 });
  });
});
