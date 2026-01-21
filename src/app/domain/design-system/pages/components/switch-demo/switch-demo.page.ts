import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VCardComponent } from "../../../../../libs/ui/components/card";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { VSwitchComponent } from "../../../../../libs/ui/components/switch";
import { VTableComponent } from "../../../../../libs/ui/components/table";
import { VTabComponent, VTabContentComponent, VTabsComponent, VTabTitleComponent } from "../../../../../libs/ui/components/tabs";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "../../../constants/doc-table-columns.constants";
import { PlaygroundConfig } from "../../../constants/playground.constants";

@Component({
  selector: "app-switch-demo",
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundComponent,
    VSwitchComponent,
    VTabsComponent,
    VTabComponent,
    VTabTitleComponent,
    VTabContentComponent,
    VTableComponent,
    VCardComponent,
    VLabelComponent,
    VInputDirective
  ],
  templateUrl: "./switch-demo.page.html"
})
export class SwitchDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Switch",
    description: "Um controle que permite ao usuário alternar entre o estado marcado e não marcado.",
    documentation: {
      tableInputs: [
        { props: "label", types: "string", default: "undefined", description: "Texto opcional exibido ao lado do switch." },
        { props: "disabled", types: "boolean", default: "false", description: "Se verdadeiro, impede a interação com o switch." },
        { props: "variant", types: "'default'", default: "'default'", description: "Variante de estilo do switch." },
        { props: "size", types: "'sm' | 'md' | 'lg'", default: "'md'", description: "Tamanho do switch." },
        { props: "class", types: "string", default: "''", description: "Classes CSS adicionais." }
      ],
      tableOutputs: [
        { props: "onChange", return: "boolean", description: "Emitido quando o valor muda (via ControlValueAccessor)." },
        { props: "onTouched", return: "void", description: "Emitido quando o componente é tocado (via ControlValueAccessor)." }
      ]
    }
  });

  // Controls
  label = signal("Airplane Mode");
  disabled = signal(false);
  checked = signal(false);
  size = signal<"sm" | "md" | "lg">("md");

  readonly codeSnippet = computed(() => {
    const labelAttr = this.label() ? `\n  label="${this.label()}"` : "";
    const disabledAttr = this.disabled() ? `\n  [disabled]="true"` : "";
    const sizeAttr = this.size() !== "md" ? `\n  size="${this.size()}"` : "";

    return `<v-switch${labelAttr}${disabledAttr}${sizeAttr}
  [(ngModel)]="checked"
></v-switch>`;
  });

  readonly columnsDocInputs = DOC_INPUTS_COLUMNS;
  readonly columnsDocOutputs = DOC_OUTPUTS_COLUMNS;
}
