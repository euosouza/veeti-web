import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaygroundComponent } from "@domain/design-system/components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "@domain/design-system/constants/doc-table-columns.constants";
import { PlaygroundConfig } from "@domain/design-system/constants/playground.constants";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { VLoadingComponent } from "@libs/ui/components/loading/v-loading.component";
import { VTableComponent } from "@libs/ui/components/table/v-table.component";
import { VTableColumn } from "@libs/ui/components/table/v-table.interface";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-loading-demo",
  standalone: true,
  imports: [CommonModule, FormsModule, PlaygroundComponent, VLoadingComponent, VTableComponent, VLabelComponent, VCardComponent],
  templateUrl: "./loading-demo.page.html"
})
export class LoadingDemoPage {
  readonly columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  readonly columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  readonly config = signal<PlaygroundConfig>({
    title: "Loading",
    description: "Componente para indicar estados de carregamento ou processamento.",
    documentation: {
      tableInputs: [
        {
          props: "variant",
          types: "'spinner' | 'dots' | 'pulse' | 'bars' | 'ring'",
          default: "'spinner'",
          description: "O estilo visual do carregador."
        },
        {
          props: "size",
          types: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
          default: "'md'",
          description: "O tamanho do carregador."
        },
        {
          props: "color",
          types: "'primary' | 'secondary' | 'muted'",
          default: "'primary'",
          description: "A cor do carregador."
        },
        {
          props: "class",
          types: "string",
          default: "''",
          description: "Classes CSS adicionais."
        }
      ],
      tableOutputs: []
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Playground controls
  variant = signal<"spinner" | "dots" | "pulse" | "bars" | "ring">("spinner");
  size = signal<"xs" | "sm" | "md" | "lg" | "xl">("md");
  color = signal<"primary" | "secondary" | "muted">("primary");

  readonly codeSnippet = computed(() => {
    const variantAttr = this.variant() !== "spinner" ? ` variant="${this.variant()}"` : "";
    const sizeAttr = this.size() !== "md" ? ` size="${this.size()}"` : "";
    const colorAttr = this.color() !== "primary" ? ` color="${this.color()}"` : "";

    return `<v-loading${variantAttr}${sizeAttr}${colorAttr} />`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((ts) => ts.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
