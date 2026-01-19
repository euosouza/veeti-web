import { CommonModule } from "@angular/common";
import { Component, computed, inject, signal } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";
import { VCardComponent } from "../../../../../libs/ui/components/card/v-card.component";
import { VCheckboxComponent } from "../../../../../libs/ui/components/checkbox/v-checkbox.component";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { VRadioButtonComponent, VRadioGroupComponent, type RadioButtonVariants } from "../../../../../libs/ui/components/radio-group";
import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { VFormDebuggerComponent } from "../../../components/form-debugger/v-form-debugger.component";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "../../../constants/doc-table-columns.constants";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-radio-group-demo",
  standalone: true,
  imports: [
    CommonModule,
    VRadioGroupComponent,
    VRadioButtonComponent,
    VLabelComponent,
    VCardComponent,
    PlaygroundComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    VFormDebuggerComponent,
    VTableComponent,
    VCheckboxComponent
  ],
  templateUrl: "./radio-group-demo.page.html"
})
export class RadioGroupDemoPage {
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
    title: "Radio Group",
    description: "Um conjunto de botões de rádio onde apenas um pode ser selecionado por vez.",
    documentation: {
      tableInputs: [
        {
          props: "size",
          types: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "O tamanho dos botões de rádio."
        },
        {
          props: "disabled",
          types: "boolean",
          default: "false",
          description: "Se o grupo de rádio está desativado."
        }
      ],
      tableOutputs: []
    }
  });

  readonly size = signal<RadioButtonVariants["size"]>("md");
  readonly disabled = signal(false);
  readonly customClass = signal("");

  // Form Control for Reactive Forms demo
  readonly planForm = this.fb.group({
    plan: ["", [Validators.required]]
  });

  readonly codeSnippet = computed(() => {
    return `<v-radio-group
  size="${this.size()}"
  [disabled]="${this.disabled()}"
>
  <v-radio-button value="apple">Apple</v-radio-button>
  <v-radio-button value="banana">Banana</v-radio-button>
  <v-radio-button value="orange">Orange</v-radio-button>
</v-radio-group>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  getFocusedClasses() {
    return "ring-2 ring-ring ring-offset-2";
  }
}
