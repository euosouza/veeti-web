import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from "@angular/common";
import { Component, computed, inject, input, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { mergeClasses as cn } from "../../utils/merge-class";
import { VBadgeComponent } from "../badge/badge.component";
import { VCheckboxComponent } from "../checkbox/v-checkbox.component";
import { VDropdownComponent, VDropdownContentComponent, VDropdownItemComponent, VDropdownTriggerDirective } from "../dropdown/v-dropdown.component";
import { VIconComponent } from "../icon/v-icon.component";
import { SkeletonComponent } from "../skeleton/skeleton.component";
import { tableCellVariants, tableHeaderVariants, tableVariants, TableVariants } from "./v-table.constants";
import { VTableColumn } from "./v-table.interface";

@Component({
  selector: "v-table",
  standalone: true,
  imports: [
    CommonModule,
    VCheckboxComponent,
    SkeletonComponent,
    VIconComponent,
    FormsModule,
    VBadgeComponent,
    VDropdownComponent,
    VDropdownContentComponent,
    VDropdownItemComponent,
    VDropdownTriggerDirective
  ],
  providers: [DatePipe, CurrencyPipe, DecimalPipe],
  template: `
    <div class="relative w-full overflow-auto rounded-md border border-border">
      <table [class]="tableClass()" class="whitespace-nowrap">
        <thead>
          <tr class="hover:bg-transparent text-xs uppercase text-foreground font-medium bg-neutral-100 dark:bg-neutral-700">
            @if (selectable()) {
              <th
                class="sticky left-0 z-20 w-[48px] min-w-[48px] max-w-[48px] border-b border-border p-0 text-center shadow-[1px_0_0_0_hsl(var(--border)),0_1px_0_0_hsl(var(--border))]"
              >
                <div class="flex items-center justify-center">
                  <v-checkbox [ngModel]="isAllSelected()" [disabled]="!data().length || loading()" (ngModelChange)="toggleAll()" />
                </div>
              </th>
            }
            @for (col of columns(); track col.key; let i = $index) {
              <th
                [class]="getHeaderClass(col)"
                [style.width]="col.width"
                [style.min-width]="col.width"
                [style.max-width]="col.width"
                [style.left]="getStickyLeft(i)"
                [style.right]="getStickyRight(i)"
              >
                {{ col.label }}
              </th>
            }
          </tr>
        </thead>
        <tbody class="text-foreground">
          @if (loading()) {
            @for (item of skeletonRows(); track $index) {
              <tr class="group hover:bg-transparent ">
                @if (selectable()) {
                  <td class="sticky left-0 z-10 w-[48px] min-w-[48px] max-w-[48px] border-b border-border bg-background p-4 text-center shadow-[1px_0_0_0_hsl(var(--border))]">
                    <div class="flex items-center justify-center">
                      <app-skeleton height="16px" width="16px" shape="square" />
                    </div>
                  </td>
                }
                @for (col of columns(); track col.key; let i = $index) {
                  <td
                    [class]="getCellClass(col)"
                    [style.left]="getStickyLeft(i)"
                    [style.right]="getStickyRight(i)"
                    [style.width]="col.width"
                    [style.min-width]="col.width"
                    [style.max-width]="col.width"
                  >
                    <app-skeleton height="20px" width="100%" />
                  </td>
                }
              </tr>
            }
          } @else {
            @for (row of data(); track $index) {
              <tr class="group  hover:bg-primary-100 data-[state=selected]:bg-primary-100">
                @if (selectable()) {
                  <td
                    class="sticky left-0 z-10 w-[48px] min-w-[48px] max-w-[48px] border-b border-border bg-background p-0 text-center shadow-[1px_0_0_0_hsl(var(--border))] group-hover:bg-primary-100"
                  >
                    <div class="flex items-center justify-center">
                      <v-checkbox [ngModel]="isRowSelected(row)" (ngModelChange)="toggleRow(row)" />
                    </div>
                  </td>
                }
                @for (col of columns(); track col.key; let i = $index) {
                  <td
                    [class]="getCellClass(col)"
                    [style.left]="getStickyLeft(i)"
                    [style.right]="getStickyRight(i)"
                    [style.width]="col.width"
                    [style.min-width]="col.width"
                    [style.max-width]="col.width"
                  >
                    @if (col.template) {
                      <ng-container *ngTemplateOutlet="col.template; context: { $implicit: row }"></ng-container>
                    } @else if (col.type === "badge") {
                      <v-badge
                        [variant]="getBadgeProp(row, col.badge?.variant, 'default')"
                        [size]="getBadgeProp(row, col.badge?.size, 'sm')"
                        [class]="getBadgeProp(row, col.badge?.class)"
                      >
                        {{ getCellValue(row, col) }}
                      </v-badge>
                    } @else if (col.type === "actions") {
                      <div class="flex items-center justify-center">
                        <v-dropdown>
                          <button
                            vDropdownTrigger
                            class="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors outline-none focus-visible:ring-1 focus-visible:ring-ring"
                          >
                            <v-icon name="more_vert" size="md"></v-icon>
                          </button>
                          <v-dropdown-content align="end">
                            @for (action of col.actions; track action.label) {
                              <v-dropdown-item
                                (click)="action.action?.(row)"
                                [disabled]="isActionDisabled(row, action.disabled)"
                                [class.text-red-500]="action.danger"
                                [class.hover:text-red-600]="action.danger"
                              >
                                <div class="flex items-center gap-2">
                                  @if (action.icon) {
                                    <v-icon [name]="action.icon" size="sm"></v-icon>
                                  }
                                  <span>{{ action.label }}</span>
                                </div>
                              </v-dropdown-item>
                            }
                          </v-dropdown-content>
                        </v-dropdown>
                      </div>
                    } @else {
                      <div class="text-muted-foreground text-wrap">
                        {{ getCellValue(row, col) }}
                      </div>
                    }
                  </td>
                }
              </tr>
            }
          }

          @if (!loading() && (!data() || data().length === 0)) {
            <tr>
              <td [attr.colspan]="columns().length + (selectable() ? 1 : 0)">
                <div class="flex flex-col items-center justify-center py-12 px-4 gap-3 text-muted-foreground">
                  <div class="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50">
                    <v-icon name="search_off" [size]="48" />
                  </div>
                  <p class="text-sm font-medium">{{ emptyText() }}</p>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }
    `
  ]
})
export class VTableComponent<T> {
  private datePipe = inject(DatePipe);
  private currencyPipe = inject(CurrencyPipe);
  private decimalPipe = inject(DecimalPipe);

