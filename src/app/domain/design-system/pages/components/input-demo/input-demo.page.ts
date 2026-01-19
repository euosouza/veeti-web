import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";
import { VCheckboxComponent } from "../../../../../libs/ui/components/checkbox/v-checkbox.component";
import { VInputGroupComponent } from "../../../../../libs/ui/components/input/v-input-group.component";
import { VInputVariants } from "../../../../../libs/ui/components/input/v-input.constants";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { VFormDebuggerComponent } from "../../../components/form-debugger/v-form-debugger.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "../../../constants/doc-table-columns.constants";

@Component({
  selector: "app-input-demo",
  standalone: true,
  imports: [
    CommonModule,
    VInputDirective,
    VInputGroupComponent,
    VCheckboxComponent,
    VLabelComponent,
    PlaygroundComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    VFormDebuggerComponent,
    VTableComponent
  ],
  templateUrl: "./input-demo.page.html"
})
export class InputDemoPage {
  columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  private fb = inject(FormBuilder);

  // Tabs
  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Playground Controls
  readonly config = signal<PlaygroundConfig>({
    title: "Input",
    description: "Exibe um campo de entrada de formulário ou um componente que se parece com um campo de entrada.",
    documentation: {
      tableInputs: [
        {
          props: "vInput",
          types: "directive",
          default: "-",
          description: "Aplica o estilo de input ao elemento. Suporta input, textarea e select."
        },
        {
          props: "variant",
          types: "'default' | 'error' | 'success'",
          default: "'default'",
          description: "A variante visual do input."
        },
        {
          props: "size",
          types: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: "O tamanho do input."
        }
      ],
      tableOutputs: []
    },
    groupConfig: {
      title: "Input Group",
      description: "Um componente wrapper para adicionar ícones ou complementos ao campo de input.",
      tableInputs: [
        {
          props: "startIcon",
          types: "string",
          default: "-",
          description: "Nome do ícone para exibir no início do input."
        },
        {
          props: "endIcon",
          types: "string",
          default: "-",
          description: "Nome do ícone para exibir no final do input."
        }
      ]
    }
  });

  readonly groupConfig = computed(() => this.config().groupConfig!);

  readonly variant = signal<VInputVariants["variant"]>("default");
  readonly size = signal<VInputVariants["size"]>("default");
  readonly disabled = signal(false);
  readonly customClass = signal("");

  // Form Control for Reactive Forms demo
  readonly loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  readonly codeSnippet = computed(() => {
    return `<input
  vInput
  type="text"
  placeholder="Type something..."
  variant="${this.variant()}"
  size="${this.size()}"
  [disabled]="${this.disabled()}"
/>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  getFocusedClasses() {
    return "ring-2 ring-ring ring-offset-2";
  }
}
