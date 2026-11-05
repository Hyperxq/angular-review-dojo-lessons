import { TestBed } from '@angular/core/testing';
import { parseMarbles } from '../parse/marbles';
import { MarblesPlayer } from './marbles-player';

const SOURCE = ['id$:   1---2|', 'first: -a-x      // cancelled', 'out:   ----#'].join('\n');

function setup() {
  const result = parseMarbles(SOURCE);
  if (!result.ok) throw new Error(result.error);
  const fixture = TestBed.createComponent(MarblesPlayer);
  fixture.componentRef.setInput('diagram', result.value);
  fixture.componentRef.setInput('source', SOURCE);
  fixture.detectChanges();
  const el: HTMLElement = fixture.nativeElement;
  const visible = () => el.querySelectorAll('.lane .mark.is-on').length;
  const button = (name: string) =>
    [...el.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') ?? b.textContent!.trim()) === name)!;
  const click = (name: string) => {
    button(name).click();
    fixture.detectChanges();
  };
  return { fixture, el, visible, button, click, player: fixture.componentInstance };
}

describe('MarblesPlayer', () => {
  let frames: FrameRequestCallback[];

  beforeEach(() => {
    frames = [];
    vi.stubGlobal('requestAnimationFrame', (cb: FrameRequestCallback) => frames.push(cb));
    vi.stubGlobal('cancelAnimationFrame', () => {});
    vi.spyOn(performance, 'now').mockReturnValue(0);
  });
  afterEach(() => vi.unstubAllGlobals());

  // Angular's zoneless scheduler also queues frames, so run whatever is pending.
  const runFrames = (now: number) => frames.splice(0).forEach((cb) => cb(now));

  it('shows the whole diagram before it is played', () => {
    const { visible, el } = setup();

    expect(visible()).toBe(6);
    expect(el.querySelector('.clock')!.textContent!.replace(/\s/g, '')).toBe('6/6');
    expect(el.querySelector('.note')!.textContent).toContain('cancelled');
  });

  it('steps frame by frame from the start and announces what happened', () => {
    const { click, visible, el, player, fixture } = setup();
    player.seek(0);
    fixture.detectChanges();
    expect(visible()).toBe(0);

    click('Forward one frame');
    expect(visible()).toBe(1);
    expect(el.querySelector('[aria-live]')!.textContent).toContain('Frame 0: id$ emits 1');

    click('Forward one frame');
    expect(visible()).toBe(2);
    click('Back one frame');
    expect(visible()).toBe(1);
  });

  it('disables stepping past either end', () => {
    const { button, player, fixture } = setup();

    expect(button('Forward one frame').disabled).toBe(true);
    player.seek(0);
    fixture.detectChanges();
    expect(button('Back one frame').disabled).toBe(true);
  });

  it('replays from the start and advances with animation frames until the end', () => {
    const { click, visible, player, fixture } = setup();

    click('Replay');
    expect(player.playing()).toBe(true);
    expect(player.time()).toBe(0);

    runFrames(500); // 0.5 s at 4 frames per second
    fixture.detectChanges();
    expect(player.time()).toBe(2);
    expect(visible()).toBe(2);

    runFrames(5000);
    fixture.detectChanges();
    expect(player.time()).toBe(6);
    expect(player.playing()).toBe(false);
    expect(visible()).toBe(6);
  });

  it('pauses where it is', () => {
    const { click, player, fixture } = setup();
    click('Replay');
    runFrames(250);
    fixture.detectChanges();

    click('Pause');
    expect(player.playing()).toBe(false);
    expect(player.time()).toBe(1);
  });

  it('scrubs with the range input', () => {
    const { el, fixture, visible } = setup();
    const range = el.querySelector<HTMLInputElement>('input[type=range]')!;
    range.value = '4';
    range.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(visible()).toBe(3);
  });

  it('marks completion, error and cancellation with their own classes', () => {
    const { el } = setup();

    expect(el.querySelectorAll('.lane .mark--complete')).toHaveLength(1);
    expect(el.querySelectorAll('.lane .mark--error')).toHaveLength(1);
    expect(el.querySelectorAll('.lane .mark--cancel')).toHaveLength(1);
  });
});