  readonly data = input.required<T[]>();
  readonly columns = input.required<VTableColumn<T>[]>();
  readonly variant = input<TableVariants["variant"]>("default");
  readonly size = input<TableVariants["size"]>("md");
  readonly selectable = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly emptyText = input<string>("No data available");
  readonly skeletonCount = input<number>(5);

  // Default key to identify uniqueness, defaults to 'id' if not provided
  readonly rowKey = input<keyof T | string>("id");

  readonly selectionChange = output<T[]>();

  // Internal selection state
  protected selectedRows = signal<Set<string | number>>(new Set());

  protected tableClass = computed(() => cn(tableVariants({ variant: this.variant(), size: this.size() })));

  protected skeletonRows = computed(() => Array(this.skeletonCount()).fill(0));

  protected isAllSelected = computed(() => {
    const data = this.data();
    if (!data || data.length === 0) return false;
    return data.every((row) => this.isRowSelected(row));
  });

  protected isRowSelected(row: T): boolean {
    const key = this.getRowKey(row);
    return this.selectedRows().has(key);
  }

  protected getRowKey(row: T): string | number {
    const keyProp = this.rowKey();
    // @ts-expect-error dynamic access
    return row[keyProp] ?? JSON.stringify(row);
  }

  toggleAll() {
    const data = this.data();
    if (!data?.length) return;

    const allSelected = this.isAllSelected();
    const newSelection = new Set<string | number>();

    if (!allSelected) {
      data.forEach((row) => newSelection.add(this.getRowKey(row)));
    }
    // If all selected, newSelection remains empty (deselect all)

    this.selectedRows.set(newSelection);
    this.emitSelection(newSelection);
  }

