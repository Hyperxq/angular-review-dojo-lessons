import { fail, type ParseResult } from './result';

export type MarbleKind = 'value' | 'complete' | 'error' | 'cancel';

export interface MarbleEvent {
  readonly frame: number;
  readonly kind: MarbleKind;
  /** Present only when kind is 'value'. */
  readonly value?: string;
}

export interface MarbleRow {
  readonly label: string;
  /** First frame of the timeline, on the axis shared by every row. */
  readonly start: number;
  /** Frame after the last character of the timeline. */
  readonly end: number;
  readonly note: string | null;
  readonly events: readonly MarbleEvent[];
}

export interface MarbleDiagram {
  readonly rows: readonly MarbleRow[];
  readonly frames: number;
}

const TERMINALS = { '|': 'complete', '#': 'error', x: 'cancel' } as const;
const VALUE = /^[A-Za-z0-9]$/;

interface RawRow {
  line: number;
  label: string;
  column: number;
  timeline: string;
  note: string | null;
}

export function parseMarbles(source: string): ParseResult<MarbleDiagram> {
  const raw: RawRow[] = [];
  const lines = source.split('\n');

  for (const [index, text] of lines.entries()) {
    const line = index + 1;
    if (text.trim() === '') continue;
    if (text.includes('\t')) return fail(line, 'Tabs break column alignment; use spaces.');

    const colon = text.indexOf(':');
    if (colon === -1) return fail(line, 'Expected `label: timeline`.');
    const label = text.slice(0, colon).trim();
    if (label === '') return fail(line, 'The row has no label before the colon.');

    const rest = text.slice(colon + 1);
    const offset = rest.search(/\S/);
    if (offset === -1) return fail(line, `Row "${label}" has no timeline.`);

    const body = rest.slice(offset);
    const space = body.search(/\s/);
    const timeline = space === -1 ? body : body.slice(0, space);
    const tail = space === -1 ? '' : body.slice(space).trim();
    if (timeline.startsWith('//')) return fail(line, `Row "${label}" has no timeline.`);

    let note: string | null = null;
    if (tail !== '') {
      if (!tail.startsWith('//')) {
        return fail(line, `Unexpected text after the timeline of "${label}": notes start with //.`);
      }
      note = tail.slice(2).trim() || null;
    }
    raw.push({ line, label, column: colon + 1 + offset, timeline, note });
  }

  if (raw.length === 0) return fail(1, 'The diagram is empty.');

  const origin = Math.min(...raw.map((row) => row.column));
  const rows: MarbleRow[] = [];

  for (const row of raw) {
    const start = row.column - origin;
    const events: MarbleEvent[] = [];
    let ended: string | null = null;

    for (const [i, char] of [...row.timeline].entries()) {
      const frame = start + i;
      if (char === '-') continue;
      // Dashes after a terminal are alignment padding; anything else is a second ending or a late value.
      if (ended !== null) {
        return fail(row.line, `Nothing may come after '${ended}' in "${row.label}".`);
      }
      if (char in TERMINALS) {
        events.push({ frame, kind: TERMINALS[char as keyof typeof TERMINALS] });
        ended = char;
      } else if (VALUE.test(char)) {
        events.push({ frame, kind: 'value', value: char });
      } else {
        return fail(row.line, `Unexpected character '${char}' in "${row.label}".`);
      }
    }
    rows.push({ label: row.label, start, end: start + row.timeline.length, note: row.note, events });
  }

  return { ok: true, value: { rows, frames: Math.max(...rows.map((row) => row.end)) } };
}
