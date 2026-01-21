# Tooltip

**Status:** 🟢 Estável

## Descrição
O componente Tooltip é usado para exibir informações adicionais quando o usuário passa o mouse, foca ou toca em um elemento.

## Instalação

```typescript
import { Component } from '@angular/core';
import { VTooltipDirective } from '@libs/ui/components/tooltip';

@Component({
  standalone: true,
  imports: [VTooltipDirective],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `vTooltip` | `string` | - | O texto a ser exibido no tooltip. |
| `vTooltipPosition` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | A posição do tooltip em relação ao elemento. |

### Outputs

Nenhum.

## Exemplos de Uso

**Básico:**
```html
<button vTooltip="Tooltip text">Hover me</button>
```

**Posicionamento:**
```html
<button vTooltip="Tooltip text" vTooltipPosition="right">Right</button>
```

## Acessibilidade (A11y)
- O tooltip deve ser acionado por foco e hover.
- O conteúdo do tooltip deve ser acessível a leitores de tela (futuramente implementar `aria-describedby`).
