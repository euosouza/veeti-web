# Breadcrumb

O componente `v-breadcrumb` exibe a localização da página atual dentro de uma hierarquia de navegação. Adiciona separadores automaticamente via CSS/ícones e suporta `RouterLink` para navegação no Angular.

## Importação

```typescript
import { VBreadcrumbComponent } from '@libs/ui/components/breadcrumb';

@Component({
  imports: [VBreadcrumbComponent],
  // ...
})
export class MyPage {}
```

## Uso Básico

```html
<v-breadcrumb [config]="breadcrumbConfig"></v-breadcrumb>
```

```typescript
import { VBreadcrumbConfig } from '@libs/ui/components/breadcrumb';

readonly breadcrumbConfig: VBreadcrumbConfig = {
  items: [
    { label: 'Home', path: '/' },
    { label: 'Components', path: '/components' },
    { label: 'Breadcrumb' } // Último item (ativo)
  ]
};
```

## API

### Inputs

| Propriedade | Tipo                            | Padrão  | Descrição                                                                 |
| :---------- | :------------------------------ | :------ | :------------------------------------------------------------------------ |
| `config`    | `VBreadcrumbConfig`             | **Req** | Configuração principal contendo os itens e estilo do separador.           |
| `wrap`      | `'wrap' \| 'nowrap'`            | `'wrap'`| Define se o breadcrumb deve quebrar linha em telas pequenas.              |
| `align`     | `'start' \| 'center' \| 'end' \| 'between'` | `'start'` | Alinhamento horizontal dos itens. |

### Tipos Auxiliares

#### `VBreadcrumbConfig`

```typescript
interface VBreadcrumbConfig {
  separator?: 'arrow' | 'slash'; // Tipo de separador visual
  items: VBreadcrumbLink[];      // Lista de links
}
```

#### `VBreadcrumbLink`

```typescript
interface VBreadcrumbLink {
  label: string;       // Texto exibido
  path?: string;       // Rota do RouterLink (opcional para o último item)
  icon?: string;       // Nome do ícone (opcional)
}
```

## Variantes de Separador

O separador pode ser customizado através da propriedade `separator` dentro do objeto de configuração.

### Arrow (Padrão)

```typescript
{
  separator: 'arrow',
  items: [...]
}
```

### Slash

```typescript
{
  separator: 'slash',
  items: [...]
}
```
