# Label

Renders an accessible label associated with controls.

## Usage

```typescript
import { VLabelComponent } from '@libs/ui/components/label/v-label.component';
```

```html
<v-label htmlFor="email">Email</v-label>
<input type="email" id="email" />
```

## API

### Inputs

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `htmlFor` | `string` | - | The id of the element the label is associated with. |
| `variant` | `'default' \| 'error'` | `'default'` | The style variant of the label. |
| `class` | `string` | - | Additional CSS classes. |

## Accessibility

The `v-label` component renders a native `<label>` element, ensuring standard accessibility behavior.
