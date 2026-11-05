import { fail, type ParseResult } from './result';

export interface FlowEdge {
  readonly from: string;
  readonly to: string;
  readonly label: string | null;
}

export interface FlowGraph {
  readonly nodes: readonly string[];
  readonly edges: readonly FlowEdge[];
}

export function parseFlow(source: string): ParseResult<FlowGraph> {
  const nodes = new Set<string>();
  const edges: FlowEdge[] = [];

  for (const [index, text] of source.split('\n').entries()) {
    const line = index + 1;
    if (text.trim() === '') continue;

    const parts = text.split('->');
    if (parts.length === 1) return fail(line, 'Expected `From -> To` or `From -> To: label`.');
    if (parts.length > 2) return fail(line, 'Write one edge per line.');

    const from = parts[0].trim();
    if (from.includes(':')) return fail(line, `Node "${from}" may not contain ':'.`);
    const colon = parts[1].indexOf(':');
    const to = (colon === -1 ? parts[1] : parts[1].slice(0, colon)).trim();
    const label = colon === -1 ? null : parts[1].slice(colon + 1).trim() || null;
    if (from === '' || to === '') return fail(line, 'Both ends of an edge need a node name.');

    nodes.add(from).add(to);
    edges.push({ from, to, label });
  }

  if (edges.length === 0) return fail(1, 'The flow is empty.');
  return { ok: true, value: { nodes: [...nodes], edges } };
}

/**
 * Longest-path layering: each node sits one rank after its deepest parent.
 * Edges that close a cycle (found by DFS in declaration order) are left out of the ranking.
 */
export function rankFlow(graph: FlowGraph): string[][] {
  const outgoing = new Map(graph.nodes.map((node) => [node, [] as string[]]));
  for (const edge of graph.edges) outgoing.get(edge.from)!.push(edge.to);

  const forward = new Map(graph.nodes.map((node) => [node, [] as string[]]));
  const state = new Map<string, 'open' | 'done'>();
  const visit = (node: string): void => {
    state.set(node, 'open');
    for (const next of outgoing.get(node)!) {
      if (state.get(next) === 'open') continue;
      forward.get(node)!.push(next);
      if (!state.has(next)) visit(next);
    }
    state.set(node, 'done');
  };
  for (const node of graph.nodes) if (!state.has(node)) visit(node);

  const rank = new Map<string, number>();
  const rankOf = (node: string): number => {
    const known = rank.get(node);
    if (known !== undefined) return known;
    const parents = graph.nodes.filter((parent) => forward.get(parent)!.includes(node));
    const value = parents.length === 0 ? 0 : Math.max(...parents.map(rankOf)) + 1;
    rank.set(node, value);
    return value;
  };

  const ranks: string[][] = [];
  for (const node of graph.nodes) (ranks[rankOf(node)] ??= []).push(node);
  return ranks;
}
