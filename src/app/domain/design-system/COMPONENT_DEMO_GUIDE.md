# Guia Completo para Páginas de Demonstração

Este guia detalha como criar páginas de demonstração interativas e educativas para o Design System. Uma boa demo não apenas mostra o componente, mas ensina como usá-lo corretamente.

---

## 1. Anatomia de uma Página de Demo

Todas as páginas devem seguir o padrão **"Tabs Layout"**:

1.  **Overview Tab**:
    *   **Playground**: Área interativa principal.
    *   **Variantes**: Exemplos visuais estáticos de todas as variações.
    *   **Estados**: Exemplos de disabled, loading, focus, etc.
2.  **API Tab**:
    *   Documentação técnica gerada automaticamente.

---

## 2. Playground Configuration (`PlaygroundConfig`)

A propriedade `config` no seu `.page.ts` é a fonte da verdade para a documentação. Entenda cada campo:

```typescript
export interface PlaygroundConfig {
  /** Título principal exibido no topo da página (H1) */
  title: string;

  /** Breve descrição ou subtítulo do componente */
  description: string;

  /** Objeto de documentação para a aba API */
  documentation: {
    /** Documentação dos Inputs (@Input ou input()) */
    tableInputs?: Array<{
      /** Nome exato da propriedade (ex: 'variant') */
      props: string;
      /** Tipos aceitos (ex: "'primary' | 'secondary'" ou "boolean") */
      types: string;
      /** Valor padrão (ex: "'primary'" ou "false") */
      default: string;
      /** Descrição funcional do que a propriedade faz */
      description: string;
    }>;

    /** Documentação dos Outputs (@Output ou output()) */
    tableOutputs?: Array<{
      /** Nome do evento (ex: 'click', 'valueChange') */
      props: string;
      /** Tipo do dado emitido (ex: 'void', 'string', 'MouseEvent') */
      return: string;
      /** Quando o evento é disparado */
      description: string;
    }>;
  };
}
```

---

## 3. Gerando o Code Snippet Dinâmico

O `codeSnippet` é o que aparece na caixa de código do Playground. Ele deve refletir o estado *atual* dos controles.

**Dicas para um snippet limpo:**

Use um `computed()` para reagir às mudanças dos signals:

```typescript
readonly codeSnippet = computed(() => {
  const variant = this.variant(); // Signal<string>
  const isDisabled = this.isDisabled(); // Signal<boolean>
  const content = this.content(); // Signal<string>

  // Lógica para esconder atributos opcionais/padrão
  const disabledAttr = isDisabled ? '\n  [disabled]="true"' : '';
  const variantAttr = variant !== 'primary' ? `\n  variant="${variant}"` : '';

  return `<v-button${variantAttr}${disabledAttr}>
  ${content}
</v-button>`;
});
```

**Resultado esperado:**
Se `disabled` for false e `variant` for primary (padrão), o snippet fica limpo:
```html
<v-button>Content</v-button>
```

Se alterar os valores:
```html
<v-button
  variant="destructive"
  [disabled]="true"
>
  Content
</v-button>
```

---

## 4. Boilerplate Completo (`.page.ts`)

Use este modelo como base para começar rápido:

```typescript
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaygroundComponent } from '../../../components/playground/playground.component';
import { PlaygroundConfig } from '../../../constants/playground.constants';
// ⚠️ IMPORTE SEU COMPONENTE AQUI
import { VMyComponent } from '@libs/ui/components/my-component';

interface Tab { name: string; active: boolean; }

@Component({
  selector: 'app-my-component-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, PlaygroundComponent, VMyComponent],
  templateUrl: './my-component-demo.page.html',
})
export class MyComponentDemoPage {
  // 1. Configuração
  readonly config = signal<PlaygroundConfig>({
    title: 'My Component',
    description: 'Explain what this component does.',
    documentation: {
      tableInputs: [
        { props: 'label', types: 'string', default: "''", description: 'Label text.' }
      ]
    }
  });

  // 2. Abas
  tabs = signal<Tab[]>([{ name: "Overview", active: true }, { name: "API", active: false }]);
  currentTab = signal<Tab>(this.tabs()[0]);

  // 3. Controles do Playground
  label = signal('Hello World');

  // 4. Snippet
  readonly codeSnippet = computed(() => `<v-my-component label="${this.label()}"></v-my-component>`);

  // 5. Métodos
  onClickTab(tab: Tab) {
    this.currentTab.set(tab);
    this.tabs.update(ts => ts.map(t => ({ ...t, active: t.name === tab.name })));
  }
}
```

---

## 5. Troubleshooting (Problemas Comuns)

**🔴 O componente não aparece no preview.**
*   Verifique se introduziu o componente no array `imports` do `@Component` na página de demo.
*   Verifique se o template HTML está usando a tag correta (`<v-meu-componente>`).

**🔴 O Code Snippet não atualiza.**
*   Certifique-se de estar usando `computed()` e lendo os signals (`this.prop()`) dentro dele.

**🔴 Erro "Can't bind to 'ngModel'".**
*   Importe `FormsModule` no seu componente de demo.

**🔴 O item não aparece no menu lateral.**
*   Você editou o arquivo `src/app/core/layouts/design-system/design-system.layout.ts`?
*   Você adicionou o item dentro do array `menu.componentes`?
*   ⚠️ **Você respeitou a ORDEM ALFABÉTICA?**

---

## 6. Checklist de Qualidade

Antes de enviar seu PR:

- [ ] A página segue o layout de Abas (Overview/API)?
- [ ] O Playground funciona e reflete as props principais?
- [ ] Os "Variantes" mostram todos os estilos disponíveis?
- [ ] A aba API está preenchida corretamente via `config`?
- [ ] O componente foi adicionado ao Menu Lateral em ordem alfabética?
