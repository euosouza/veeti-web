import { Component, computed, effect, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ButtonComponent } from "../../../../../libs/ui/components/button/button.component";
import { statesBtnVariant } from "../../../../../libs/ui/components/button/button.constants";
import { IStatesBtn, TVariantBtn } from "../../../../../libs/ui/components/button/button.interface";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-button-demo.page",
  imports: [ButtonComponent, PlaygroundComponent, FormsModule],
  templateUrl: "./button-demo.page.html"
})
export class ButtonDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Button",
    description: "Botões permitem que os usuários realizem ações com um único clique.",
    documentation: {
      tableInputs: [
        {
          props: "variant",
          types: "'primary' | 'secondary' | 'outline' | 'link' | 'destructive' | 'icon'",
          default: "'primary'",
          description: "O estilo visual do botão."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "O tamanho do botão."
        },
        {
          props: "disabled",
          types: "boolean",
          default: "false",
          description: "Indica se o botão está desativado."
        },
        {
          props: "loading",
          types: "boolean",
          default: "false",
          description: "Indica se o botão está em estado de carregamento."
        }
      ],
      tableOutputs: [{ props: "onClick", return: "void", description: "Emitido quando o botão é clicado." }]
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);

  label = signal<string>("Avançar");
  disabled = signal<boolean>(false);
  loading = signal<boolean>(false);
  size = signal<"sm" | "md" | "lg">("md");
  controlVariant = signal<TVariantBtn>("primary");
  currentTab = signal<Tab>(this.tabs()[0]);
  currentBtnVariant = signal<TVariantBtn>("primary");

  constructor() {
    effect(() => {
      if (this.controlVariant() === "icon") {
        this.label.set("edit");
      }
    });
  }

  readonly codeSnippet = computed(() => {
    const variant = this.controlVariant();
    const size = this.size();
    const disabled = this.disabled();
    const loading = this.loading();
    const label = this.label();

    const content = variant === "icon" ? `<span class="material-symbols-outlined">${label}</span>` : label;

    return `
      <app-button
        (onClick)="handleClick()"
        variant="${variant}"
        size="${size}"
        ${disabled ? `[disabled]="true"` : ""}
        ${loading ? `[loading]="true"` : ""}
      >
        ${content}
      </app-button>
  `;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  getClass(state: keyof IStatesBtn) {
    return statesBtnVariant[this.currentBtnVariant()][state];
  }

  getHoverClasses() {
    const hoverStateClasses = statesBtnVariant[this.currentBtnVariant()].hover;
    return hoverStateClasses.replace(/hover:/g, "");
  }

  getFocusedClasses() {
    const focusedStateClasses = statesBtnVariant[this.currentBtnVariant()].focused;
    return focusedStateClasses.replace(/focus-visible:/g, "");
  }

  onDisabledChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.disabled.set(checked);
    if (checked) {
      this.loading.set(false);
    }
  }

  onLoadingChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.loading.set(checked);
    if (checked) {
      this.disabled.set(false);
    }
  }

  onChangeVariant(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedVariant = selectElement.value as TVariantBtn;
    this.currentBtnVariant.set(selectedVariant);
  }
}
