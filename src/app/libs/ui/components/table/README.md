# VTable Component

O componente `VTable` é uma tabela de dados flexível e poderosa, projetada para suportar colunas fixas, seleção de linhas, formatação automática de tipos e renderização customizada de células. Construído com Tailwind CSS, oferece fácil customização visual e responsividade.

## Funcionalidades

-   **Data Driven**: Renderiza linhas e colunas baseadas inteiramente em arrays de configuração.
-   **Colunas Fixas (Sticky)**: Permite fixar colunas à esquerda ou à direita (requer definição de largura).
-   **Seleção de Linhas**: Suporte nativo a seleção múltipla com checkboxes (header e linhas).
-   **Tipagem Automática**: Formatação integrada para datas, moedas e números.
-   **Renderização Customizada**: Flexibilidade total através de funções `render` ou `ng-template` do Angular.
-   **Styling Flexível**: Variantes visuais (`default`, `striped`) e controle de tamanho (`sm`, `md`, `lg`).

## Instalação e Uso Básico

Importe o `VTableComponent` no seu componente ou módulo:

```typescript
import { Component } from '@angular/core';
import { VTableComponent, VTableColumn } from '@libs/ui/components/table';

@Component({
  standalone: true,
  imports: [VTableComponent],
  template: `<v-table [data]="users" [columns]="columns" />`
})
export class MyPage {
  users = [
    { id: 1, name: 'João Silva', role: 'Admin' },
    { id: 2, name: 'Maria Santos', role: 'User' },
  ];

  columns: VTableColumn<any>[] = [
    { key: 'id', label: 'ID', width: '50px', fixed: true },
    { key: 'name', label: 'Nome' },
    { key: 'role', label: 'Função' },
  ];
}
```

## API

### Inputs (Propriedades)

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `data` | `T[]` | `required` | Array de objetos contendo os dados a serem exibidos. |
| `columns` | `VTableColumn<T>[]` | `required` | Array de configuração das colunas. |
| `variant` | `'default' \| 'striped'` | `'default'` | Estilo visual da tabela. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Define o espaçamento (padding) e tamanho da fonte das células. |
| `selectable` | `boolean` | `false` | Se `true`, exibe uma coluna de checkboxes para seleção de linhas. |
| `rowKey` | `keyof T \| string` | `'id'` | Propriedade única usada para identificar as linhas na seleção. |

### Outputs (Eventos)

| Evento | Retorno | Descrição |
| :--- | :--- | :--- |
| `selectionChange` | `T[]` | Emitido sempre que a seleção de linhas é alterada. Retorna a lista de itens selecionados. |

## Configuração das Colunas (`VTableColumn`)

A interface `VTableColumn<T>` controla como cada coluna é renderizada.

```typescript
interface VTableColumn<T> {
  // Chave da propriedade no objeto de dados (ou identificador único para colunas customizadas)
  key: keyof T | string;

  // Texto do cabeçalho da coluna
  label: string;

  // Largura da coluna (ex: '100px', '20%'). OBRIGATÓRIO para colunas fixas.
  width?: string;

  // Fixa a coluna na tela durante a rolagem horizontal.
  // true ou 'left' fixa à esquerda. 'right' fixa à direita.
  fixed?: boolean | "left" | "right";

  // Alinhamento do conteúdo da célula e do cabeçalho.
  align?: "left" | "center" | "right";

  // Aplica formatação automática usando Pipes do Angular.
  type?: "text" | "number" | "date" | "currency" | "custom";

  // Função simples para transformar o valor antes da exibição.
  render?: (row: T) => string | number | boolean;

  // TemplateRef para renderização complexa (botões, badges, componentes variados).
  template?: TemplateRef<any>;
}
```

## Exemplo Completo

O exemplo abaixo demonstra o uso de:
-   Colunas fixas (`ID`, `Ações`).
-   Tipagem (`currency`, `date`).
-   Template customizado (`statusTemplate`, `actionsTemplate`).
-   Seleção de linhas.

```html
<v-table
  [data]="data"
  [columns]="columns"
  [selectable]="true"
  variant="striped"
  size="sm"
  (selectionChange)="onSelection($event)"
></v-table>

<!-- Template para coluna de Status -->
<ng-template #statusTemplate let-row>
  <v-badge [variant]="row.status === 'active' ? 'success' : 'danger'">
    {{ row.status | titlecase }}
  </v-badge>
</ng-template>

<!-- Template para coluna de Ações -->
<ng-template #actionsTemplate let-row>
  <button (click)="edit(row)">Editar</button>
</ng-template>
```

```typescript
export class TableDemoPage implements AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;
  @ViewChild('actionsTemplate') actionsTemplate!: TemplateRef<any>;

  columns: VTableColumn<any>[] = [];
  data = [ ... ]; // dados mockados

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    // Definimos as colunas no AfterViewInit para garantir que os Templates já foram carregados
    this.columns = [
      { key: 'id', label: 'ID', width: '60px', fixed: true, align: 'center' },
      { key: 'name', label: 'Nome', width: '200px', fixed: 'left' },
      { key: 'salary', label: 'Salário', type: 'currency', align: 'right' },
      { key: 'createdAt', label: 'Data', type: 'date', align: 'center' },
      { key: 'status', label: 'Status', template: this.statusTemplate, align: 'center' },
      { key: 'actions', label: 'Ações', template: this.actionsTemplate, align: 'center', width: '80px', fixed: 'right' }
    ];
    this.cdr.detectChanges();
  }

  onSelection(selectedItems: any[]) {
    console.log('Itens selecionados:', selectedItems);
  }
}
```
