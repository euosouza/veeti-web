import { Component, input, signal } from "@angular/core";

@Component({
  selector: "app-playground",
  imports: [],
  templateUrl: "./playground.component.html"
})
export class PlaygroundComponent {
  activeTab = signal<"preview" | "code">("preview");
  readonly codeSnippet = input.required<string>();
  setActiveTab(tab: "preview" | "code") {
    this.activeTab.set(tab);
  }
}
