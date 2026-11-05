import { parseTree } from './tree';

describe('parseTree', () => {
  it('nests nodes by two-space indentation', () => {
    const result = parseTree('App\n  Header\n  ProductList\n    ProductRow\n  Footer');
    if (!result.ok) throw new Error(result.error);

    expect(result.value).toEqual([
      {
        label: 'App',
        badges: [],
        children: [
          { label: 'Header', badges: [], children: [] },
          {
            label: 'ProductList',
            badges: [],
            children: [{ label: 'ProductRow', badges: [], children: [] }],
          },
          { label: 'Footer', badges: [], children: [] },
        ],
      },
    ]);
  });

  it('reads trailing badges, one or several', () => {
    const result = parseTree('ProductList [OnPush]\n  ProductRow [Eager] [dirty]');
    if (!result.ok) throw new Error(result.error);

    expect(result.value[0].label).toBe('ProductList');
    expect(result.value[0].badges).toEqual(['OnPush']);
    expect(result.value[0].children[0]).toEqual({
      label: 'ProductRow',
      badges: ['Eager', 'dirty'],
      children: [],
    });
  });

  it('keeps brackets that are not trailing as part of the label', () => {
    const result = parseTree('items[0] value');
    if (!result.ok) throw new Error(result.error);

    expect(result.value[0]).toEqual({ label: 'items[0] value', badges: [], children: [] });
  });

  it('allows several roots and dedenting more than one level', () => {
    const result = parseTree('root injector\n  feature\n    component\nplatform injector');
    if (!result.ok) throw new Error(result.error);

    expect(result.value.map((node) => node.label)).toEqual(['root injector', 'platform injector']);
  });

  it.each([
    ['', 'empty'],
    ['  App', 'indented'],
    ['App\n   Header', 'two spaces'],
    ['App\n    Header', 'level'],
    ['App\n\tHeader', 'tab'],
    ['App\n  [OnPush]', 'label'],
  ])('rejects %j with an error that mentions %s', (source, fragment) => {
    const result = parseTree(source);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.error.toLowerCase()).toContain(fragment.toLowerCase());
  });

  it('reports the line number of the bad node', () => {
    expect(parseTree('App\n  Header\n     Logo')).toMatchObject({ ok: false, line: 3 });
  });
});
