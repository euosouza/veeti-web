# VDivider

Componente utilizado para separar visualmente conteúdos em uma página ou lista.

## API

| Input | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Define a orientação do divisor. |
| `class` | `string` | `''` | Classes CSS adicionais para customização. |

## Variantes

O componente possui duas variantes de direção:

- **Horizontal**: Uma linha horizontal que ocupa 100% da largura do contêiner.
- **Vertical**: Uma linha vertical que ocupa 100% da altura do contêiner.

## Como Usar

### Importação

```typescript
import { VDividerComponent } from 'src/app/libs/ui/components/divider/v-divider.component';

@Component({
  imports: [VDividerComponent],
  // ...
})
export class MyComponent {}
```

### Exemplo Básico

```html
<!-- Horizontal (Padrão) -->
<v-divider></v-divider>

<!-- Vertical -->
<div class="flex h-5">
    <div>Item 1</div>
    <v-divider direction="vertical"></v-divider>
    <div>Item 2</div>
</div>
```

## Acessibilidade

- O componente rende um elemento `div` com `role="separator"`.
- O atributo `aria-orientation` é definido automaticamente com base no input `direction`.
