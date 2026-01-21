# Guia Completo para Páginas de Demonstração

Este guia detalha como criar páginas de demonstração interativas e educativas para o Design System. Uma boa demo não apenas mostra o componente, mas ensina como usá-lo corretamente.

---

## 1. Diretrizes de Implementação

Ao criar páginas de demonstração, **você DEVE utilizar os componentes já existentes no Design System** para construir a interface da própria demo. Isso garante consistência visual e testa os componentes em "dogfooding".

**Componentes Obrigatórios na UI da Demo:**

*   **Abas**: Use `<v-tabs>`, `<v-tab>`, `<v-tab-title>`, etc., em vez de implementar lógica manual de abas.
*   **Inputs**: Controles do Playground devem usar `vInput` (`[vInput]`) e/ou `<v-label>`.
*   **Botões**: Use `<v-button>` para ações na página.
*   **Tabelas**: A documentação da API (Inputs/Outputs) DEVE ser renderizada usando `<v-table>`.
*   **Checkbox/Radio/Select**: Use os componentes `v-checkbox`, `v-radio-group`, `v-select` para controles booleanos ou de seleção.

---

## 2. Anatomia de uma Página de Demo

Uma página de demonstração completa deve conter as seguintes seções, organizadas logicamente:

### A. Header
*   **Título**: Nome do componente (H1).
*   **Subtítulo**: Breve descrição.
*   **Breadcrumb**: Navegação contextual (ex: Design System > Components > Button).

### B. Playground
A área principal de interação. Deve conter:
*   **Preview**: O componente sendo demonstrado, reagindo em tempo real.
*   **Controls**: Inputs para alterar as propriedades do componente (variant, size, disabled, etc.).
*   **Code Snippet**: Código HTML gerado dinamicamente refletindo o estado atual.

### C. Estados (States)
Exemplos estáticos mostrando os diferentes estados do componente (se houver):
*   Default
*   Active
*   Disabled
*   Focus
*   Hover
*   Loading

### D. Variantes (Variants)
Explicação visual e textual das diferenças entre as variantes do componente.
*   *Exemplo*: Tamanhos (sm, md, lg), Cores (primary, secondary, destructive), Estilos (outline, solid, ghost).
*   Descreva a anatomia e quando usar cada variante.

### E. Observações (Notes)
Seção para notas técnicas, acessibilidade, ou comportamentos específicos que não são óbvios apenas olhando.

### F. Exemplos de Uso (Examples)
Crie exemplos práticos voltados ao contexto do **Veeti**.
*   *Exemplo*: Em vez de apenas um botão solto, mostre um "Formulário de Login" usando o botão.
*   *Exemplo*: Mostre um Card de "Perfil de Usuário" completo.

### G. API (Tab Separada)
Documentação técnica de `@Input` e `@Output`.

---

## 3. Playground Configuration (`PlaygroundConfig`)

A propriedade `config` no seu `.page.ts` define os metadados e a documentação da API.

```typescript
export interface PlaygroundConfig {
  title: string;
  description: string;
  documentation: {
    tableInputs?: Array<{
      props: string;
      types: string;
      default: string;
      description: string;
    }>;
    tableOutputs?: Array<{
      props: string;
      return: string;
      description: string;
    }>;
  };
}
```

---

## 4. Boilerplate Completo (`.page.ts`)

Use este modelo atualizado que já integra os componentes do Design System (`v-tabs`, `v-input`, `v-table`):

