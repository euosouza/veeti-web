import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VAvatarComponent } from "../../../../../libs/ui/components/avatar/v-avatar.component";
import { AvatarVariants } from "../../../../../libs/ui/components/avatar/v-avatar.constants";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-avatar-demo",
  standalone: true,
  imports: [CommonModule, VAvatarComponent, PlaygroundComponent, FormsModule, VLabelComponent],
  templateUrl: "./avatar-demo.page.html"
})
export class AvatarDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Avatar",
    description: "Um elemento visual utilizado para representar um usuário ou entidade.",
    documentation: {
      tableInputs: [
        {
          props: "src",
          types: "string | null",
          default: "null",
          description: "URL da imagem do avatar."
        },
        {
          props: "alt",
          types: "string",
          default: "",
          description: "Texto alternativo para acessibilidade."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg' | 'xl'",
          default: "'md'",
          description: "Tamanho do avatar."
        },
        {
          props: "shape",
          types: "'circle' | 'square'",
          default: "'circle'",
          description: "Formato do avatar."
        },
        {
          props: "class",
          types: "string",
          default: "",
          description: "Classes CSS adicionais."
        }
      ],
      tableOutputs: []
    }
  });

  // Tabs
  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  readonly src = signal<string>("https://github.com/shadcn.png");
  readonly alt = signal<string>("@shadcn");
  readonly fallback = signal<string>("CN");
  readonly size = signal<AvatarVariants["size"]>("md");
  readonly shape = signal<AvatarVariants["shape"]>("circle");

  readonly codeSnippet = computed(() => {
    return `
<v-avatar
  src="${this.src()}"
  alt="${this.alt()}"
  size="${this.size()}"
  shape="${this.shape()}"
>
  ${this.fallback()}
</v-avatar>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
