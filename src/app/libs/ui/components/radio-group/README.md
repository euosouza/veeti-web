# Radio Group

**Status:** 🟢 Estável

## Descrição
O componente Radio Group permite que os usuários selecionem uma única opção de um conjunto de opções mutuamente exclusivas. Ele é composto por um contêiner `v-radio-group` e múltiplos componentes `v-radio-button`.

## Instalação

```typescript
import { Component } from '@angular/core';
import { VRadioGroupComponent, VRadioButtonComponent } from '@libs/ui/components/radio-group';

@Component({
  standalone: true,
  imports: [VRadioGroupComponent, VRadioButtonComponent],
  template: `
    <v-radio-group [(ngModel)]="selectedFruit">
      <v-radio-button value="apple">Maçã</v-radio-button>
      <v-radio-button value="banana">Banana</v-radio-button>
    </v-radio-group>
  `
})
export class MyPage {
  selectedFruit = 'apple';
}
```

## API

### VRadioGroupComponent

#### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Define o tamanho dos radio buttons no grupo. |
| `variant` | `'default' \| 'error'` | `'default'` | Define o estilo visual do grupo. |
| `disabled` | `boolean` | `false` | Desabilita todos os radio buttons no grupo. |
| `id` | `string` | `''` | ID customizado para o grupo. |
| `class` | `string` | `''` | Classes CSS adicionais. |

### VRadioButtonComponent

#### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `value` | `unknown` | `undefined` | **Obrigatório.** O valor associado a este radio button. |
| `id` | `string` | `auto-generated` | ID único para o radio button. |
| `class` | `string` | `''` | Classes CSS adicionais. |

## Exemplos de Uso

**Básico com Reactive Forms:**
```html
<v-radio-group formControlName="fruit">
  <v-radio-button value="apple">Maçã</v-radio-button>
  <v-radio-button value="banana">Banana</v-radio-button>
  <v-radio-button value="orange">Laranja</v-radio-button>
</v-radio-group>
```

**Tamanhos Diferentes:**
```html
<v-radio-group size="sm">
  <v-radio-button value="small">Pequeno</v-radio-button>
</v-radio-group>

<v-radio-group size="lg">
  <v-radio-button value="large">Grande</v-radio-button>
</v-radio-group>
```

**Estado de Erro:**
```html
<v-radio-group variant="error">
  <v-radio-button value="error">Possui Erro</v-radio-button>
</v-radio-group>
```

## Acessibilidade (A11y)
- O componente utiliza `role="radiogroup"` no contêiner e `role="radio"` nos botões.
- Suporta navegação via teclado usando `Space` ou `Enter` para selecionar.
- Gerencia automaticamente os atributos `aria-checked` e `aria-disabled`.
- Utiliza um `input type="radio"` escondido para garantir comportamento nativo e suporte a formulários.