```typescript
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaygroundComponent } from '../../../components/playground/playground.component';
import { PlaygroundConfig } from '../../../constants/playground.constants';

// ⚠️ IMPORTE SEU COMPONENTE A DEMAIS COMPONENTES DO DS
import { VMyComponent } from '@libs/ui/components/my-component';
import { VBreadcrumbComponent, VBreadcrumbConfig } from '@libs/ui/components/breadcrumb';
import { VTabsComponent, VTabComponent, VTabTitleComponent, VTabContentComponent } from '@libs/ui/components/tabs';
import { VInputDirective } from '@libs/ui/components/input';
import { VTableComponent, VTableColumn } from '@libs/ui/components/table';
import { VLabelComponent } from '@libs/ui/components/label';

// Colunas padrão para documentação
const DOC_INPUTS_COLUMNS: VTableColumn[] = [
  { key: 'props', label: 'Propriedade' },
  { key: 'types', label: 'Tipo' },
  { key: 'default', label: 'Padrão' },
  { key: 'description', label: 'Descrição' },
];

@Component({
  selector: 'app-my-component-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PlaygroundComponent,
    VMyComponent,
    VBreadcrumbComponent,
    VTabsComponent, VTabComponent, VTabTitleComponent, VTabContentComponent,
    VInputDirective,
    VTableComponent,
    VLabelComponent
  ],
  templateUrl: './my-component-demo.page.html',
})
export class MyComponentDemoPage {
  // 1. Configuração e Docs
  readonly breadcrumb: VBreadcrumbConfig = {
    items: [
      { label: 'Design System', path: '/design-system' },
      { label: 'Components', path: '/design-system/components' },
      { label: 'My Component' }
    ]
  };

  readonly config = signal<PlaygroundConfig>({
    title: 'My Component',
    description: 'Explain what this component does.',
    documentation: {
      tableInputs: [
        { props: 'label', types: 'string', default: "''", description: 'Label text.' },
        { props: 'disabled', types: 'boolean', default: "false", description: 'Disables the component.' }
      ]
    }
  });

  // Colunas da Tabela de API
  readonly columnsDocInputs = DOC_INPUTS_COLUMNS;

  // 2. Controles do Playground
  label = signal('Hello World');
  isDisabled = signal(false);

  // 3. Snippet Dinâmico
  readonly codeSnippet = computed(() => {
    const label = this.label();
    const disabled = this.isDisabled();
    
    // Lógica para limpar o snippet
    const disabledAttr = disabled ? ' [disabled]="true"' : '';
    
    return `<v-my-component${disabledAttr}>\n  ${label}\n</v-my-component>`;
  });
}
```

### Exemplo de Template (`.page.html`)

```html
<div class="flex flex-col gap-6">

  <!-- Header -->
  <header>
    <div class="mb-2">
      <v-breadcrumb [config]="breadcrumb"></v-breadcrumb>
    </div>
    <h1 class="text-3xl font-bold text-neutral-900">{{ config().title }}</h1>
    <p class="text-lg text-neutral-600 mt-2">{{ config().description }}</p>
  </header>

  <!-- Content -->
  <v-tabs>
    <!-- Tab 1: Overview -->
    <v-tab [active]="true">
      <v-tab-title>Overview</v-tab-title>
      <v-tab-content>
        <div class="flex flex-col gap-10 py-6">
          
          <!-- Playground -->
          <app-playground [codeSnippet]="codeSnippet()">
            <div preview class="w-full flex justify-center p-8">
              <v-my-component [disabled]="isDisabled()">
                {{ label() }}
              </v-my-component>
            </div>

            <div controls class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                 <v-label>Label Text</v-label>
                 <input type="text" vInput [(ngModel)]="label">
              </div>

              <!-- Exemplo de Checkbox para booleanos -->
              <div class="flex items-center gap-2">
                 <input type="checkbox" id="disabled" [(ngModel)]="isDisabled">
                 <label for="disabled" class="text-sm">Disabled</label>
              </div>
            </div>
          </app-playground>

          <!-- Estados -->
          <section>
            <h2 class="text-2xl font-semibold mb-4">Estados</h2>
            <div class="flex gap-4 p-6 border rounded-lg">
                <!-- Exibe instâncias estáticas -->
                <v-my-component>Default</v-my-component>
                <v-my-component [disabled]="true">Disabled</v-my-component>
            </div>
          </section>

          <!-- Variantes (se houver) -->
          <!-- Observações (se houver) -->
          <!-- Exemplos (se houver) -->

        </div>
      </v-tab-content>
    </v-tab>

    <!-- Tab 2: API -->
    <v-tab>
      <v-tab-title>API</v-tab-title>
      <v-tab-content>
        <div class="py-6">
          <h3 class="text-xl font-bold mb-4">Inputs</h3>
          <v-table 
            [data]="config().documentation.tableInputs || []" 
            [columns]="columnsDocInputs"
            size="sm">
          </v-table>
        </div>
      </v-tab-content>
    </v-tab>
  </v-tabs>

</div>
```

---

## 5. Checklist de Qualidade

Antes de enviar seu PR:

- [ ] A página usa **`v-tabs`** para navegação?
- [ ] A aba API usa **`v-table`** para exibir inputs/outputs?
- [ ] O Header contém Título, Subtítulo e Breadcrumb?
- [ ] O Playground possui Preview e Controls funcionais usando componentes do DS (`vInput`, etc.)?
- [ ] As seções "Estados" e "Variantes" estão presentes e claras?
- [ ] Existem "Exemplos" práticos de uso no Veeti?
