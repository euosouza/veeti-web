# Checkbox

**Status:** 🟢 Estável

## Descrição
O componente Checkbox permite que o usuário selecione uma ou mais opções de um conjunto.

## Instalação

```typescript
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Se usar forms
import { VCheckboxComponent } from '@libs/ui/components/checkbox/v-checkbox.component';

@Component({
  standalone: true,
  imports: [VCheckboxComponent, ReactiveFormsModule],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `'default'` | `'default'` | Define o estilo visual. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Define o tamanho do checkbox. |
| `disabled` | `boolean` | `false` | Desabilita a interação. |
| `checked` | `boolean` | `false` | (Signal) Estado de marcado/desmarcado. |
| `id` | `string` | `auto-generated` | ID do input (útil para labels). |
| `class` | `string` | `''` | Classes CSS adicionais. |

### Outputs

| Evento | Tipo | Descrição |
| :--- | :--- | :--- |
| `checkedChange` | `EventEmitter<boolean>` | Emitido quando o estado muda. |

## Exemplos de Uso

**Básico:**
```html
<v-checkbox>Aceito os termos</v-checkbox>
```

**Com Reactive Forms:**
```html
<v-checkbox [formControl]="myControl">Receber notificações</v-checkbox>
```

**Tamanhos:**
```html
<v-checkbox size="sm">Pequeno</v-checkbox>
<v-checkbox size="md">Médio</v-checkbox>
<v-checkbox size="lg">Grande</v-checkbox>
```

## Acessibilidade (A11y)
- O componente utiliza um `input[type="checkbox"]` nativo visualmente oculto para garantir acessibilidade via teclado e leitores de tela.
- Suporta navegação via `Tab` e seleção com `Espaço`.
