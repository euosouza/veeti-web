# Guia para Criação de Páginas de Demonstração de Componentes

## 1. Introdução

Este guia descreve o processo para criar uma nova página de demonstração para um componente do Design System. O objetivo é manter a consistência e a qualidade da documentação de nossos componentes.

## 2. Estrutura de Arquivos

Para um novo componente chamado `meu-componente`, a estrutura de arquivos dentro de `src/app/domain/design-system/pages/components/` deve ser a seguinte:

```
meu-componente-demo/
├── meu-componente-demo.page.html
├── meu-componente-demo.page.ts
└── meu-componente-demo.page.spec.ts
```

## 3. Criando o Componente (`meu-componente-demo.page.ts`)

O arquivo TypeScript é o cérebro da página de demonstração. Ele é um componente Angular standalone que gerencia o estado da demonstração.

### Passo 1: Definição do Componente

Crie um componente standalone importando os módulos necessários, como o próprio componente que será demonstrado, `PlaygroundComponent` e `FormsModule`.

```typescript
import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlaygroundComponent } from '../../../components/playground/playground.component';
import { MeuComponente } from '../../../../libs/ui/components/meu-componente/meu-componente.component';
// Importe interfaces, constantes, etc. do seu componente

@Component({
  selector: 'app-meu-componente-demo',
  imports: [MeuComponente, PlaygroundComponent, FormsModule],
  templateUrl: './meu-componente-demo.page.html',
})
export class MeuComponenteDemoPage {
  // ...
}
```

### Passo 2: Configuração da Documentação (`config`)

Crie um `signal` chamado `config` do tipo `PlaygroundConfig`. Ele contém as informações que serão exibidas na aba "API" da página.

```typescript
import { PlaygroundConfig } from '../../../constants/playground.constants';

// ...
export class MeuComponenteDemoPage {
  readonly config = signal<PlaygroundConfig>({
    title: 'Meu Componente',
    description: 'Uma breve descrição do que o Meu Componente faz.',
    documentation: {
      // Documentação dos Inputs
      tableInputs: [
        {
          props: 'inputProperty', // Nome do @Input()
          types: "'type1' | 'type2'", // Tipos aceitos
          default: "'type1'", // Valor padrão
          description: 'Descrição do que a propriedade faz.',
        },
      ],
      // Documentação dos Outputs
      tableOutputs: [
        {
          props: 'outputEvent', // Nome do @Output()
          return: 'void', // Tipo de dado emitido
          description: 'Descrição de quando o evento é emitido.',
        },
      ],
    },
  });
  // ...
}
```

### Passo 3: Controles do Playground

Use `signals` para gerenciar os valores das propriedades do seu componente no playground.

```typescript
export class MeuComponenteDemoPage {
  // ...
  propriedade1 = signal<string>('valorInicial');
  propriedade2 = signal<boolean>(false);
  // ... outros signals para cada controle
}
```

### Passo 4: Snippet de Código Dinâmico (`codeSnippet`)

Crie um `computed signal` chamado `codeSnippet` que gera a string de código HTML para o playground com base nos valores atuais dos signals de controle.

```typescript
export class MeuComponenteDemoPage {
  // ...
  readonly codeSnippet = computed(() => {
    const prop1 = this.propriedade1();
    const prop2 = this.propriedade2();

    return `
      <app-meu-componente
        inputProperty="${prop1}"
        [booleanProperty]="${prop2}"
      >
        Conteúdo do componente
      </app-meu-componente>
  `;
  });
  // ...
}
```

## 4. Criando o Template (`meu-componente-demo.page.html`)

O arquivo HTML define a estrutura visual da página, utilizando o `PlaygroundComponent` e outras seções para demonstrar o componente.

### Passo 1: Cabeçalho e Descrição

```html
<section class="mb-12">
  <span class="text-secondary text-sm font-bold uppercase tracking-widest">
    Design System > Componentes
  </span>
  <div class="space-y-6 mt-2">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
      {{ config().title }}
    </h1>
    <p class="text-base text-muted-foreground leading-[1.2]">
      {{ config().description }}
    </p>
  </div>
</section>
```

### Passo 2: Playground e Controles

Use o `app-playground` para a demonstração interativa. O componente a ser demonstrado vai dentro de `<ng-content preview]`. Os controles (inputs, selects, etc.) para manipular o componente vão dentro de `<ng-container controls>`.

