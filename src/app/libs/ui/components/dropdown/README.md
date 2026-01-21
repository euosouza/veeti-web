# Dropdown Menu

**Status:** 🟢 Estável

## Descrição
Exibe um menu para o usuário (como um conjunto de ações ou funções) que é acionado por um botão.

## Instalação

```typescript
import { Component } from '@angular/core';
import { 
  VDropdownComponent, 
  VDropdownTriggerDirective, 
  VDropdownContentComponent, 
  VDropdownItemComponent 
} from '@libs/ui/components/dropdown/v-dropdown.component';
import { VButtonComponent } from '@libs/ui/components/button/v-button.component'; // Exemplo de trigger

@Component({
  standalone: true,
  imports: [
    VDropdownComponent,
    VDropdownTriggerDirective,
    VDropdownContentComponent,
    VDropdownItemComponent,
    VButtonComponent
  ],
  // ...
})
export class Page {}
```

## API

### VDropdownComponent (`v-dropdown`)

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `align` | `'start' \| 'end'` | `'end'` | Alinhamento do menu em relação ao trigger. |

### VDropdownItemComponent (`v-dropdown-item`)

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `disabled` | `boolean` | `false` | Desabilita o item do menu. |

## Exemplos de Uso

**Básico:**
```html
<v-dropdown>
  <v-button vDropdownTrigger>Opções</v-button>

  <v-dropdown-content>
    <v-dropdown-item>Perfil</v-dropdown-item>
    <v-dropdown-item>Configurações</v-dropdown-item>
    <v-dropdown-item [disabled]="true">Convidar (Indisponível)</v-dropdown-item>
  </v-dropdown-content>
</v-dropdown>
```

**Alinhamento à Esquerda:**
```html
<v-dropdown align="start">
  <v-button vDropdownTrigger>Menu</v-button>
  <v-dropdown-content>
    <v-dropdown-item>Item 1</v-dropdown-item>
  </v-dropdown-content>
</v-dropdown>
```

## Acessibilidade (A11y)
- O menu suporta fechamento ao clicar fora ou pressionar `Esc`.
- O foco é gerenciado para garantir que a navegação não se perca.
