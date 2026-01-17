# Icon

O componente `v-icon` é um wrapper para os Material Symbols, permitindo exibir ícones de forma consistente com suporte a tamanhos e cores personalizados.

## Status
🟢 **Estável**

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `name` | `string` | **Obrigatório** | Nome do ícone Material Symbols (ex: 'home', 'settings'). |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | `'md'` | Tamanho do ícone. Pode ser um dos tamanhos pré-definidos ou um valor em pixels (number). |

## Tamanhos

| Tamanho | Valor |
| :--- | :--- |
| `sm` | 16px |
| `md` | 20px |
| `lg` | 24px |
| `number` | valor em px |

## Comportamento

O componente `v-icon` ajusta automaticamente suas dimensões (`width` e `height`) para corresponder ao tamanho do ícone (`size`), garantindo que ele ocupe o espaço correto no layout. Ele é renderizado como `inline-flex`.

## Como Usar

```typescript
import { VIconComponent } from '@libs/ui/components/icon/v-icon.component';

@Component({
  imports: [VIconComponent],
  template: `
    <!-- Tamanho padrão (md - 20px) -->
    <v-icon name="home"></v-icon>

    <!-- Tamanho pequeno (16px) -->
    <v-icon name="settings" size="sm"></v-icon>

    <!-- Tamanho grande (24px) com cor personalizada via classe -->
    <v-icon name="favorite" size="lg" class="text-red-500"></v-icon>

    <!-- Tamanho personalizado (32px) -->
    <v-icon name="check_circle" [size]="32" class="text-green-600"></v-icon>
  `
})
```
