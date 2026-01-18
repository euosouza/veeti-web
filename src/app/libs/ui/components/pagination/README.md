# Pagination

**Status:** 🟢 Estável

## Descrição
O componente Pagination é utilizado para navegar através de uma grande lista de itens dividida em múltiplas páginas. Oferece diversas variantes visuais e suporte a controle de tamanho de página.

## Instalação

```typescript
import { Component } from '@angular/core';
import { VPaginationComponent } from '@libs/ui/components/pagination/pagination.component';

@Component({
  standalone: true,
  imports: [VPaginationComponent],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `total` | `number` | **Obrigatório** | Número total de itens. |
| `currentPage` | `number` | **Obrigatório** | Página atual (1-based). |
| `pageSize` | `number` | `10` | Itens por página. |
| `pageSizeOptions` | `number[]` | `[10, 20, 50, 100]` | Opções para o seletor de tamanho de página. |
| `variant` | `'default' \| 'numeric' \| 'item-count' \| 'mobile' \| 'input-jump'` | `'default'` | Estilo visual do componente. |
| `disabled` | `boolean` | `false` | Desabilita todas as interações do componente. |

### Outputs

| Evento | Tipo | Descrição |
| :--- | :--- | :--- |
| `pageChange` | `EventEmitter<number>` | Emitido quando o usuário seleciona uma nova página. |
| `pageSizeChange` | `EventEmitter<number>` | Emitido quando o usuário altera o tamanho da página. |

## Variantes

- **default**: Exibe botões Próximo/Anterior e números de página. (Alias para `numeric`)
- **numeric**: Exibição padrão com números de página.
- **item-count**: Adiciona contador de itens ("1-10 de 100") e seletor de tamanho de página.
- **mobile**: Versão compacta otimizada para telas menores ("Página 1 / 10").
- **input-jump**: Permite digitar o número da página diretamente.

## Exemplos de Uso

**Básico (Numérico):**
```html
<v-pagination
  [total]="100"
  [pageSize]="10"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)"
></v-pagination>
```

**Com Contador de Itens e Seletor de Tamanho:**
```html
<v-pagination
  variant="item-count"
  [total]="totalItems"
  [pageSize]="pageSize"
  [currentPage]="currentPage"
  [pageSizeOptions]="[5, 10, 25]"
  (pageChange)="onPageChange($event)"
  (pageSizeChange)="onPageSizeChange($event)"
></v-pagination>
```

**Mobile:**
```html
<v-pagination
  variant="mobile"
  [total]="100"
  [pageSize]="10"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)"
></v-pagination>
```

**Salto por Input:**
```html
<v-pagination
  variant="input-jump"
  [total]="1000"
  [pageSize]="10"
  [currentPage]="currentPage"
  (pageChange)="onPageChange($event)"
></v-pagination>
```

## Acessibilidade (A11y)
- O componente utiliza a tag `nav` com `aria-label="Pagination"`.
- Os botões de navegação possuem iconografia clara e estados de foco visíveis.
- Elementos interativos suportam navegação via teclado.
- Estados desabilitados são anunciados e bloqueiam interação.
