import { fail, type ParseResult } from './result';

export interface TreeNode {
  readonly label: string;
  readonly badges: readonly string[];
  readonly children: readonly TreeNode[];
}

interface MutableNode {
  label: string;
  badges: string[];
  children: MutableNode[];
}

const TRAILING_BADGE = /\s*\[([^\]]+)\]\s*$/;

export function parseTree(source: string): ParseResult<TreeNode[]> {
  const roots: MutableNode[] = [];
  const path: MutableNode[] = [];

  for (const [index, text] of source.split('\n').entries()) {
    const line = index + 1;
    if (text.trim() === '') continue;
    if (text.includes('\t')) return fail(line, 'Use two spaces per level, not tabs.');

    const indent = text.length - text.trimStart().length;
    if (indent % 2 !== 0) return fail(line, 'Indent with two spaces per level.');
    const level = indent / 2;
    if (path.length === 0 && level > 0) return fail(line, 'The first node cannot be indented.');
    if (level > path.length) return fail(line, 'A node can only go one level deeper than its parent.');

    let label = text.trim();
    const badges: string[] = [];
    for (let match = TRAILING_BADGE.exec(label); match; match = TRAILING_BADGE.exec(label)) {
      badges.unshift(match[1].trim());
      label = label.slice(0, match.index);
    }
    if (label === '') return fail(line, 'A node needs a label before its badges.');

    const node: MutableNode = { label, badges, children: [] };
    path.length = level;
    (level === 0 ? roots : path[level - 1].children).push(node);
    path.push(node);
  }

  if (roots.length === 0) return fail(1, 'The tree is empty.');
  return { ok: true, value: roots };
}
