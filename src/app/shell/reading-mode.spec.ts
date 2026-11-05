import { TestBed } from '@angular/core/testing';
import { ReadingMode, readingCommand } from './reading-mode';

const key = (init: KeyboardEventInit, target: Element = document.body) => {
  const event = new KeyboardEvent('keydown', { ...init, bubbles: true });
  Object.defineProperty(event, 'target', { value: target });
  return event;
};

describe('ReadingMode', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('starts off and persists a toggle for the next visit', () => {
    const mode = TestBed.inject(ReadingMode);
    expect(mode.on()).toBe(false);

    mode.toggle();
    expect(mode.on()).toBe(true);
    expect(localStorage.getItem('review-dojo-lessons:reading')).toBe('on');

    TestBed.resetTestingModule();
    expect(TestBed.inject(ReadingMode).on()).toBe(true);
  });

  it('hides the chrome only while a chapter page offers the mode', () => {
    const mode = TestBed.inject(ReadingMode);
    mode.set(true);
    expect(mode.hidesChrome()).toBe(false);

    mode.available.set(true);
    expect(mode.hidesChrome()).toBe(true);
  });

  it('keeps working when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const mode = TestBed.inject(ReadingMode);

    expect(mode.on()).toBe(false);
    mode.toggle();
    expect(mode.on()).toBe(true);
  });
});

describe('readingCommand', () => {
  it('toggles on R and exits on Escape only while reading', () => {
    expect(readingCommand(key({ key: 'r' }), false)).toBe('toggle');
    expect(readingCommand(key({ key: 'R', shiftKey: true }), true)).toBe('toggle');
    expect(readingCommand(key({ key: 'Escape' }), true)).toBe('exit');
    expect(readingCommand(key({ key: 'Escape' }), false)).toBeNull();
  });

  it('ignores R with a modifier, so browser shortcuts like reload keep working', () => {
    expect(readingCommand(key({ key: 'r', metaKey: true }), false)).toBeNull();
    expect(readingCommand(key({ key: 'r', ctrlKey: true }), false)).toBeNull();
  });

  it('ignores every key while the reader types', () => {
    const input = document.createElement('input');
    const textarea = document.createElement('textarea');
    const editable = document.createElement('div');
    editable.setAttribute('contenteditable', 'true');

    for (const target of [input, textarea, editable]) {
      expect(readingCommand(key({ key: 'r' }, target), true)).toBeNull();
      expect(readingCommand(key({ key: 'Escape' }, target), true)).toBeNull();
      expect(readingCommand(key({ key: 'ArrowRight' }, target), true)).toBeNull();
    }
  });

  it('turns the arrow keys into previous and next only while reading', () => {
    expect(readingCommand(key({ key: 'ArrowLeft' }), true)).toBe('previous');
    expect(readingCommand(key({ key: 'ArrowRight' }), true)).toBe('next');
    expect(readingCommand(key({ key: 'ArrowRight' }), false)).toBeNull();
  });

  it('leaves the arrow keys to the marble player when focus is inside it', () => {
    const player = document.createElement('app-marbles-player');
    const button = document.createElement('button');
    player.append(button);

    expect(readingCommand(key({ key: 'ArrowRight' }, button), true)).toBeNull();
    expect(readingCommand(key({ key: 'r' }, button), false)).toBe('toggle');
  });
});
