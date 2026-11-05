import { TestBed } from '@angular/core/testing';
import { Progress } from './progress';

describe('Progress', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.restoreAllMocks());

  it('persists a done mark and reads it back in a fresh instance', () => {
    TestBed.inject(Progress).toggle('rxjs/chapter-1');

    expect(JSON.parse(localStorage.getItem('review-dojo-lessons:progress')!)).toEqual({ 'rxjs/chapter-1': true });
    TestBed.resetTestingModule();
    expect(TestBed.inject(Progress).has('rxjs/chapter-1')).toBe(true);
  });

  it('removes the mark on a second toggle', () => {
    const progress = TestBed.inject(Progress);
    progress.toggle('rxjs/chapter-1');
    progress.toggle('rxjs/chapter-1');

    expect(progress.has('rxjs/chapter-1')).toBe(false);
    expect(localStorage.getItem('review-dojo-lessons:progress')).toBe('{}');
  });

  it('counts the marked keys among the ones asked for', () => {
    const progress = TestBed.inject(Progress);
    progress.toggle('a');
    progress.toggle('c');

    expect(progress.count(['a', 'b', 'c'])).toBe(2);
  });

  it('keeps working in memory when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const progress = TestBed.inject(Progress);

    expect(() => progress.toggle('rxjs/chapter-2')).not.toThrow();
    expect(progress.has('rxjs/chapter-2')).toBe(true);
  });

  it('ignores corrupted stored data', () => {
    localStorage.setItem('review-dojo-lessons:progress', '{not json');

    expect(TestBed.inject(Progress).has('anything')).toBe(false);
  });
});
