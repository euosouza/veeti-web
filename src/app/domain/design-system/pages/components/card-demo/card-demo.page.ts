import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VBadgeComponent } from "../../../../../libs/ui/components/badge/badge.component";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";
import { VCardComponent } from "../../../../../libs/ui/components/card/v-card.component";
import { VCheckboxComponent } from "../../../../../libs/ui/components/checkbox/v-checkbox.component";
import { VIconComponent } from "../../../../../libs/ui/components/icon/v-icon.component";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "../../../constants/doc-table-columns.constants";
import { PlaygroundConfig } from "../../../constants/playground.constants";

@Component({
  selector: "app-card-demo",
  standalone: true,
  imports: [
    FormsModule,
    PlaygroundComponent,
    VCardComponent,
    ButtonComponent,
    VInputDirective,
    VLabelComponent,
    VBadgeComponent,
    VIconComponent,
    VCheckboxComponent,
    VTableComponent
  ],
  templateUrl: "./card-demo.page.html"
})
export class CardDemoPage {
  columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  readonly config = signal<PlaygroundConfig>({
    title: "Card",
    description: "Container versátil para agrupar conteúdo relacionado com cabeçalho, corpo e rodapé.",
    documentation: {
      tableInputs: [
        {
          props: "vTitle",
          types: "string | TemplateRef",
          default: "undefined",
          description: "Título do card."
        },
        {
          props: "vDescription",
          types: "string | TemplateRef",
          default: "undefined",
          description: "Descrição auxiliar."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "Tamanho do card (padding e espaçamento)."
        },
        {
          props: "vHeaderBorder",
          types: "boolean",
          default: "false",
          description: "Adiciona borda inferior ao cabeçalho."
        },
        {
          props: "vFooterBorder",
          types: "boolean",
          default: "false",
          description: "Adiciona borda superior ao rodapé."
        }
      ]
    }
  });

  // Tabs configuration
  readonly tabs = signal([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);

  readonly currentTab = computed(() => this.tabs().find((t) => t.active)!);

  onClickTab(tab: { name: string; active: boolean }) {
    this.tabs.update((tabs) =>
      tabs.map((t) => ({
        ...t,
        active: t.name === tab.name
      }))
    );
  }

  // Playground controls
  vTitle = signal("Notificações");
  vDescription = signal("Gerencie suas preferências de notificação.");
  vHeaderBorder = signal(false);
  vFooterBorder = signal(false);
  size = signal<"sm" | "md" | "lg">("md");

  readonly codeSnippet = computed(() => {
    return `
<v-card
  vTitle="${this.vTitle()}"
  vDescription="${this.vDescription()}"
  size="${this.size()}"
  [vHeaderBorder]="${this.vHeaderBorder()}"
  [vFooterBorder]="${this.vFooterBorder()}"
>
  <div class="space-y-4">
      <div class="flex items-center space-x-4 border p-4 rounded-md">
        <div class="flex-1 space-y-1">
          <p class="text-sm font-medium leading-none">
            Push Notifications
          </p>
          <p class="text-sm text-muted-foreground">
            Send notifications to device.
          </p>
        </div>
      </div>
  </div>
  <div v-card-footer class="justify-between">
    <v-button variant="outline">Cancelar</v-button>
    <v-button>Salvar</v-button>
  </div>
</v-card>
    `;
  });
}
