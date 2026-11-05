import { NgTemplateOutlet } from '@angular/common';
import { Component, input } from '@angular/core';
import type { TreeNode } from '../parse/tree';

@Component({
  selector: 'app-tree-view',
  imports: [NgTemplateOutlet],
  template: `
    <figure class="tree">
      <ng-container [ngTemplateOutlet]="branch" [ngTemplateOutletContext]="{ $implicit: nodes() }" />
    </figure>

    <ng-template #branch let-nodes>
      <ul>
        @for (node of nodes; track $index) {
          <li>
            <span class="node">
              <span class="label">{{ node.label }}</span>
              @for (badge of node.badges; track $index) {
                <span class="badge">{{ badge }}</span>
              }
            </span>
            @if (node.children.length) {
              <ng-container [ngTemplateOutlet]="branch" [ngTemplateOutletContext]="{ $implicit: node.children }" />
            }
          </li>
        }
      </ul>
    </ng-template>
  `,
  styles: `
    :host {
      display: block;
      margin: var(--space-5) 0 var(--space-6);
      max-width: var(--measure);
    }
    .tree {
      margin: 0;
      padding: var(--space-4) var(--space-5);
      border: 1px solid var(--rule);
      border-radius: var(--radius-m);
      background: var(--paper-raised);
      overflow-x: auto;
    }
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul ul {
      margin-left: 0.55rem;
    }
    li {
      position: relative;
      padding: 0.15rem 0;
    }
    /* Each child draws its own elbow, so the trunk stops at the last child. */
    ul ul > li {
      padding-left: var(--space-5);
    }
    ul ul > li::before,
    ul ul > li::after {
      content: '';
      position: absolute;
      left: 0;
      border-color: var(--rule-strong);
      border-style: solid;
      border-width: 0;
    }
    ul ul > li::before {
      top: 0;
      bottom: 0;
      border-left-width: 1px;
    }
    ul ul > li:last-child::before {
      bottom: auto;
      height: 0.9rem;
    }
    ul ul > li::after {
      top: 0.9rem;
      width: 0.85rem;
      border-top-width: 1px;
    }
    .node {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-2);
      min-height: 1.5rem;
    }
    .label {
      font: 500 0.875rem / 1.3 var(--font-code);
    }
    .badge {
      padding: 0.1rem 0.45rem;
      border-radius: 999px;
      background: var(--accent-soft);
      color: var(--accent);
      font: 600 0.6875rem / 1.4 var(--font-ui);
      letter-spacing: 0.02em;
    }
  `,
})
export class TreeView {
  readonly nodes = input.required<readonly TreeNode[]>();
}
