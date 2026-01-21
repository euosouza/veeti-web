# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## Implementação

O componente `v-progress` é construído utilizando uma `div` container para o fundo e uma `div` interna para o indicador de progresso, controlada via `transform: translateX`.

### Imports

```typescript
import { VProgressComponent } from '@libs/ui/components/progress';

@Component({
  imports: [VProgressComponent],
  // ...
})
export class MyComponent {}
```

### Usage

```html
<v-progress [value]="33"></v-progress>
```

### Variants

#### Default

```html
<v-progress [value]="50"></v-progress>
```

#### Colors

Use `variant` prop to change the color of the indicator.

```html
<v-progress [value]="50" variant="success"></v-progress>
<v-progress [value]="50" variant="destructive"></v-progress>
<v-progress [value]="50" variant="warning"></v-progress>
<v-progress [value]="50" variant="info"></v-progress>
```

#### Sizes

Use `size` prop to change the height of the bar.

```html
<v-progress [value]="50" size="sm"></v-progress>
<v-progress [value]="50" size="md"></v-progress>
<v-progress [value]="50" size="lg"></v-progress>
<v-progress [value]="50" size="xl"></v-progress>
```

#### Custom Color
 
Use `variant="custom"` and providing a `color` prop to set a custom color.
 
```html
<v-progress [value]="50" variant="custom" color="#6366f1"></v-progress>
```
 
## API Reference
 
### VProgressComponent
 
| Input | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `0` | The current value of the progress bar. |
| `max` | `number` | `100` | The maximum value of the progress bar. |
| `variant` | `'default' \| 'success' \| 'destructive' \| 'warning' \| 'info' \| 'custom'` | `'default'` | The color variant of the progress bar. |
| `color` | `string` | `undefined` | The custom color of the progress bar. Works only when `variant="custom"`. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | The size (height) of the progress bar. |
| `class` | `string` | `''` | Additional classes to apply to the container. |
