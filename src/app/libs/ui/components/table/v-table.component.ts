import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from "@angular/common";
import { Component, computed, inject, input, output, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { mergeClasses as cn } from "../../utils/merge-class";
import { VCheckboxComponent } from "../checkbox/v-checkbox.component";
import { tableCellVariants, tableHeaderVariants, tableVariants, TableVariants } from "./v-table.constants";
import { VTableColumn } from "./v-table.interface";

@Component({
  selector: "v-table",
  standalone: true,
  imports: [CommonModule, VCheckboxComponent, FormsModule],
  providers: [DatePipe, CurrencyPipe, DecimalPipe],
  template: `
    <div class="relative w-full overflow-auto rounded-md border border-border">
      <table [class]="tableClass()" class="whitespace-nowrap">
        <thead>
          <tr class="hover:bg-transparent">
            @if (selectable()) {
              <th
                class="sticky left-0 z-20 w-[48px] min-w-[48px] max-w-[48px] border-b border-border bg-background p-0 text-center shadow-[1px_0_0_0_hsl(var(--border)),0_1px_0_0_hsl(var(--border))]"
              >
                <div class="flex items-center justify-center">
                  <v-checkbox [ngModel]="isAllSelected()" [disabled]="!data().length" (ngModelChange)="toggleAll()" />
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
        <tbody>
          @for (row of data(); track $index) {
            <tr class="group hover:bg-primary-100 data-[state=selected]:bg-primary-100">
              @if (selectable()) {
                <td
                  class="sticky left-0 z-10 w-[48px] min-w-[48px] max-w-[48px] border-border  border-b bg-background p-0 text-center shadow-[1px_0_0_0_hsl(var(--border))] group-hover:bg-primary-100"
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
                  } @else {
                    {{ getCellValue(row, col) }}
                  }
                </td>
              }
            </tr>
          }
          @if (!data() || data().length === 0) {
            <tr>
              <td [attr.colspan]="columns().length + (selectable() ? 1 : 0)">
                <div class="flex items-center justify-center p-8 text-muted-foreground">No data available</div>
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
  // Default key to identify uniqueness, defaults to 'id' if not provided
  readonly rowKey = input<keyof T | string>("id");

  readonly selectionChange = output<T[]>();

  // Internal selection state
  protected selectedRows = signal<Set<string | number>>(new Set());

  protected tableClass = computed(() => cn(tableVariants({ variant: this.variant(), size: this.size() })));

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
      col.fixed ? "sticky z-20 bg-background" : "",
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
        return val;
    }
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
