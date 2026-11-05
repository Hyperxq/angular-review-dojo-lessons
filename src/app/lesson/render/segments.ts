import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import { Marked, Renderer, type Token, type Tokens } from 'marked';
import { parseFlow, type FlowGraph } from '../parse/flow';
import { parseMarbles, type MarbleDiagram } from '../parse/marbles';
import type { ParseResult } from '../parse/result';
import { parseTree, type TreeNode } from '../parse/tree';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);
hljs.registerAliases(['ts', 'js', 'javascript'], { languageName: 'typescript' });
hljs.registerAliases(['html', 'angular'], { languageName: 'xml' });
hljs.registerAliases(['sh', 'shell', 'zsh'], { languageName: 'bash' });

export type Segment =
  | { readonly kind: 'html'; readonly html: string }
  | { readonly kind: 'code'; readonly lang: string; readonly html: string; readonly text: string }
  | { readonly kind: 'marbles'; readonly source: string; readonly result: ParseResult<MarbleDiagram> }
  | { readonly kind: 'flow'; readonly source: string; readonly result: ParseResult<FlowGraph> }
  | { readonly kind: 'tree'; readonly source: string; readonly result: ParseResult<TreeNode[]> };

const ALERTS: Record<string, string> = {
  NOTE: 'Note',
  TIP: 'Tip',
  IMPORTANT: 'Important',
  WARNING: 'Warning',
  CAUTION: 'Caution',
};

export const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function highlight(code: string, lang: string): string {
  const language = hljs.getLanguage(lang) ? lang : null;
  return language ? hljs.highlight(code, { language }).value : escapeHtml(code);
}

const markdown = new Marked({
  gfm: true,
  renderer: {
    // A chapter page owns the h1, so lesson ### becomes h2.
    heading({ tokens, depth }) {
      const level = Math.min(Math.max(depth - 1, 2), 6);
      return `<h${level}>${this.parser.parseInline(tokens)}</h${level}>\n`;
    },
    blockquote({ tokens }) {
      const inner = this.parser.parse(tokens);
      const alert = /^<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/.exec(inner);
      if (!alert) return `<blockquote>${inner}</blockquote>\n`;
      const type = alert[1].toLowerCase();
      const rest = inner.slice(alert[0].length).replace(/^<\/p>\s*/, '');
      const body = rest.startsWith('<') ? rest : `<p>${rest}`;
      return `<aside class="callout callout--${type}" role="note"><p class="callout__label">${ALERTS[alert[1]]}</p>${body}</aside>\n`;
    },
    code({ text, lang }) {
      const language = (lang ?? '').split(/\s/)[0];
      return `<pre class="code"><code>${highlight(text, language)}</code></pre>\n`;
    },
    table(token) {
      return `<div class="table-scroll">${Renderer.prototype.table.call(this, token)}</div>`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:/.test(href);
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
      const target = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeHtml(href)}"${titleAttr}${target}>${text}</a>`;
    },
  },
});

export const renderInline = (source: string): string => markdown.parseInline(source) as string;

export function toSegments(source: string): Segment[] {
  const segments: Segment[] = [];
  const tokens = markdown.lexer(source);
  let prose: Token[] = [];
  const flush = () => {
    if (prose.length === 0) return;
    const html = markdown.parser(Object.assign(prose, { links: tokens.links }));
    if (html.trim()) segments.push({ kind: 'html', html });
    prose = [];
  };

  for (const token of tokens) {
    if (token.type !== 'code') {
      prose.push(token);
      continue;
    }
    flush();
    const { text, lang } = token as Tokens.Code;
    const info = (lang ?? '').split(/\s/)[0];
    if (info === 'marbles') segments.push({ kind: 'marbles', source: text, result: parseMarbles(text) });
    else if (info === 'flow') segments.push({ kind: 'flow', source: text, result: parseFlow(text) });
    else if (info === 'tree') segments.push({ kind: 'tree', source: text, result: parseTree(text) });
    else segments.push({ kind: 'code', lang: info, html: highlight(text, info), text });
  }
  flush();
  return segments;
}
