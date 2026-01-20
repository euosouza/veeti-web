import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, computed, ContentChild, ContentChildren, input, QueryList, TemplateRef, ViewChild, ViewEncapsulation } from "@angular/core";
import { mergeClasses as cn } from "../../utils/merge-class";
import { tabsContentVariants, tabsListVariants, tabsTriggerVariants } from "./v-tabs.constants";

@Component({
  selector: "v-tab-title",
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-template #template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class VTabTitleComponent {
  @ViewChild("template", { static: true }) template!: TemplateRef<unknown>;
}

@Component({
  selector: "v-tab-content",
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None
})
export class VTabContentComponent {
  readonly class = input<string>("");
}

@Component({
  selector: "v-tab",
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (active) {
      <div [class]="computedClass()" role="tabpanel" tabindex="0">
        @if (contentComponent) {
          <ng-content select="v-tab-content"></ng-content>
        }
      </div>
    }
  `,
  encapsulation: ViewEncapsulation.None
})
export class VTabComponent {
  @ContentChild(VTabTitleComponent) titleComponent?: VTabTitleComponent;
  @ContentChild(VTabContentComponent) contentComponent?: VTabContentComponent;

  readonly disabled = input<boolean>(false);

  // Managed by parent VTabsComponent
  active = false;

  protected computedClass = computed(() => {
    return cn(tabsContentVariants(), this.contentComponent?.class() || "");
  });
}

@Component({
  selector: "v-tabs",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="listComputedClass()">
      @for (tab of tabs; track tab) {
        <button
          type="button"
          role="tab"
          [attr.data-state]="tab.active ? 'active' : 'inactive'"
          [class]="triggerComputedClass()"
          (click)="selectTab(tab)"
          [disabled]="tab.disabled()"
        >
          @if (tab.titleComponent) {
            <ng-container *ngTemplateOutlet="tab.titleComponent.template"></ng-container>
          }
        </button>
      }
    </div>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: "block"
  }
})
export class VTabsComponent implements AfterContentInit {
  @ContentChildren(VTabComponent) tabs!: QueryList<VTabComponent>;

  readonly width = input<"default" | "full">("default");
  readonly variant = input<"underline" | "pill">("underline");

  // Uncontrolled default value (index)
  readonly defaultValue = input<number>(0);

  protected listComputedClass = computed(() => {
    return cn(tabsListVariants({ width: this.width(), variant: this.variant() }), "mb-8");
  });

  protected triggerComputedClass() {
    return cn(tabsTriggerVariants({ width: this.width(), variant: this.variant() }));
  }

  ngAfterContentInit() {
    // Initial selection
    const index = this.defaultValue() || 0;
    const tabsArr = this.tabs.toArray();

    // Defer selection to next tick to correct ExpressionChangedAfterItHasBeenCheckedError if needed,
    // though content init usually safe for state updates that don't affect parent immediately.
    // However, since we are inside AfterContentInit, we can just set it.

    if (tabsArr[index]) {
      this.selectTab(tabsArr[index]);
    } else if (tabsArr.length > 0) {
      this.selectTab(tabsArr[0]);
    }
  }

  selectTab(selectedTab: VTabComponent) {
    if (selectedTab.disabled()) return;
    this.tabs.forEach((tab) => {
      tab.active = tab === selectedTab;
    });
  }
}
