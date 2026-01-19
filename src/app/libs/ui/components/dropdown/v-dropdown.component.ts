import { CommonModule } from "@angular/common";
import { Component, computed, Directive, ElementRef, HostListener, inject, input, signal } from "@angular/core";
import { mergeClasses as cn } from "../../utils/merge-class";

@Component({
  selector: "v-dropdown",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content select="[vDropdownTrigger]"></ng-content>

    @if (isOpen()) {
      <div class="fixed inset-0 z-[70] bg-transparent" (click)="close()" (keydown)="close()" tabindex="-1"></div>
      <div
        class="fixed z-[80] min-w-[8rem] overflow-hidden rounded-md border border-border bg-card-background p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
        [class]="contentClass()"
        [style]="positionStyles()"
      >
        <div class="flex flex-col">
          <ng-content select="v-dropdown-content"></ng-content>
        </div>
      </div>
    }
  `,
  host: {
    class: "inline-block text-left"
  }
})
export class VDropdownComponent {
  readonly align = input<"start" | "end">("end");

  protected isOpen = signal(false);
  protected triggerRect = signal<DOMRect | null>(null);

  toggle() {
    this.updatePosition();
    this.isOpen.update((v) => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  private triggerEl: HTMLElement | null = null;

  registerTrigger(el: HTMLElement) {
    this.triggerEl = el;
  }

  private updatePosition() {
    if (this.triggerEl) {
      this.triggerRect.set(this.triggerEl.getBoundingClientRect());
    }
  }

  protected contentClass = computed(() => {
    return cn("mt-2");
  });

  protected positionStyles = computed(() => {
    const rect = this.triggerRect();
    if (!rect) return {};

    const styles: Record<string, string> = {
      position: "fixed"
    };

    // Vertical positioning (Flip logic)
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 200; // Estimated max height
    if (spaceBelow < dropdownHeight) {
      // Show above
      styles["bottom"] = `${window.innerHeight - rect.top + 4}px`;
    } else {
      // Show below
      styles["top"] = `${rect.bottom + 4}px`;
    }

    // Horizontal positioning
    if (this.align() === "end") {
      styles["right"] = `${window.innerWidth - rect.right}px`;
    } else {
      styles["left"] = `${rect.left}px`;
    }

    return styles;
  });
}

@Directive({
  selector: "[vDropdownTrigger]",
  standalone: true
})
export class VDropdownTriggerDirective {
  private dropdown = inject(VDropdownComponent);
  private elementRef = inject(ElementRef);

  constructor() {
    this.dropdown.registerTrigger(this.elementRef.nativeElement);
  }

  @HostListener("click", ["$event"])
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.dropdown.toggle();
  }
}

@Component({
  selector: "v-dropdown-content",
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    class: "contents"
  }
})
export class VDropdownContentComponent {}

@Component({
  selector: "v-dropdown-item",
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  host: {
    class: "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
    "[class.pointer-events-none]": "disabled()",
    "[class.opacity-50]": "disabled()",
    "(click)": "handleClick()"
  }
})
export class VDropdownItemComponent {
  readonly disabled = input<boolean>(false);
  private dropdown = inject(VDropdownComponent);

  handleClick() {
    if (this.disabled()) return;
    this.dropdown.close();
  }
}
