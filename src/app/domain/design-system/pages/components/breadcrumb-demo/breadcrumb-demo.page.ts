import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { PlaygroundComponent } from "@domain/design-system/components/playground/playground.component";
import { PlaygroundConfig } from "@domain/design-system/constants/playground.constants";
import { VBreadcrumbComponent, VBreadcrumbConfig } from "@libs/ui/components/breadcrumb/v-breadcrumb.component";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-breadcrumb-demo",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, PlaygroundComponent, VBreadcrumbComponent, VCardComponent, VLabelComponent, VInputDirective],
  templateUrl: "./breadcrumb-demo.page.html"
})
export class BreadcrumbDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Breadcrumb",
    description: "Mostra o caminho da página atual dentro de uma hierarquia.",
    documentation: {
      tableInputs: [
        {
          props: "config",
          types: "VBreadcrumbConfig",
          default: "-",
          description: "Objeto de configuração contendo items e separador."
        },
        {
          props: "align",
          types: "'start' | 'center' | 'end' | 'between'",
          default: "'start'",
          description: "Alinhamento horizontal dos itens."
        },
        {
          props: "wrap",
          types: "'wrap' | 'nowrap'",
          default: "'wrap'",
          description: "Define se os itens devem quebrar de linha."
        }
      ]
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Playground state
  separator = signal<"arrow" | "slash">("arrow");

  // Config for playground
  breadcrumbConfig = computed<VBreadcrumbConfig>(() => ({
    separator: this.separator(),
    items: [{ label: "Home", path: "/", icon: "home" }, { label: "Components" }, { label: "Breadcrumb", path: "/design-system/componentes/breadcrumb" }]
  }));

  readonly codeSnippet = computed(() => {
    return `<v-breadcrumb
  [config]="{
    separator: '${this.separator()}',
    items: [
      { label: 'Home', path: '/', icon: 'home' },
      { label: 'Components' },
      { label: 'Breadcrumb', path: '/components/breadcrumb' }
    ]
  }"
></v-breadcrumb>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((ts) => ts.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
