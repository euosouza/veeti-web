import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VCheckboxComponent } from "../../../../../libs/ui/components/checkbox";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { VLabelVariants } from "../../../../../libs/ui/components/label/v-label.constants";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-label-demo",
  standalone: true,
  imports: [CommonModule, FormsModule, VLabelComponent, VCheckboxComponent, VInputDirective, PlaygroundComponent],
  templateUrl: "./label-demo.page.html"
})
export class LabelDemoPage {
  // Tabs
  tabs = signal<Tab[]>([
    { name: "Visão Geral", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Controles do Playground
  readonly config = signal<PlaygroundConfig>({
    title: "Label",
    description: "Um rótulo acessível associado a controles de formulário.",
    documentation: {
      tableInputs: [
        {
          props: "htmlFor",
          types: "string",
          default: "undefined",
          description: "O id do elemento com o qual o rótulo está associado."
        },
        {
          props: "variant",
          types: "'default' | 'error'",
          default: "'default'",
          description: "O estilo variante do rótulo."
        },
        {
          props: "class",
          types: "string",
          default: "''",
          description: "Classes CSS adicionais."
        }
      ]
    }
  });

  readonly htmlFor = signal("email");
  readonly variant = signal<VLabelVariants["variant"]>("default");
  readonly labelText = signal("Endereço de Email");

  readonly codeSnippet = computed(() => {
    return `<v-label
  htmlFor="${this.htmlFor()}"
  variant="${this.variant()}"
>
  ${this.labelText()}
</v-label>
<input type="email" id="${this.htmlFor()}" vInput />`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
