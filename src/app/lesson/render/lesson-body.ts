import { Component, computed, input } from '@angular/core';
import { BlockFallback } from '../visuals/block-fallback';
import { CodeBlock } from '../visuals/code-block';
import { FlowDiagram } from '../visuals/flow-diagram';
import { MarblesPlayer } from '../visuals/marbles-player';
import { TreeView } from '../visuals/tree-view';
import { toSegments } from './segments';

@Component({
  selector: 'app-lesson-body',
  imports: [BlockFallback, CodeBlock, FlowDiagram, MarblesPlayer, TreeView],
  template: `
    @for (segment of segments(); track $index) {
      @switch (segment.kind) {
        @case ('html') {
          <div class="prose" [innerHTML]="segment.html"></div>
        }
        @case ('code') {
          <app-code-block [lang]="segment.lang" [html]="segment.html" [text]="segment.text" />
        }
        @default {
          @if (segment.result.ok) {
            @switch (segment.kind) {
              @case ('marbles') {
                <app-marbles-player [diagram]="$any(segment.result).value" [source]="segment.source" />
              }
              @case ('flow') {
                <app-flow-diagram [graph]="$any(segment.result).value" />
              }
              @case ('tree') {
                <app-tree-view [nodes]="$any(segment.result).value" />
              }
            }
          } @else {
            <app-block-fallback
              [kind]="segment.kind"
              [source]="segment.source"
              [error]="segment.result.error"
              [line]="segment.result.line"
            />
          }
        }
      }
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .prose:first-child > :first-child {
      margin-top: 0;
    }
  `,
})
export class LessonBody {
  readonly markdown = input.required<string>();
  protected readonly segments = computed(() => toSegments(this.markdown()));
}
