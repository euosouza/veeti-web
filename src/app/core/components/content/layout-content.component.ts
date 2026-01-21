import { Component } from "@angular/core";

@Component({
  selector: "app-layout-content",
  template: `
    <main class="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
      <ng-content></ng-content>
    </main>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `
  ]
})
export class LayoutContentComponent {}
