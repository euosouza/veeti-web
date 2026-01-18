import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, computed, input, signal } from "@angular/core";
import { mergeClasses } from "../../utils/merge-class";
import { avatarVariants, type AvatarVariants } from "./v-avatar.constants";

@Component({
  selector: "v-avatar",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClass()">
      @if (src() && !hasError()) {
        <img [src]="src()" [alt]="alt()" class="aspect-square h-full w-full object-cover" (error)="onError()" />
      } @else {
        <div class="flex h-full w-full items-center justify-center bg-muted text-muted-foreground font-medium">
          <ng-content></ng-content>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VAvatarComponent {
  readonly src = input<string | null>(null);
  readonly alt = input<string>("");
  readonly size = input<AvatarVariants["size"]>("md");
  readonly shape = input<AvatarVariants["shape"]>("circle");
  readonly class = input<string>("");

  readonly hasError = signal(false);

  readonly containerClass = computed(() => {
    return mergeClasses(
      avatarVariants({
        size: this.size(),
        shape: this.shape()
      }),
      this.class()
    );
  });

  onError() {
    this.hasError.set(true);
  }
}
