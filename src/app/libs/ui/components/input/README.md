# Input (vInput)

Diretiva para aplicar estilos e comportamentos consistentes a elementos `input` e `textarea` nativos, transformando-os em componentes do Design System.

## Status
🟢 Estável

## Descrição
A diretiva `vInput` estiliza elementos de formulário nativos e gerencia automaticamente estados de validação. Ela implementa `ControlValueAccessor`, permitindo sua utilização tanto com `[(ngModel)]` quanto com `ReactiveFormsModule`.

## Como Usar

### Importação
```typescript
import { VInputDirective } from '@libs/ui/components/input/v-input.directive';

@Component({
  imports: [VInputDirective]
})
```

### Uso Básico
```html
<input vInput type="text" placeholder="Digite seu nome..." />
```

### Com Reactive Forms
Quando usado com `formControl` ou `formControlName`, a diretiva monitora automaticamente o estado do controle. Se o controle estiver `invalid` e (`touched` ou `dirty`), o estilo de **erro** será aplicado automaticamente.

```html
<input vInput [formControl]="emailControl" type="email" />
```

### Customização de Estilo
Você pode passar classes CSS adicionais diretamente para o atributo `class`.

```html
<input vInput class="bg-gray-100" />
```

## API

### Inputs

| Propriedade | Tipo                  | Padrão    | Descrição                                      |
| :---------- | :-------------------- | :-------- | :--------------------------------------------- |
| `variant`   | `'default' | 'error' | 'success'` | `'default'` | Variante de estilo visual.                     |
| `size`      | `'default' | 'sm' | 'lg'`| `'default'` | Tamanho do input.                              |
| `class`     | `string`              | `''`      | Classes CSS extra a serem mescladas.           |

### Outputs (ControlValueAccessor)

A diretiva propaga mudanças de valor e estado de "touched" para o Angular Forms.

-   **onChange**: Chamado no evento `input`.
-   **onTouched**: Chamado no evento `blur`.

## Acessibilidade

-   Use sempre `<label>` associado ao input (use `for` e `id`).
-   Para mensagens de erro, utilize `aria-describedby` apontando para o elemento da mensagem.

```html
<label for="email">Email</label>
<input vInput id="email" [formControl]="control" aria-describedby="email-error" />
@if (control.invalid) {
  <span id="email-error">Email inválido</span>
}
```
