import { ChangeDetectionStrategy, Component, computed, EventEmitter, input, Output } from "@angular/core";
import { twMerge } from "tailwind-merge";
import { VIconComponent } from "../icon/v-icon.component";
import { BadgeSize, BadgeVariant, badgeVariants } from "./badge.constants";

@Component({
  selector: "v-badge",
  standalone: true,
  imports: [VIconComponent],
  template: `
    <span [class]="badgeClass()" [attr.tabindex]="isClickable() ? 0 : -1" (click)="onBadgeClick($event)" (keydown.enter)="onBadgeClick($event)">
      <ng-content />
      @if (removable()) {
        <button type="button" aria-label="Remove" (click)="removeBadge($event)" class="cursor-pointer">
          <v-icon name="close" [size]="12"></v-icon>
        </button>
      }
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VBadgeComponent {
  readonly class = input<string>();
  readonly variant = input<BadgeVariant>("default");
  readonly size = input<BadgeSize>("sm");
  readonly removable = input<boolean>(false);

  @Output() remove = new EventEmitter<void>();
  @Output() badgeClick = new EventEmitter<void>();

  isClickable = computed(() => this.badgeClick.observed);

  protected badgeClass = computed(() => twMerge(badgeVariants({ variant: this.variant(), size: this.size() }), this.isClickable() ? "cursor-pointer" : "", this.class()));

  onBadgeClick(event: Event) {
    if (!this.isClickable()) return;

    if (event.target instanceof Element && event.target.closest("button")) {
      return;
    }

    this.badgeClick.emit();
  }

  removeBadge(event: Event) {
    event.stopPropagation();
    this.remove.emit();
  }
}
