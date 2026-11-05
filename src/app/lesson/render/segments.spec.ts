import { toSegments } from './segments';

describe('toSegments', () => {
  it('turns GitHub alerts into callouts', () => {
    const [segment] = toSegments('> [!WARNING]\n> `retry(3)` hits the server again at once.');

    expect(segment.kind).toBe('html');
    if (segment.kind !== 'html') return;
    expect(segment.html).toContain('class="callout callout--warning"');
    expect(segment.html).toContain('<p class="callout__label">Warning</p>');
    expect(segment.html).toContain('<code>retry(3)</code> hits the server');
    expect(segment.html).not.toContain('[!WARNING]');
  });

  it('keeps plain blockquotes as blockquotes', () => {
    const [segment] = toSegments('> just a quote');

    expect(segment).toMatchObject({ kind: 'html' });
    expect(segment.kind === 'html' && segment.html).toContain('<blockquote>');
  });

  it('shifts headings down one level so the page keeps a single h1', () => {
    const [segment] = toSegments('### The tools');

    expect(segment.kind === 'html' && segment.html).toContain('<h2>The tools</h2>');
  });

  it('splits code, marbles, flow and tree blocks out of the prose, in order', () => {
    const segments = toSegments(
      [
        'Intro.',
        '```ts\nconst a = 1;\n```',
        '```marbles\na: -1|\n```',
        '```flow\nA -> B\n```',
        '```tree\nApp [OnPush]\n```',
        'Outro.',
      ].join('\n\n'),
    );

    expect(segments.map((segment) => segment.kind)).toEqual(['html', 'code', 'marbles', 'flow', 'tree', 'html']);
    expect(segments[1]).toMatchObject({ kind: 'code', lang: 'ts', text: 'const a = 1;' });
    expect(segments[1].kind === 'code' && segments[1].html).toContain('hljs-keyword');
    expect(segments[2]).toMatchObject({ kind: 'marbles', result: { ok: true } });
  });

  it('keeps a broken visual block with its source and the parse error', () => {
    const [segment] = toSegments('```marbles\na: --a-->\n```');

    expect(segment).toMatchObject({ kind: 'marbles', source: 'a: --a-->', result: { ok: false, line: 1 } });
  });

  it('escapes code in languages it does not highlight', () => {
    const [segment] = toSegments('```text\n<b>raw</b>\n```');

    expect(segment).toMatchObject({ kind: 'code', html: '&lt;b&gt;raw&lt;/b&gt;' });
  });
});
