import { CommonModule } from "@angular/common";
import { Component, computed, OnInit, signal, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaygroundComponent } from "@domain/design-system/components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "@domain/design-system/constants/doc-table-columns.constants";
import { PlaygroundConfig } from "@domain/design-system/constants/playground.constants";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { VRadioButtonComponent } from "@libs/ui/components/radio-group/v-radio-button.component";
import { VRadioGroupComponent } from "@libs/ui/components/radio-group/v-radio-group.component";
import { VTableComponent } from "@libs/ui/components/table/v-table.component";
import { VTableColumn } from "@libs/ui/components/table/v-table.interface";
import { VTabComponent, VTabContentComponent, VTabsComponent, VTabTitleComponent } from "@libs/ui/components/tabs/v-tabs.component";

interface StateRow {
  state: string;
  label: string;
  description: string;
}

@Component({
  selector: "app-tabs-demo",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundComponent,
    VTabsComponent,
    VTabComponent,
    VTabTitleComponent,
    VTabContentComponent,
    VLabelComponent,
    VTableComponent,
    VRadioGroupComponent,
    VRadioButtonComponent
  ],
  templateUrl: "./tabs-demo.page.html"
})
export class TabsDemoPage implements OnInit {
  readonly columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  readonly columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  readonly config = signal<PlaygroundConfig>({
    title: "Tabs",
    description: "Alterne entre a exibição de diferentes seções de conteúdo no mesmo espaço.",
    documentation: {
      tableInputs: [
        {
          props: "defaultValue",
          types: "number",
          default: "0",
          description: "O índice da aba ativa padrão."
        },
        {
          props: "variant",
          types: "'underline' | 'pill'",
          default: "'underline'",
          description: "Controla o estilo visual das abas."
        },
        {
          props: "disabled",
          types: "boolean",
          default: "false",
          description: "Desabilita a interação com a aba (v-tab)."
        },
        {
          props: "width",
          types: "'default' | 'full'",
          default: "'default'",
          description: "Controla a largura da lista de abas (em v-tabs)."
        }
      ]
    }
  });

  // Playground state
  width = signal<"default" | "full">("default");
  variant = signal<"underline" | "pill">("underline");

  @ViewChild("underlineTpl", { static: true }) underlineTpl!: TemplateRef<unknown>;
  @ViewChild("pillTpl", { static: true }) pillTpl!: TemplateRef<unknown>;

  columnsStates: VTableColumn<StateRow>[] = [];

  readonly statesData: StateRow[] = [
    { state: "default", label: "Default", description: "Estado padrão do componente sem interação." },
    { state: "active", label: "Active", description: "Indica a aba atualmente selecionada." },
    { state: "hover", label: "Hover", description: "Feedback visual ao passar o mouse sobre a aba." },
    { state: "disabled", label: "Disabled", description: "Estado desabilitado, sem interação." }
  ];

  readonly codeSnippet = computed(() => {
    const width = this.width();
    const variant = this.variant();
    const widthAttr = width !== "default" ? ` width="${width}"` : "";
    const variantAttr = variant !== "underline" ? ` variant="${variant}"` : "";

    return `<v-tabs${variantAttr}${widthAttr}>
  <v-tab>
    <v-tab-title>Conta</v-tab-title>
    <v-tab-content>
       Faça alterações em sua conta aqui.
    </v-tab-content>
  </v-tab>
  <v-tab>
    <v-tab-title>Senha</v-tab-title>
    <v-tab-content>
       Altere sua senha aqui.
    </v-tab-content>
  </v-tab>
</v-tabs>`;
  });

  ngOnInit() {
    this.columnsStates = [
      { key: "label", label: "Estado", width: "100px" },
      { key: "description", label: "Descrição", width: "250px" },
      { key: "underline", label: "Exemplo Underline", template: this.underlineTpl },
      { key: "pill", label: "Exemplo Pill", template: this.pillTpl }
    ];
  }
}
