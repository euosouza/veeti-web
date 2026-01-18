import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectorRef, Component, computed, inject, signal, TemplateRef, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { VBadgeComponent } from "../../../../../libs/ui/components/badge/badge.component";
import { VDropdownComponent, VDropdownContentComponent, VDropdownItemComponent, VDropdownTriggerDirective } from "../../../../../libs/ui/components/dropdown/v-dropdown.component";
import { VIconComponent } from "../../../../../libs/ui/components/icon/v-icon.component";
import { VInputDirective } from "../../../../../libs/ui/components/input/v-input.directive";
import { VLabelComponent } from "../../../../../libs/ui/components/label/v-label.component";
import { VTableComponent } from "../../../../../libs/ui/components/table/v-table.component";
import { VTableColumn } from "../../../../../libs/ui/components/table/v-table.interface";
import { PlaygroundComponent } from "../../../components/playground/playground.component";
import { PlaygroundConfig } from "../../../constants/playground.constants";

interface Tab {
  name: string;
  active: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  salary: number;
  lastLogin: string;
  ip: string;
  department: string;
  location: string;
  phone: string;
}

@Component({
  selector: "app-table-demo",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    VTableComponent,
    VInputDirective,
    VIconComponent,
    VDropdownComponent,
    VDropdownTriggerDirective,
    VDropdownContentComponent,
    VDropdownItemComponent,
    VBadgeComponent,
    VLabelComponent,
    PlaygroundComponent
  ],
  templateUrl: "./table-demo.page.html"
})
export class TableDemoPage implements AfterViewInit {
  @ViewChild("actionsTemplate") actionsTemplate!: TemplateRef<User>;
  @ViewChild("statusTemplate") statusTemplate!: TemplateRef<User>;

  private cdr = inject(ChangeDetectorRef);

  // Tabs
  tabs = signal<Tab[]>([
    { name: "Overview", active: true },
    { name: "API", active: false }
  ]);
  currentTab = signal<Tab>(this.tabs()[0]);

  readonly config = signal<PlaygroundConfig>({
    title: "Table",
    description: "Componente de tabela de dados com suporte a colunas fixas, seleção e rolagem lateral.",
    documentation: {
      tableInputs: [
        {
          props: "data",
          types: "T[]",
          default: "[]",
          description: "Array de objetos a serem exibidos na tabela."
        },
        {
          props: "columns",
          types: "VTableColumn<T>[]",
          default: "[]",
          description: "Definição das colunas da tabela. Colunas fixas requerem 'width' e 'fixed: true' ou 'left'/'right'."
        },
        {
          props: "variant",
          types: "'default' | 'striped'",
          default: "'default'",
          description: "Estilo visual da tabela."
        },
        {
          props: "size",
          types: "'sm' | 'md' | 'lg'",
          default: "'md'",
          description: "Tamanho das células da tabela."
        },
        {
          props: "selectable",
          types: "boolean",
          default: "false",
          description: "Habilita a seleção de linhas (multiselect)."
        },
        {
          props: "rowKey",
          types: "keyof T | string",
          default: "'id'",
          description: "Chave única para identificar as linhas (usado na seleção)."
        }
      ],
      tableOutputs: [
        {
          props: "selectionChange",
          return: "T[]",
          description: "Emitido quando a seleção de linhas muda. Retorna o array de linhas selecionadas."
        }
      ]
    }
  });

  readonly variant = signal<"default" | "striped">("default");
  readonly size = signal<"sm" | "md" | "lg">("md");
  readonly selectable = signal<boolean>(false);
  readonly selectedCount = signal<number>(0);

  // Computed code snippet based on current state
  readonly codeSnippet = computed(() => {
    const selectableAttr = this.selectable()
      ? `
  [selectable]="true"`
      : "";

    return `<v-table
  [data]="data"
  [columns]="columns"
  variant="${this.variant()}"
  size="${this.size()}"${selectableAttr}
  (selectionChange)="onSelection($event)"
></v-table>

<!-- Template for Status Column -->
<ng-template #statusTemplate let-row>
  <v-badge [variant]="row.status === 'active' ? 'default' : 'danger'">
    {{ row.status | titlecase }}
  </v-badge>
</ng-template>

<!-- Template for Actions Column -->
<ng-template #actionsTemplate let-row>
  <div class="flex items-center justify-center gap-2">
    <!-- Actions content -->
  </div>
</ng-template>`;
  });

  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update((tabs) => tabs.map((t) => ({ ...t, active: t.name === tab.name })));
  }

  onSelection(selected: User[]) {
    this.selectedCount.set(selected.length);
  }

  // Mock data
  data: User[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "admin" : "user",
    status: i % 2 === 0 ? "active" : "inactive",
    salary: 2500 + i * 150.5,
    lastLogin: new Date(2023, 10, 27, 10, 30).toISOString(),
    ip: "192.168.1." + i,
    department: "Engineering",
    location: "Remote",
    phone: "+1 555 010 " + i
  }));

  columns: VTableColumn<User>[] = [];

  ngAfterViewInit() {
    // Determine templates after view init
    this.columns = [
      { key: "id", label: "ID", width: "60px", fixed: true, align: "center" },
      { key: "name", label: "Name", width: "150px", fixed: "left" },
      { key: "email", label: "Email" },
      { key: "role", label: "Role" },
      { key: "status", label: "Status", align: "center", template: this.statusTemplate },
      { key: "salary", label: "Salary", align: "right", type: "currency" },
      { key: "department", label: "Department" },
      { key: "location", label: "Location" },
      { key: "lastLogin", label: "Last Login", align: "center", type: "date" },
      { key: "actions", label: "Actions", align: "center", template: this.actionsTemplate }
    ];
    this.cdr.detectChanges();
  }
}
