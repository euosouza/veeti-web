# Playground

**Status:** 🟢 Estável

## Descrição
O componente Playground é uma ferramenta utilitária do Design System para exibir exemplos interativos de outros componentes. Ele fornece uma interface com abas para alternar entre a visualização (Preview) e o código (Code), além de uma seção lateral para controles.

## Instalação

```typescript
import { Component } from '@angular/core';
import { PlaygroundComponent } from '@domain/design-system/components/playground/playground.component';

@Component({
  standalone: true,
  imports: [PlaygroundComponent],
  // ...
})
export class DemoPage {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `codeSnippet` | `string` | **Obrigatório** | O trecho de código a ser exibido na aba "Code". |

### Slots (Content Projection)

O componente utiliza `ng-content` com seletores para organizar o layout:

| Seletor | Descrição |
| :--- | :--- |
| `[preview]` | O conteúdo a ser exibido na área de visualização central. |
| `[controls]` | O conteúdo (geralmente formulários/controles) a ser exibido na barra lateral direita. |

## Exemplos de Uso

```html
<app-playground [codeSnippet]="snippet()">
  <!-- Área de Visualização -->
  <div preview>
    <v-button [variant]="selectedVariant()">Clique Aqui</v-button>
  </div>

  <!-- Controles Laterais -->
  <div controls>
    <select [(ngModel)]="selectedVariant">
      <option value="primary">Primário</option>
      <option value="secondary">Secundário</option>
    </select>
  </div>
</app-playground>
```

## Detalhes de Implementação
- **Tabs Internas:** O componente gerencia seu próprio estado de abas (`activeTab`) para alternar entre Preview e Code.
- **Preview Area:** Possui um fundo com padrão de grade para ajudar na visualização de transparências e dimensões.
- **Code Area:** Exibe o snippet de código fornecido em um bloco formatado.
