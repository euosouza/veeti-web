# Guia para Criação de Novos Componentes no Design System

Este documento serve como um guia passo a passo para a criação de novos componentes reutilizáveis dentro do `libs/ui` e sua subsequente documentação e demonstração no Design System.

## 1. Estrutura de Arquivos do Componente

Todo novo componente deve residir em `src/app/libs/ui/components`. A estrutura de diretórios para um novo componente deve ser a seguinte:

```
└───ui
    └───components
        └───[component-name]
            ├───[component-name].component.ts
            ├───[component-name].component.spec.ts
            ├───[component-name].constants.ts  // Opcional: para variantes com CVA
            ├───[component-name].interface.ts // Opcional: para tipos e interfaces complexas
            └───README.md                        // Documentação do componente
```

## 2. Desenvolvendo o Componente

### a. Lógica do Componente (`.ts`)

-   **Standalone**: O componente deve ser `standalone: true`.
-   **API Pública**: Defina os `inputs` e `@Output()` do seu componente. Prefira os `input()` signals sempre que possível.
-   **Encapsulamento**: Toda a lógica deve ser autocontida, evitando dependências externas desnecessárias.
-   **Acessibilidade (A11y)**: Garanta que o componente seja acessível, utilizando atributos ARIA apropriados e gerenciando o foco quando necessário.

**Exemplo de Estrutura (`[component-name].component.ts`):**
```typescript
import { Component, input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-[component-name]',
  standalone: true,
  imports: [/* Módulos e componentes necessários */],
  template: `<!-- HTML do seu componente -->`
})
export class ComponentNameComponent {
  // Exemplo de Input
  readonly appearance = input<'primary' | 'secondary'>('primary');

  // Exemplo de Output
  @Output() customEvent = new EventEmitter<void>();

  // Lógica interna do componente
}
```

### b. Estilização com CVA (`.constants.ts`)

Para componentes que possuem múltiplas variantes de estilo (ex: cor, tamanho), utilize `class-variance-authority` (CVA) para gerenciar as classes CSS de forma organizada.

-   Defina todas as variantes e seus respectivos estilos no arquivo `[component-name].constants.ts`.
-   Exporte uma constante que combina as classes base com as variantes.

**Exemplo de Estrutura (`[component-name].constants.ts`):**
```typescript
import { cva, type VariantProps } from "class-variance-authority";

export const componentNameVariants = cva(
  "classe-base-do-componente", // Classes aplicadas a todas as variantes
  {
    variants: {
      variant: {
        primary: "classes-para-variante-primary",
        secondary: "classes-para-variante-secondary",
      },
      size: {
        sm: "classes-para-tamanho-sm",
        md: "classes-para-tamanho-md",
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export type ComponentNameVariantProps = VariantProps<typeof componentNameVariants>;
```

### c. Tipos e Interfaces (`.interface.ts`)

Para componentes com uma API mais complexa, defina `interfaces` e `types` em um arquivo dedicado para garantir type safety e clareza.

**Exemplo (`[component-name].interface.ts`):**
```typescript
export interface IComponentState {
  isLoading: boolean;
  isDisabled: boolean;
}

export type TComponentAppearance = 'solid' | 'outline' | 'ghost';
```

## 3. Documentando o Componente (`README.md`)

Cada componente **obrigatoriamente** deve ter seu próprio `README.md`. Este arquivo é a documentação central para outros desenvolvedores.

**Estrutura recomendada para o `README.md`:**

-   **Seletor e Status**: Como usar o componente e seu estado de desenvolvimento (ex: `🟢 Estável`, `🟡 Em Desenvolvimento`).
-   **Descrição**: O que o componente faz e quando utilizá-lo.
-   **API (Inputs & Outputs)**: Uma tabela detalhada com todas as propriedades (`input` e `signal`), seus tipos, valores padrão e descrições.
-   **Variantes e Estilos**: Se aplicável, explique as opções visuais e de estilo disponíveis.
-   **Como Usar**: Forneça exemplos de código claros e concisos (`.ts` e `.html`).
-   **Acessibilidade (A11y)**: Descreva as diretrizes de acessibilidade implementadas e como usar o componente de forma acessível.
-   **Diretrizes de Uso (Do's & Don'ts)**: Recomendações de boas e más práticas para evitar o uso indevido do componente.

## 4. Criando a Página de Demonstração no Design System

Após criar e documentar o componente, é essencial criar uma página de demonstração para que ele possa ser visualizado e testado interativamente no Design System.

### a. Estrutura da Página de Demo

As páginas de demonstração ficam em `src/app/domain/design-system/pages/components`.

```
└───components
    └───[component-name]-demo
        ├───[component-name]-demo.page.html
        ├───[component-name]-demo.page.spec.ts
        └───[component-name]-demo.page.ts
```

### b. Implementação

1.  **Crie os arquivos** da página de demonstração seguindo a estrutura acima.
2.  **Adicione a rota** no arquivo `design-system.routes.ts`:
    ```typescript
    {
      path: 'components/[component-name]',
      title: 'Component Name', // Título que aparecerá no menu
      loadComponent: () => import('./pages/components/[component-name]-demo/[component-name]-demo.page').then(m => m.ComponentNameDemoPage)
    }
    ```
3.  **No `.ts` da página**, importe e adicione seu novo componente ao `imports` do `@Component`.
4.  **No `.html` da página**, demonstre todos os casos de uso relevantes:
    -   Todas as variantes de estilo (`variant`).
    -   Todos os tamanhos (`size`).
    -   Todos os estados (ex: `disabled`, `loading`, `active`).
    -   Exemplos de interação (ex: resposta a eventos de clique).

Seguir este processo garante que cada novo componente seja robusto, bem documentado e facilmente detectável e utilizável por toda a equipe.