import { CommonModule } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PlaygroundComponent } from "@domain/design-system/components/playground/playground.component";
import { PlaygroundConfig } from "@domain/design-system/constants/playground.constants";
import { ButtonComponent } from "@libs/ui/components/button/button.component";
import { VCardComponent } from "@libs/ui/components/card";
import { VInputDirective } from "@libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "@libs/ui/components/label/v-label.component";
import { VTableComponent } from "@libs/ui/components/table";
import { VTableColumn } from "@libs/ui/components/table/v-table.interface";
import { VTooltipDirective } from "@libs/ui/components/tooltip";

import { VTabComponent, VTabContentComponent, VTabsComponent, VTabTitleComponent } from "@libs/ui/components/tabs";

@Component({
  selector: "app-tooltip-demo",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundComponent,
    VTooltipDirective,
    ButtonComponent,
    VInputDirective,
    VCardComponent,
    VTableComponent,
    VLabelComponent,
    VTabsComponent,
    VTabComponent,
    VTabTitleComponent,
    VTabContentComponent
  ],
  templateUrl: "./tooltip-demo.page.html"
})
export class TooltipDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: "Tooltip",
    description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    documentation: {
      tableInputs: [
        { props: "vTooltip", types: "string", default: "-", description: "The message to be displayed in the tooltip." },
        { props: "vTooltipPosition", types: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: "Position of the tooltip." }
      ]
    }
  });

  // Playground controls
  tooltipText = signal("Add to library");
  position = signal<"top" | "bottom" | "left" | "right">("top");

  // Table Columns
  columnsDocInputs: VTableColumn<unknown>[] = [
    { key: "props", label: "Prop", width: "150px" },
    { key: "types", label: "Type", width: "200px" },
    { key: "default", label: "Default", width: "150px" },
    { key: "description", label: "Description" }
  ];

  readonly codeSnippet = computed(() => {
    return `<app-button 
  variant="outline"
  vTooltip="${this.tooltipText()}" 
  vTooltipPosition="${this.position()}"
>
  Hover me
</app-button>`;
  });
}
