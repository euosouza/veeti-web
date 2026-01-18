import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, numberAttribute, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../button/button.component";
import { VIconComponent } from "../icon/v-icon.component";
import { VInputDirective } from "../input/v-input.directive";
import { paginationVariants } from "./pagination.constants";

export type PaginationVariant = "default" | "numeric" | "item-count" | "mobile" | "input-jump";

@Component({
  selector: "v-pagination",
  standalone: true,
  imports: [CommonModule, ButtonComponent, VIconComponent, VInputDirective, FormsModule],
  template: `
    <!-- Shared Page Size Selector Template -->
    <ng-template #pageSizeSelector>
      @if (pageSizeOptions().length > 0) {
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">Linhas por página:</span>
          <div class="relative">
            <select
              vInput
              [ngModel]="pageSize()"
              (ngModelChange)="onPageSizeChange($any($event))"
              [disabled]="disabled()"
              class="appearance-none bg-background-light dark:bg-background-dark border-none rounded-md py-1 pl-3 pr-8 text-sm font-bold text-foreground cursor-pointer focus:ring-1 focus:ring-primary h-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              @for (option of pageSizeOptions(); track option) {
                <option [value]="option">{{ option }}</option>
              }
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-foreground">
              <v-icon name="arrow_drop_down" size="sm" />
            </div>
          </div>
        </div>
      }
    </ng-template>

    <!-- Variant: With Item Count -->
    @if (variant() === "item-count") {
      <div class="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <ng-container *ngTemplateOutlet="pageSizeSelector" />

        <div class="flex items-center gap-1">
          <span class="text-sm text-muted-foreground mr-2">{{ startItem() }}-{{ endItem() }} de {{ total() }}</span>
          <app-button
            variant="ghost"
            class="flex size-8 items-center justify-center rounded-md hover:bg-background-light dark:hover:bg-background-dark text-muted-foreground disabled:opacity-30 p-0"
            [disabled]="disabled() || isFirstPage()"
            (onClick)="onPrevious()"
          >
            <v-icon name="chevron_left" size="md" />
          </app-button>
          <app-button
            variant="ghost"
            class="flex size-8 items-center justify-center rounded-md hover:bg-background-light dark:hover:bg-background-dark text-foreground p-0"
            [disabled]="disabled() || isLastPage()"
            (onClick)="onNext()"
          >
            <v-icon name="chevron_right" size="md" />
          </app-button>
        </div>
      </div>
    }

    <!-- Variant: Minimal / Mobile -->
    @else if (variant() === "mobile") {
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center justify-between w-full max-w-[200px] bg-background-light dark:bg-background-dark rounded-full p-1 pl-4 pr-1">
          <span class="text-sm font-medium text-foreground">Página {{ currentPage() }} / {{ totalPages() }}</span>
          <div class="flex gap-1">
            <app-button
              variant="ghost"
              class="flex size-8 items-center justify-center rounded-full bg-white dark:bg-surface-dark shadow-sm text-muted-foreground p-0"
              [disabled]="disabled() || isFirstPage()"
              (onClick)="onPrevious()"
            >
              <v-icon name="chevron_left" size="sm" />
            </app-button>
            <app-button
              variant="primary"
              class="flex size-8 items-center justify-center rounded-full bg-primary text-[#0a180f] shadow-sm p-0"
              [disabled]="disabled() || isLastPage()"
              (onClick)="onNext()"
            >
              <v-icon name="chevron_right" size="sm" />
            </app-button>
          </div>
        </div>
        <ng-container *ngTemplateOutlet="pageSizeSelector" />
      </div>
    }

    <!-- Variant: Input Jump -->
    @else if (variant() === "input-jump") {
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <ng-container *ngTemplateOutlet="pageSizeSelector" />
        <div class="flex items-center justify-center gap-3">
          <span class="text-sm text-muted-foreground">Ir para página</span>
          <input
            class="w-12 h-8 rounded-md border border-[#e5ece6] dark:border-[#2a4030] bg-background-light dark:bg-background-dark text-center text-sm font-bold text-foreground focus:ring-1 focus:ring-primary focus:border-primary p-0 disabled:opacity-50 disabled:cursor-not-allowed"
            type="number"
            [ngModel]="currentPage()"
            (ngModelChange)="onPageChange($any($event))"
            [min]="1"
            [max]="totalPages()"
            [disabled]="disabled()"
          />
          <span class="text-sm text-muted-foreground">de {{ totalPages() }}</span>
        </div>
      </div>
    }

    <!-- Variant: Numeric / Default -->
    @else {
      <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
        <ng-container *ngTemplateOutlet="pageSizeSelector" />
        <nav [class]="containerClasses()" aria-label="Pagination">
          <app-button
            variant="outline"
            class="flex size-8 items-center justify-center rounded-md hover:bg-background-light dark:hover:bg-background-dark text-foreground p-0"
            [disabled]="disabled() || isFirstPage()"
            (onClick)="onPrevious()"
          >
            <v-icon name="chevron_left" size="md" />
          </app-button>

          @for (page of visiblePages(); track $index) {
            @if (page === "...") {
              <span class="px-2 text-muted-foreground">...</span>
            } @else {
              <button
                class="flex size-8 items-center justify-center rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                [class.bg-primary]="page === currentPage() && !disabled()"
                [class.text-[#0a180f]]="page === currentPage() && !disabled()"
                [class.font-bold]="page === currentPage() && !disabled()"
                [class.hover:bg-background-light]="page !== currentPage() && !disabled()"
                [class.dark:hover:bg-background-dark]="page !== currentPage() && !disabled()"
                [class.text-foreground]="page !== currentPage() || disabled()"
                (click)="onPageChange(page)"
                [disabled]="disabled()"
              >
                {{ page }}
              </button>
            }
          }

          <app-button
            variant="outline"
            class="flex size-8 items-center justify-center rounded-md hover:bg-background-light dark:hover:bg-background-dark text-foreground p-0"
            [disabled]="disabled() || isLastPage()"
            (onClick)="onNext()"
          >
            <v-icon name="chevron_right" size="md" />
          </app-button>
        </nav>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VPaginationComponent {
  readonly total = input.required({ transform: numberAttribute });
  readonly pageSize = input(5, { transform: numberAttribute });
  readonly currentPage = input.required({ transform: numberAttribute });
  readonly pageSizeOptions = input<number[]>([5, 10, 20, 50, 100]);
  readonly disabled = input<boolean>(false);
  readonly variant = input<PaginationVariant>("default");

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  protected containerClasses = computed(() => paginationVariants());

  protected totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));
  protected startItem = computed(() => (this.currentPage() - 1) * this.pageSize() + 1);
  protected endItem = computed(() => Math.min(this.currentPage() * this.pageSize(), this.total()));

  protected isFirstPage = computed(() => this.currentPage() <= 1);
  protected isLastPage = computed(() => this.currentPage() >= this.totalPages());

  protected visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // End Pattern (e.g. 1 ... 8 9 10)
    if (current >= total - 2) {
      return [1, "...", total - 2, total - 1, total];
    }

    // Shift Pattern (e.g. [2] 3 4 ... 10)
    const start = Math.max(1, current - 2);
    return [start, start + 1, start + 2, "...", total];
  });

  onFirstPage() {
    if (!this.isFirstPage()) {
      this.pageChange.emit(1);
    }
  }

  onLastPage() {
    if (!this.isLastPage()) {
      this.pageChange.emit(this.totalPages());
    }
  }

  onPrevious() {
    if (!this.isFirstPage()) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNext() {
    if (!this.isLastPage()) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onPageChange(page: number | string) {
    if (typeof page === "number" && page !== this.currentPage()) {
      this.pageChange.emit(page);
    }
  }

  onPageSizeChange(size: number | string) {
    const newSize = Number(size);
    this.pageSizeChange.emit(newSize);
  }
}
