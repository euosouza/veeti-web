import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VDividerComponent } from "../../../../../libs/ui/components/divider/v-divider.component";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-divider-demo",
  standalone: true,
  imports: [VDividerComponent, PlaygroundComponent, FormsModule],
  templateUrl: "./divider-demo.page.html"
})
export class DividerDemoPage {
  // Tabs
  tabs = signal<Tab[]>([
    { name: "Visão Geral", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  readonly config = signal<PlaygroundConfig>({
    title: "Divider",
    description: "Um componente separador que pode ser usado em listas e layouts para agrupar conteúdo.",
    documentation: {
      tableInputs: [
        {
          props: "direction",
          types: "'horizontal' | 'vertical'",
          default: "'horizontal'",
          description: "A direção do divisor."
        },
        {
          props: "class",
          types: "string",
          default: "''",
          description: "Classes adicionais para customização."
        }
      ]
    }
  });

  direction = signal<"horizontal" | "vertical">("horizontal");

  readonly codeSnippet = computed(() => {
    return `
<v-divider
  direction="${this.direction()}"
></v-divider>
`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
