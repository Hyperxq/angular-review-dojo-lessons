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
      max-width: var(--measure);
    }
    .frame {
      border-radius: var(--radius-m);
      background: var(--paper-sunk);
      border: 1px solid var(--rule);
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-1) var(--space-2) 0 var(--space-4);
    }
    .lang {
      font: 600 0.75rem / 1 var(--font-ui);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--ink-3);
    }
    pre {
      margin: 0;
      padding: var(--space-2) var(--space-4) var(--space-4);
      overflow-x: auto;
      font-size: 0.875rem;
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
