# Loading

**Status:** 🟢 Estável

## Descrição
O componente Loading é usado para indicar que uma ação está em processamento ou que o conteúdo está sendo carregado.

## Instalação

```typescript
import { VLoadingComponent } from '@libs/ui/components/loading/v-loading.component';

@Component({
  standalone: true,
  imports: [VLoadingComponent],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `'spinner' \| 'dots' \| 'pulse' \| 'bars' \| 'ring' \| 'orbit' \| 'bubbles'` | `'spinner'` | Define o estilo visual do carregamento. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Define o tamanho do componente. |
| `color` | `'primary' \| 'secondary' \| 'muted'` | `'primary'` | Define a cor do componente. |
| `class` | `string` | `''` | Classes CSS adicionais. |

## Exemplos de Uso

**Spinner Padrão:**
```html
<v-loading />
```

**Variante Dots:**
```html
<v-loading variant="dots" size="lg" color="secondary" />
```

**Variante Pulse:**
```html
<v-loading variant="pulse" size="xl" />
```

**Variante Bars:**
```html
<v-loading variant="bars" size="md" />
```

**Variante Ring:**
```html
<v-loading variant="ring" size="md" />
```

**Variante Orbit:**
```html
<v-loading variant="orbit" size="lg" />
```

**Variante Bubbles:**
```html
<v-loading variant="bubbles" size="lg" />
```

## Acessibilidade (A11y)
- O componente inclui o atributo `role="status"` e um texto `sr-only` ("Carregando...") para tecnologias assistivas.
