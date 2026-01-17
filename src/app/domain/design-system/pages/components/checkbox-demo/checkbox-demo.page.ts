import { Component, computed, inject, signal } from "@angular/core";
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";
import { VCheckboxComponent } from "../../../../../libs/ui/components/checkbox/v-checkbox.component";
import { CheckboxVariants } from "../../../../../libs/ui/components/checkbox/v-checkbox.constants";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-checkbox-demo",
  standalone: true,
  imports: [VCheckboxComponent, PlaygroundComponent, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: "./checkbox-demo.page.html"
})
export class CheckboxDemoPage {
  private fb = inject(FormBuilder);

  // Tabs
  tabs = signal<Tab[]>([
    { name: "Visão Geral", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Controles do Playground
  readonly config = signal<PlaygroundConfig>({
    title: "Checkbox",
    description: "Um controle que permite ao usuário alternar entre marcado e não marcado.",
    documentation: {
      tableInputs: [
        {
          props: "checked",
          types: "boolean",
          default: "false",
          description: "O estado controlado de marcado do checkbox."
        },
        {
          props: "disabled",
          types: "boolean",
          default: "false",
          description: "Se o checkbox está desabilitado."
        },
        {
          props: "variant",
          types: "'default'",
          default: "'default'",
          description: "O estilo variante do checkbox."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "O tamanho do checkbox."
        },
        {
          props: "id",
          types: "string",
          default: "''",
          description: "O identificador único do checkbox."
        }
      ],
      tableOutputs: [
        {
          props: "checkedChange",
          return: "boolean",
          description: "Evento emitido quando o estado de marcado muda."
        }
      ]
    }
  });

  readonly variant = signal<CheckboxVariants["variant"]>("default");
  readonly size = signal<CheckboxVariants["size"]>("md");
  readonly disabled = signal(false);
  readonly checkboxId = signal("demo-checkbox");

  // Form Control para demonstração de Reactive Forms
  readonly loginForm = this.fb.group({
    terms: [false, Validators.requiredTrue]
  });

  // Form Control do Playground
  readonly control = new FormControl(false);

  readonly codeSnippet = computed(() => {
    return `<v-checkbox
  id="${this.checkboxId()}"
  variant="${this.variant()}"
  size="${this.size()}"
  [disabled]="${this.disabled()}"
  [formControl]="control"
>
  Aceitar termos e condições
</v-checkbox>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
