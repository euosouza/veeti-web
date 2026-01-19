import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VariantProps } from "class-variance-authority";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { SkeletonComponent } from "../../../../../libs/ui/components/skeleton/skeleton.component";
import { skeletonVariants } from "../../../../../libs/ui/components/skeleton/skeleton.constants";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { DOC_INPUTS_COLUMNS, DOC_OUTPUTS_COLUMNS } from "../../../constants/doc-table-columns.constants";

interface Tab {
  name: string;
  active: boolean;
}

@Component({
  selector: "app-skeleton-demo",
  standalone: true,
  imports: [SkeletonComponent, VLabelComponent, PlaygroundComponent, FormsModule, VTableComponent],
  templateUrl: "./skeleton-demo.page.html"
})
export class SkeletonDemoPage {
  columnsDocInputs: VTableColumn<unknown>[] = DOC_INPUTS_COLUMNS;
  columnsDocOutputs: VTableColumn<unknown>[] = DOC_OUTPUTS_COLUMNS;

  readonly config = signal<PlaygroundConfig>({
    title: "Skeleton",
    description: "Use skeleton screens to indicate that content is loading, improving the user experience.",
    documentation: {
      tableInputs: [
        {
          props: "height",
          types: "string",
          default: "'1rem'",
          description: "The height of the skeleton. Can be any CSS unit."
        },
        {
          props: "width",
          types: "string",
          default: "'100%'",
          description: "The width of the skeleton. Can be any CSS unit."
        },
        {
          props: "shape",
          types: "'square' | 'circle'",
          default: "'square'",
          description: "The shape of the skeleton."
        }
      ]
    }
  });

  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);

  height = signal<string>("5rem");
  width = signal<string>("5rem");
  shape = signal<VariantProps<typeof skeletonVariants>["shape"]>("circle");
  currentTab = signal<Tab>(this.tabs()[0]);

  readonly codeSnippet = computed(() => {
    return `
<app-skeleton
  height="${this.height()}"
  width="${this.width()}"
  shape="${this.shape()}"
/>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }
}
