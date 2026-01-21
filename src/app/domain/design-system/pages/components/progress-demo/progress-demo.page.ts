import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaygroundComponent } from "@domain/design-system/components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "@domain/design-system/constants/doc-table-columns.constants";
import { PlaygroundConfig } from "@domain/design-system/constants/playground.constants";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { VProgressComponent } from "@libs/ui/components/progress/v-progress.component";

import { VTableComponent } from "@libs/ui/components/table/v-table.component";
import { VTableColumn } from "@libs/ui/components/table/v-table.interface";
import { VTabComponent, VTabContentComponent, VTabsComponent, VTabTitleComponent } from "@libs/ui/components/tabs";

@Component({
  selector: "app-progress-demo",
  standalone: true,
  imports: [
    VProgressComponent,
    VCardComponent,
    ButtonComponent,
    VInputDirective,
    VLabelComponent,
    VTabsComponent,
    VTabComponent,
    VTabTitleComponent,
    VTabContentComponent,
    VTableComponent,
    PlaygroundComponent,
    FormsModule
  ],
  templateUrl: "./progress-demo.page.html"
})
export class ProgressDemoPage {
  columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  readonly config = signal<PlaygroundConfig>({
    title: "Progress",
    description: "Exibe um indicador mostrando o progresso de conclusão de uma tarefa, tipicamente exibido como uma barra de progresso.",
    documentation: {
      tableInputs: [
        {
          props: "value",
          types: "number",
          default: "0",
          description: "O valor atual da barra de progresso."
        },
        {
          props: "max",
          types: "number",
          default: "100",
          description: "O valor máximo da barra de progresso."
        },
        {
          props: "variant",
          types: `'default' | 'success' | 'destructive' | 'warning' | 'info'`,
          default: `'default'`,
          description: "A variante de cor da barra de progresso."
        },
        {
          props: "color",
          types: "string",
          default: "undefined",
          description: "A cor personalizada da barra de progresso (hex, rgb, etc). Funciona apenas quando variant='custom'."
        },
        {
          props: "size",
          types: `'sm' | 'md' | 'lg' | 'xl'`,
          default: `'md'`,
          description: "O tamanho (altura) da barra de progresso."
        },
        {
          props: "class",
          types: "string",
          default: "''",
          description: "Classes CSS adicionais para o container."
        }
      ],
      tableOutputs: []
    }
  });

  value = signal<number>(50);
  variant = signal<"default" | "success" | "destructive" | "warning" | "info" | "custom">("default");
  size = signal<"sm" | "md" | "lg" | "xl">("md");
  customColor = signal<string>("#6366f1");

  readonly codeSnippet = computed(() => {
    const value = this.value();
    const variant = this.variant();
    const size = this.size();
    const color = this.customColor();

    let code = `<v-progress [value]="${value}"`;
    if (variant && variant !== "default") code += ` variant="${variant}"`;
    if (size && size !== "md") code += ` size="${size}"`;
    if (variant === "custom" && color) code += ` color="${color}"`;
    code += `></v-progress>`;

    return code;
  });

  // Example method to simulate progress
  simulateProgress() {
    this.value.set(0);
    const interval = setInterval(() => {
      this.value.update((v) => {
        if (v >= 100) {
          clearInterval(interval);
          return 100;
        }
        return v + 10;
      });
    }, 500);
  }
}
