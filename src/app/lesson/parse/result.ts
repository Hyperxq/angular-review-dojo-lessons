export type ParseResult<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string; readonly line: number };

export const fail = (line: number, error: string): ParseResult<never> => ({ ok: false, line, error });
