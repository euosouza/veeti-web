import { Component, computed, signal, WritableSignal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VBadgeComponent } from "../../../../../libs/ui/components/badge/badge.component";
import { BadgeVariant } from "../../../../../libs/ui/components/badge/badge.interface";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

interface BadgeItem {
  variant: BadgeVariant;
  label: string;
  description: string;
}

@Component({
  selector: "app-badge-demo",
  standalone: true,
  imports: [VBadgeComponent, VLabelComponent, PlaygroundComponent, FormsModule],
  templateUrl: "./badge-demo.page.html"
})
export class BadgeDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Badge",
    description: "O componente Badge é usado para destacar informações curtas e importantes, como status, contagens ou categorias.",
    documentation: {
      tableInputs: [
        {
          props: "variant",
          types: `'default' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'outline' | 'notification'`,
          default: `'default'`,
          description: "Define a cor de fundo e do texto do badge."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg'",
          default: "'sm'",
          description: "Define o tamanho do badge."
        },
        {
          props: "removable",
          types: "boolean",
          default: "false",
          description: "Torna o badge removível e exibe um ícone para interação."
        },
        {
          props: "class",
          types: "string",
          default: `''`,
          description: "Classes CSS customizadas para serem aplicadas ao badge."
        }
      ],
      tableOutputs: [
        {
          props: "remove",
          return: "void",
          description: "Evento emitido quando o ícone de remoção do badge é clicado."
        },
        {
          props: "badgeClick",
          return: "void",
          description: "Evento emitido quando o badge é clicado."
        }
      ]
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);

  variant = signal<BadgeVariant>("default");
  content = signal<string>("Badge");
  currentTab = signal<Tab>(this.tabs()[0]);
  clickableBadgeMessage = signal<string>("");

  readonly semanticBadges: BadgeItem[] = [
    {
      variant: "success",
      label: "Success",
      description: `Indica um resultado positivo, como "Concluído" ou "Ativo".`
    },
    {
      variant: "danger",
      label: "Danger",
      description: `Alerta sobre ações destrutivas ou status críticos, como "Erro" ou "Pendente".`
    },
    {
      variant: "warning",
      label: "Warning",
      description: "Chama a atenção para informações que exigem cautela."
    },
    {
      variant: "info",
      label: "Info",
      description: "Exibe informações neutras ou de orientação."
    }
  ];

  readonly tagBadges: BadgeItem[] = [
    {
      variant: "default",
      label: "Default",
      description: "Para informações gerais e de destaque padrão."
    },
    {
      variant: "outline",
      label: "Outline",
      description: "Uma versão sutil, útil para tags ou categorias com menor peso visual."
    },
    {
      variant: "dark",
      label: "Dark",
      description: "Para ser usado em fundos claros, quando um contraste maior for necessário"
    }
  ];

  tags: WritableSignal<string[]> = signal(["Rock", "Pop", "Jazz", "Samba"]);

  readonly codeSnippet = computed(() => {
    const variant = this.variant();
    const content = this.content();

    return `
      <v-badge variant="${variant}">
        ${content}
      </v-badge>
    `;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  onBadgeClick() {
    this.clickableBadgeMessage.set("Badge clicado!");
    setTimeout(() => this.clickableBadgeMessage.set(""), 2000);
  }

  removeTag(tagToRemove: string) {
    this.tags.update((tags) => tags.filter((tag) => tag !== tagToRemove));
  }
}
