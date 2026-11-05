import { Component, input } from '@angular/core';
import { CopyButton } from '../../shared/copy-button';

const LANG_NAMES: Record<string, string> = {
  ts: 'TypeScript',
  typescript: 'TypeScript',
  js: 'JavaScript',
  html: 'HTML',
  bash: 'Shell',
  sh: 'Shell',
  json: 'JSON',
  css: 'CSS',
  text: 'Text',
};

@Component({
  selector: 'app-code-block',
  imports: [CopyButton],
  template: `
    <div class="frame">
      <div class="head">
        <span class="lang">{{ langName() }}</span>
        <app-copy-button [text]="text()" label="Copy code" />
      </div>
      <pre tabindex="0"><code [innerHTML]="html()"></code></pre>
    </div>
  `,
  styles: `
    :host {
      display: block;
      margin: 0 0 var(--space-5);
      max-width: var(--measure-wide);
    }
    .frame {
      border-radius: var(--figure-radius, var(--radius-m));
      background: var(--code-ground);
      border: 1px solid var(--code-frame);
      border-inline-width: var(--figure-edge, 1px);
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-1) var(--space-2) var(--space-1) var(--space-4);
      border-bottom: 1px solid var(--code-frame);
    }
    .lang {
      font: 500 0.8125rem / 1 var(--font-ui);
      letter-spacing: 0;
      color: var(--ink-3);
    }
    pre {
      margin: 0;
      padding: var(--space-3) var(--space-4) var(--space-4);
      overflow-x: auto;
      /* Sized from the prose, not the interface, so code sits one notch under the text around it. */
      font-size: calc(var(--step-text) * 0.875);
      line-height: 1.6;
      tab-size: 2;
    }
    pre code {
      font-size: inherit;
    }
  `,
})
export class CodeBlock {
  readonly lang = input('');
  readonly html = input.required<string>();
  readonly text = input.required<string>();

  protected langName(): string {
    return LANG_NAMES[this.lang()] ?? (this.lang() || 'Code');
  }
}