```html
<app-playground [codeSnippet]="codeSnippet()">
  <!-- Visualização do Componente -->
  <ng-content preview>
    <app-meu-componente
      [inputProperty]="propriedade1()"
      [booleanProperty]="propriedade2()"
    >
      Conteúdo do componente
    </app-meu-componente>
  </ng-content>

  <!-- Controles para o Playground -->
  <ng-container controls>
    <div>
      <label for="prop1">Propriedade 1</label>
      <input type="text" id="prop1" [(ngModel)]="propriedade1" />
    </div>
    <div class="flex items-center gap-2 mt-4">
      <label for="prop2">Propriedade 2</label>
      <input type="checkbox" id="prop2" [(ngModel)]="propriedade2" />
    </div>
  </ng-container>
</app-playground>
```

### Passo 4: Seções de Demonstração Adicionais

Crie seções adicionais para mostrar variações, estados, tamanhos, etc., do seu componente com exemplos estáticos, similar às seções "Tipos e Hierarquia" e "Estados" da página do botão.

### Passo 5: Depuração de Formulários (Opcional)

Se o seu componente se integra com formulários (usa `ControlValueAccessor`), é **altamente recomendado** adicionar uma seção demonstrando essa integração usando o componente `VFormDebuggerComponent`.

1. Importe o `VFormDebuggerComponent` no seu `.page.ts`.
2. Adicione-o ao template `.page.html` passando o controle que deseja inspecionar.

```html
<!-- Para um controle único -->
<v-form-debugger [control]="meuForm.controls['meuCampo']"></v-form-debugger>

<!-- Para um FormGroup inteiro (exibe todos os controles filhos) -->
<v-form-debugger [control]="meuForm" title="Depurador de Formulário"></v-form-debugger>
```

Isso exibirá automaticamente o status (valid/invalid), flags (touched/dirty), valor e erros dos controles. Se um `FormGroup` for passado, o componente iterará automaticamente sobre todos os filhos, mantendo o layout padrão de grid para fácil visualização.

## 5. Criando o Teste (`meu-componente-demo.page.spec.ts`)

O arquivo de teste deve garantir que o componente de demonstração seja criado corretamente. Um teste básico é suficiente.

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeuComponenteDemoPage } from './meu-componente-demo.page';

describe('MeuComponenteDemoPage', () => {
  let component: MeuComponenteDemoPage;
  let fixture: ComponentFixture<MeuComponenteDemoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeuComponenteDemoPage],
    }).compileComponents();

    fixture = TestBed.createComponent(MeuComponenteDemoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## 6. Adicionando a Rota

Finalmente, adicione a rota para a nova página de demonstração no arquivo `src/app/domain/design-system/design-system.routes.ts`.

```typescript
// ...
export const routesDesignSystem: Routes = [
  // ... outras rotas
  {
    path: 'componentes/meu-componente', // URL da página
    loadComponent: () =>
      import('./pages/components/meu-componente-demo/meu-componente-demo.page').then(
        (m) => m.MeuComponenteDemoPage
      ),
  },
];
```

## 7. Adicionando no Menu do Layout

Para que a nova página de demonstração apareça no menu lateral do Design System, adicione uma entrada na propriedade `menu.componentes` do arquivo `src/app/core/layouts/design-system/design-system.layout.ts`.

```typescript
// ...
export class DesignSystemLayout {
  // ...
  menu: Menu = {
    // ...
    componentes: [
      // ... outros componentes
      {
        label: 'Meu Componente', // Título que aparecerá no menu
        path: '/design-system/componentes/meu-componente' // Mesmo path da rota
      }
    ]
  };
  // ...
}
```

## 8. Checklist Final

- [ ] A estrutura de arquivos foi criada corretamente.
- [ ] O componente TypeScript (`.page.ts`) é `standalone` e importa os módulos necessários.
- [ ] O `config` signal está preenchido com a documentação da API do componente.
- [ ] Os `signals` para os controles do playground estão definidos.
- [ ] O `codeSnippet` (computed signal) está gerando o código HTML corretamente.
- [ ] O template HTML (`.page.html`) usa o `app-playground` e tem os `bindings` corretos.
- [ ] O teste unitário (`.page.spec.ts`) está passando.
- [ ] A nova rota foi adicionada em `design-system.routes.ts`.
- [ ] A nova página foi adicionada no menu do layout em `design-system.layout.ts`.
- [ ] A página de demonstração funciona como esperado em `http://localhost:4200/design-system/componentes/meu-componente`.
