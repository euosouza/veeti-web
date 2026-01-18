# Guia Completo para Criação de Componentes no Design System

Este documento é o guia definitivo para a criação de componentes de UI robustos, escaláveis e bem documentados. Siga-o rigorosamente para manter a alta qualidade do nosso Design System.

---

## 1. Estrutura de Arquivos e Propósitos

Todo componente vive em `src/app/libs/ui/components/[nome-do-componente]`.

| Arquivo | Propósito | Obrigatório? |
| :--- | :--- | :--- |
| `[nome].component.ts` | **Lógica e Template**. O cérebro do componente. Preferimos templates inline para componentes pequenos/médios. | Sim |
| `[nome].component.spec.ts` | **Testes Unitários**. Garante que o componente renderiza e comporta-se como esperado. | Sim |
| `[nome].constants.ts` | **Estilos e Variantes (CVA)**. Separa a definição de classes CSS da lógica, mantendo o componente limpo. | Se usar variantes |
| `[nome].interface.ts` | **Tipagem**. Exporta interfaces (`interface`) e tipos (`type`) públicos para consumidores do componente. | Se complexo |
| `README.md` | **Documentação Técnica**. A "bula" do componente para outros devs. | **SIM** |

---

## 2. Padrões de Desenvolvimento

### a. Angular Moderno (Signals)

Adotamos **Angular Signals** como padrão para reatividade.

**❌ EVITE (`@Input` Decorator):**
```typescript
@Input() label: string = ''; // Old school
@Input() disabled: boolean = false;
```

**✅ PREFIRA (`input` Signal):**
```typescript
// Define um input obrigatório
readonly label = input.required<string>();

// Define um input com valor padrão
readonly disabled = input<boolean>(false);

// Transforma o valor do input automaticamente
readonly count = input(0, { transform: numberAttribute });
```

### b. Estilização com CVA (Class Variance Authority)

Utilize CVA para gerenciar variantes visuais (ex: botões primários/secundários, tamanhos pequeno/grande).

**Passo 1: Criar o arquivo de constantes (`[nome].constants.ts`)**
```typescript
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  // 1. Classes Base (aplicadas sempre)
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-50",
  {
    variants: {
      // 2. Variantes de Estilo
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      // 3. Variantes de Tamanho
      size: {
        sm: "h-9 rounded-md px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
      },
    },
    // 4. Variantes Padrão (se não forem informadas)
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// Tipagem automática das props
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

**Passo 2: Usar no Componente (`[nome].component.ts`)**
```typescript
import { buttonVariants, ButtonVariants } from './[nome].constants';
import { twMerge } from 'tailwind-merge'; // Importante para mesclar classes!

export class MeuBotaoComponent {
  readonly variant = input<ButtonVariants['variant']>('primary');
  readonly size = input<ButtonVariants['size']>('md');
  readonly class = input<string>(''); // Permite classes extras do usuário

  // Computed signal para gerar a string final de classes
  protected computedClass = computed(() => {
    return twMerge(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.class()
    );
  });
}
```

**Passo 3: Aplicar no Template**
```html
<button [class]="computedClass()">
  <ng-content />
</button>
```

---

## 3. Guia de Documentação (`README.md`)

Copie e cole este template no `README.md` do seu componente e preencha as informações.

````markdown
# [Nome do Componente]

**Status:** 🟢 Estável / 🟡 Em Desenvolvimento / 🔴 Depreciado

## Descrição
Uma breve descrição do que o componente faz. Ex: "O componente Badge é usado para exibir status, categorias ou contagens de forma compacta."

## Instalação

```typescript
import { Component } from '@angular/core';
import { MeuComponente } from '@libs/ui/components/[caminho]';

@Component({
  standalone: true,
  imports: [MeuComponente],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Define o estilo visual. |
| `disabled` | `boolean` | `false` | Desabilita a interação. |

### Outputs

| Evento | Tipo | Descrição |
| :--- | :--- | :--- |
| `change` | `EventEmitter<string>` | Emitido quando o valor muda. |

## Exemplos de Uso

**Básico:**
```html
<v-componente variant="primary">Texto</v-componente>
```

**Com ícones:**
```html
<v-componente>
  <v-icon name="check" /> Salvar
</v-componente>
```

## Acessibilidade (A11y)
- O componente utiliza `button` nativo para garantir navegação via teclado.
- Use `aria-label` se o componente contiver apenas ícones.
````

---

## 4. Próximos Passos (Demo)

Após criar e documentar o componente, você deve criar a **Página de Demonstração**.

👉 **Consulte o [Guia de Criação de Demos](../../domain/design-system/COMPONENT_DEMO_GUIDE.md) para o próximo passo.**

**LEMBRETE IMPORTANTE:** Ao adicionar o componente ao menu lateral em `design-system.layout.ts`, mantenha a **ORDEM ALFABÉTICA** da lista.