  toggleRow(row: T) {
    const key = this.getRowKey(row);
    const currentSelection = new Set(this.selectedRows());

    if (currentSelection.has(key)) {
      currentSelection.delete(key);
    } else {
      currentSelection.add(key);
    }

    this.selectedRows.set(currentSelection);
    this.emitSelection(currentSelection);
  }

  private emitSelection(selectionSet: Set<string | number>) {
    const selectedItems = this.data().filter((row) => selectionSet.has(this.getRowKey(row)));
    this.selectionChange.emit(selectedItems);
  }

  protected getHeaderClass(col: VTableColumn<T>) {
    return cn(
      tableHeaderVariants({ size: this.size() }),
      col.align ? `text-${col.align}` : "text-left",
      col.fixed ? "sticky z-20 text-xs uppercase text-foreground font-medium bg-neutral-100 dark:bg-neutral-700" : "",
      col.fixed === "right" ? "shadow-[-1px_0_0_0_hsl(var(--border))]" : col.fixed ? "shadow-[1px_0_0_0_hsl(var(--border))]" : ""
    );
  }

  protected getCellClass(col: VTableColumn<T>) {
    return cn(
      tableCellVariants({ size: this.size(), fixed: !!col.fixed }),
      col.align ? `text-${col.align}` : "text-left",
      col.fixed === "right" ? "shadow-[-1px_0_0_0_hsl(var(--border))]" : col.fixed ? "shadow-[1px_0_0_0_hsl(var(--border))]" : ""
    );
  }

  protected getCellValue(row: T, col: VTableColumn<T>): unknown {
    if (col.render) {
      return col.render(row);
    }
    // @ts-expect-error accessing dynamic property
    const val = row[col.key];

    switch (col.type) {
      case "date":
        return this.datePipe.transform(val, "dd/MM/yyyy HH:mm");
      case "currency":
        return this.currencyPipe.transform(val, "BRL", "symbol", "1.2-2");
      case "number":
        return this.decimalPipe.transform(val);
      default:
        // For badge, we just return the value as is (or stringified in template)
        return val;
    }
  }

  protected getBadgeProp<P>(row: T, prop?: P | ((row: T) => P), defaultValue?: P): P | undefined {
    if (typeof prop === "function") {
      // @ts-expect-error rendering function check
      return prop(row);
    }
    return prop ?? defaultValue;
  }

  isActionDisabled(row: T, disabled?: boolean | ((row: T) => boolean)): boolean {
    if (typeof disabled === "function") {
      return disabled(row);
    }
    return disabled ?? false;
  }

  protected getStickyLeft(index: number): string | null {
    const cols = this.columns();
    const col = cols[index];
    // Only apply left sticky if fixed is true or 'left'
    if (!col.fixed || col.fixed === "right") return null;

    // Start with checkbox column width (48px) if selectable is enabled
    let left = this.selectable() ? 48 : 0;

    for (let i = 0; i < index; i++) {
      const prevCol = cols[i];
      if (prevCol.fixed === true || prevCol.fixed === "left") {
        const width = prevCol.width;
        if (width && width.endsWith("px")) {
          left += parseInt(width, 10);
        }
      }
    }
    return `${left}px`;
  }

  protected getStickyRight(index: number): string | null {
    const cols = this.columns();
    const col = cols[index];
    if (col.fixed !== "right") return null;

    let right = 0;

    // Iterate backwards from the end to the current index + 1
    for (let i = cols.length - 1; i > index; i--) {
      const nextCol = cols[i];
      if (nextCol.fixed === "right") {
        const width = nextCol.width;
        if (width && width.endsWith("px")) {
          right += parseInt(width, 10);
        }
      }
    }
    return `${right}px`;
  }
}
