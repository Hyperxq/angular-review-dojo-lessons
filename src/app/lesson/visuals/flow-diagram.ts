import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  afterRenderEffect,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { rankFlow, type FlowGraph } from '../parse/flow';

interface DrawnEdge {
  readonly d: string;
  readonly label: string | null;
  readonly x: number;
  readonly y: number;
}

const LABEL_AT = 0.72;

const cubic = (p0: number, p1: number, p2: number, p3: number, t: number) =>
  (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3;

@Component({
  selector: 'app-flow-diagram',
  template: `
    <figure class="flow">
      <div class="canvas" #canvas>
        <svg class="edges" [attr.width]="size().width" [attr.height]="size().height" aria-hidden="true">
          <defs>
            <marker [id]="arrowId" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" />
            </marker>
          </defs>
          @for (edge of edges(); track $index) {
            <path [attr.d]="edge.d" [attr.marker-end]="'url(#' + arrowId + ')'" />
          }
        </svg>
        @for (rank of ranks(); track $index) {
          <div class="rank">
            @for (node of rank; track node) {
              <span class="node" [attr.data-node]="node">{{ node }}</span>
            }
          </div>
        }
        @for (edge of edges(); track $index) {
          @if (edge.label) {
            <span class="edge-label" [style.left.px]="edge.x" [style.top.px]="edge.y" aria-hidden="true">{{ edge.label }}</span>
          }
        }
      </div>
      <figcaption class="visually-hidden">
        Flow diagram.
        @for (edge of graph().edges; track $index) {
          {{ edge.from }} leads to {{ edge.to }}{{ edge.label ? ': ' + edge.label : '' }}.
        }
      </figcaption>
    </figure>
  `,
  styleUrl: './flow-diagram.css',
})
export class FlowDiagram {
  readonly graph = input.required<FlowGraph>();

  protected readonly arrowId = `arrow-${Math.random().toString(36).slice(2, 8)}`;
  protected readonly ranks = computed(() => rankFlow(this.graph()));
  protected readonly edges = signal<DrawnEdge[]>([]);
  protected readonly size = signal({ width: 0, height: 0 });
  private readonly canvas = viewChild.required<ElementRef<HTMLElement>>('canvas');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterRenderEffect({
      read: () => {
        this.ranks();
        this.measure();
      },
    });
    afterNextRender(() => {
      const observer = new ResizeObserver(() => this.measure());
      observer.observe(this.canvas().nativeElement);
      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private measure(): void {
    const canvas = this.canvas().nativeElement;
    const box = canvas.getBoundingClientRect();
    const rects = new Map<string, DOMRect>();
    canvas.querySelectorAll<HTMLElement>('[data-node]').forEach((el) => {
      rects.set(el.dataset['node']!, el.getBoundingClientRect());
    });
    const rankOf = new Map(this.ranks().flatMap((rank, i) => rank.map((node) => [node, i] as const)));
    const right = Math.max(...[...rects.values()].map((r) => r.right - box.left));

    const edges = this.graph().edges.flatMap((edge): DrawnEdge[] => {
      const a = rects.get(edge.from);
      const b = rects.get(edge.to);
      if (!a || !b) return [];
      const ax = a.left + a.width / 2 - box.left;
      const bx = b.left + b.width / 2 - box.left;

      if (rankOf.get(edge.to)! > rankOf.get(edge.from)!) {
        const y1 = a.bottom - box.top;
        const y2 = b.top - box.top - 2;
        const bend = (y2 - y1) / 2;
        // Labels sit past the middle, towards the target, so edges fanning out of one node keep theirs apart.
        const x = cubic(ax, ax, bx, bx, LABEL_AT);
        const y = cubic(y1, y1 + bend, y2 - bend, y2, LABEL_AT);
        return [{ d: `M${ax},${y1} C${ax},${y1 + bend} ${bx},${y2 - bend} ${bx},${y2}`, label: edge.label, x, y }];
      }
      // Back edge (a loop): leave from the right side and come round outside the nodes.
      const x1 = a.right - box.left;
      const x2 = b.right - box.left + 2;
      const y1 = a.top + a.height / 2 - box.top;
      const y2 = b.top + b.height / 2 - box.top;
      const out = right + 28;
      return [{ d: `M${x1},${y1} C${out},${y1} ${out},${y2} ${x2},${y2}`, label: edge.label, x: out - 6, y: (y1 + y2) / 2 }];
    });

    this.edges.set(edges);
    this.size.set({ width: canvas.scrollWidth, height: canvas.scrollHeight });
  }
}
