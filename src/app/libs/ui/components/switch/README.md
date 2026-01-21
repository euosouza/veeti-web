# Switch

**Status:** 🟢 Estável

## Descrição
O componente Switch é um controle que permite ao usuário alternar entre dois estados: marcado e desmarcado. É comumente usado para ativar ou desativar configurações.

## Instalação

```typescript
import { Component } from '@angular/core';
import { VSwitchComponent } from '@libs/ui/components/switch';

@Component({
  standalone: true,
  imports: [VSwitchComponent],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Texto opcional exibido ao lado do switch. |
| `disabled` | `boolean` | `false` | Se verdadeiro, impede a interação com o switch. |
| `variant` | `'default'` | `'default'` | Variante de estilo do switch. |
| `class` | `string` | `''` | Classes CSS adicionais para customização. |

### Control Value Accessor

Este componente implementa a interface `ControlValueAccessor`, o que significa que pode ser usado com `ngModel` ou `FormControl`.

## Exemplos de Uso

**Básico:**
```html
<v-switch></v-switch>
```

**Com Label:**
```html
<v-switch label="Modo Avião"></v-switch>
```

**Desabilitado:**
```html
<v-switch [disabled]="true"></v-switch>
```

**Com FormControl:**
```html
<v-switch [formControl]="myControl" label="Notificações"></v-switch>
```

## Acessibilidade (A11y)
- Utiliza `button` com `role="switch"`.
- Gerencia `aria-checked` para leitores de tela.
- Suporta navegação via teclado.
