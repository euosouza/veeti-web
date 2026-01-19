import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VIconComponent } from "../../../../../libs/ui/components/icon/v-icon.component";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "../../../constants/doc-table-columns.constants";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-icon-demo",
  standalone: true,
  imports: [VIconComponent, VLabelComponent, PlaygroundComponent, FormsModule, VTableComponent],
  templateUrl: "./icon-demo.page.html"
})
export class IconDemoPage {
  columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  readonly config = signal<PlaygroundConfig>({
    title: "Icon",
    description: "Ícones fornecem dicas visuais e melhoram a legibilidade da interface.",
    documentation: {
      tableInputs: [
        {
          props: "name",
          types: "string",
          default: "-",
          description: "Nome do ícone Material Symbols."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg' | number",
          default: "'md'",
          description: "Tamanho do ícone."
        }
      ]
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);

  currentTab = signal<Tab>(this.tabs()[0]);

  // Controls
  name = signal<string>("home");
  size = signal<"sm" | "md" | "lg" | number>("md");
  customSize = signal<number | undefined>(undefined);

  readonly codeSnippet = computed(() => {
    const name = this.name();
    const size = this.customSize() ? this.customSize() : this.size();

    let attrs = `name="${name}"`;
    if (size !== "md") {
      attrs += typeof size === "number" ? ` [size]="${size}"` : ` size="${size}"`;
    }

    return `<v-icon ${attrs}></v-icon>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  onSizeChange(val: string) {
    if (val === "custom") {
      this.customSize.set(32);
      this.size.set(32); // just for consistent type
    } else {
      this.customSize.set(undefined);
      this.size.set(val as "sm" | "md" | "lg");
    }
  }
}
