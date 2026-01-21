import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaygroundComponent } from "@domain/design-system/components/playground/playground.component";
import { DOC_INPUTS_COLUMNS } from "@domain/design-system/constants/doc-table-columns.constants";
import { PlaygroundConfig } from "@domain/design-system/constants/playground.constants";
import { VAlertComponent } from "@libs/ui/components/alert/v-alert.component";
import { VCardComponent } from "@libs/ui/components/card/v-card.component";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { VTableComponent } from "@libs/ui/components/table/v-table.component";
import { VTableColumn } from "@libs/ui/components/table/v-table.interface";
import { VTabComponent, VTabContentComponent, VTabsComponent, VTabTitleComponent } from "@libs/ui/components/tabs/v-tabs.component";

@Component({
  selector: "app-alert-demo",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundComponent,
    VAlertComponent,
    VCardComponent,
    VInputDirective,
    VLabelComponent,
    VTabsComponent,
    VTabComponent,
    VTabTitleComponent,
    VTabContentComponent,
    VTableComponent
  ],
  templateUrl: "./alert-demo.page.html"
})
export class AlertDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Alerta",
    description: "Exibe um destaque para chamar a atenção do usuário.",
    documentation: {
      tableInputs: [
        {
          props: "variant",
          types: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
          default: "'default'",
          description: "A variante visual do alerta."
        },
        {
          props: "vTitle",
          types: "string | TemplateRef<void>",
          default: "undefined",
          description: "O título do alerta."
        },
        {
          props: "vDescription",
          types: "string | TemplateRef<void>",
          default: "undefined",
          description: "O conteúdo/descrição principal do alerta."
        },
        {
          props: "vIcon",
          types: "string | TemplateRef<void>",
          default: "undefined",
          description: "Ícone personalizado para exibição. Se não fornecido, um ícone padrão para a variante é mostrado."
        }
      ]
    }
  });

  columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;

  // Playground controls
  variant = signal<"default" | "destructive" | "success" | "warning" | "info">("default");
  title = signal("Atenção!");
  description = signal("Você pode adicionar componentes ao seu aplicativo usando a CLI.");

  readonly codeSnippet = computed(() => {
    const variant = this.variant();
    const title = this.title();
    const description = this.description();

    let snippet = `<v-alert`;

    if (variant !== "default") {
      snippet += ` variant="${variant}"`;
    }

    if (title) {
      snippet += ` vTitle="${title}"`;
    }

    if (description) {
      snippet += ` vDescription="${description}"`;
    }

    snippet += `>\n</v-alert>`;
    return snippet;
  });
}
