import { Component, computed, inject, signal } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";
import { vInputVariants, VInputVariants } from "../../../../../libs/ui/components/input/v-input.constants";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-input-demo",
  standalone: true,
  imports: [PlaygroundComponent, VInputDirective, ButtonComponent, FormsModule, ReactiveFormsModule],
  templateUrl: "./input-demo.page.html"
})
export class InputDemoPage {
  private fb = inject(FormBuilder);

  // Tabs
  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // Playground Controls
  variant = signal<VInputVariants["variant"]>("default");
  size = signal<VInputVariants["size"]>("default");
  customClass = signal("");
  disabled = signal(false);

  // Reactive Forms Demo (Login Example)
  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]]
  });

  readonly config = signal<PlaygroundConfig>({
    title: "Input",
    description: "Campos de entrada de texto permitem que os usuários insiram e editem texto em interfaces.",
    documentation: {
      tableInputs: [
        {
          props: "variant",
          types: "'default' | 'error' | 'success'",
          default: "'default'",
          description: "Define o estado visual do input."
        },
        {
          props: "size",
          types: "'sm' | 'default' | 'lg'",
          default: "'default'",
          description: "Controla o tamanho do input."
        },
        {
          props: "class",
          types: "string",
          default: "''",
          description: "Classes CSS adicionais para customização."
        },
        {
          props: "disabled",
          types: "boolean",
          default: "false",
          description: "Desabilita a interação com o input."
        }
      ],
      tableOutputs: [
        {
          props: "onChange",
          return: "any",
          description: "Emitido quando o valor do input muda (via ControlValueAccessor)."
        },
        {
          props: "onTouched",
          return: "void",
          description: "Emitido quando o input perde o foco (via ControlValueAccessor)."
        }
      ]
    }
  });

  readonly codeSnippet = computed(() => {
    return `<input
  vInput
  type="text"
  placeholder="Digite algo..."
  variant="${this.variant()}"
  size="${this.size()}"
  [disabled]="${this.disabled()}"
/>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  // Helper to simulate focused state styles
  getFocusedClasses(variant: VInputVariants["variant"] = "default") {
    // Get the base classes for the variant
    const variantClasses = vInputVariants({ variant });
    // Remove focus-visible: prefix to simulate active focus state
    return variantClasses.replace(/focus-visible:/g, "");
  }
}
