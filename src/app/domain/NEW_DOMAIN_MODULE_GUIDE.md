# Guia para Criação de Novos Módulos de Domínio

Este guia descreve o padrão arquitetural e os passos necessários para criar um novo módulo dentro de `src/app/domain/`. O padrão segue a separação de responsabilidades (SoC), uso de componentes standalone e injeção de dependência otimizada.

## Estrutura de Diretórios

Cada módulo de domínio (ex: `cliente`, `produto`, `pedido`) deve seguir a seguinte estrutura de pastas:

```text
src/app/domain/<nome-do-modulo>/
├── apis/            # Serviços focados APENAS em chamadas HTTP
├── components/      # Componentes de apresentação ("Dumb Components") específicos deste domínio
├── interfaces/      # Interfaces e tipos TypeScript (DTOs, Modelos)
├── pages/           # Componentes de Página ("Smart Components") 
│   ├── list-<nome>/ # Página de Listagem
│   └── form-<nome>/ # Página de Formulário (Criação/Edição)
├── services/        # Serviços de regra de negócio e gerenciamento de estado
└── <nome>.routes.ts # Definição de rotas do módulo
```

---

## Passo a Passo

### 1. Definir Interfaces (`interfaces/`)
Crie as interfaces que representam os dados do seu domínio. Separe interfaces de requisição (Payloads) e resposta.

*Exemplo: `interfaces/cliente.interface.ts`*
```typescript
export interface ICliente {
  id: string;
  nome: string;
  email: string;
}

export interface ICreateCliente {
  nome: string;
  email: string;
}
```

### 2. Criar API Service (`apis/`)
Responsável **exclusivamente** por fazer requisições HTTP. Não deve conter regras de negócio complexas.

*   **Convenção de Nome:** `NomeDaEntidadeApi` (ex: `ClienteApi`)
*   **Arquivo:** `cliente.api.ts`
*   **Extende:** `BaseApi` (se houver) ou usa `HttpClient` diretamente.

```typescript
@Injectable({ providedIn: 'root' })
export class ClienteApi {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/clientes`;

  getAll(params?: any): Observable<IPaginatedResponse<ICliente>> { ... }
  getById(id: string): Observable<ICliente> { ... }
  create(payload: ICreateCliente): Observable<ICliente> { ... }
}
```

### 3. Criar Domain Service (`services/`)
Responsável pelas regras de negócio, orquestração de chamadas de API e gerenciamento de estado (Store/Signals).

*   **Convenção de Nome:** `NomeDaEntidadeService` (ex: `ClienteService`)
*   **Arquivo:** `cliente.service.ts`

```typescript
@Injectable({ providedIn: 'root' })
export class ClienteService {
  private api = inject(ClienteApi); // Injeta a API criada anteriormente

  // Signals para estado reativo
  readonly isLoading = signal(false);

  // Métodos que delegam para a API tratando loading/error/side-effects
  list() { ... }
  create(cliente: ICreateCliente) { ... }
}
```

### 4. Criar Rotas (`<nome>.routes.ts`)
Defina as rotas do módulo. Use `loadComponent` para Lazy Loading de componentes standalone.

*Arquivo: `cliente.routes.ts`*
```typescript
export const CLIENTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list-cliente/list-cliente.page').then(m => m.ListClientePage)
  },
  {
    path: 'novo',
    loadComponent: () => import('./pages/form-cliente/form-cliente.page').then(m => m.ClienteFormPage)
  },
  {
    path: 'editar/:id',
    loadComponent: () => import('./pages/form-cliente/form-cliente.page').then(m => m.ClienteFormPage)
  }
];
```

### 5. Criar Pages (`pages/`)
Páginas são "Smart Components" que orquestram a tela.

#### Página de Listagem (`pages/list-<nome>/`)
*   Usa `PageHeaderComponent`.
*   Usa `VCardComponent`, `VTableComponent`, etc.
*   Injeta o `Service` para buscar dados.

#### Página de Formulário (`pages/form-<nome>/`)
*   Usa **`PageFormLayoutComponent`** para estrutura (Header + Form Container + Ações).
    *   Este componente padroniza o layout de formulários, incluindo título, breadcrumb e botões de ação (Salvar/Cancelar).
*   Usa `ReactiveForms` (FormGroup, FormControl).
*   Usa componentes do Design System (`vInput`, `v-label`, `v-card`,`app-button`).
*   Injeta o `Service` para salvar/editar.
*   Injeta `ActivatedRoute` para verificar modo de edição (rota `editar/:id`).

*Exemplo de Template (`form-cliente.html`):*
```html
<app-page-form-layout
  [pageTitle]="isEditMode() ? 'Editar Cliente' : 'Novo Cliente'"
  [breadcrumb]="breadcrumb()"
  [formGroup]="form"
  [isLoading]="isLoading()"
  (onSubmit)="onSubmit()"
  (onCancel)="onCancel()"
>
  <v-card vTitle="Dados Gerais">
    <!-- Campos do formulário -->
    <div class="grid grid-cols-1 gap-4">
       <div class="flex flex-col gap-1">
          <v-label htmlFor="nome">Nome</v-label>
          <input id="nome" vInput formControlName="nome" />
          <!-- Validação... -->
       </div>
    </div>
  </v-card>
</app-page-form-layout>
```

### 6. Registrar Rotas Globais
Importe as rotas do seu novo módulo em `app.routes.ts`.

```typescript
{
  path: 'clientes',
  loadChildren: () => import('./domain/cliente/cliente.routes').then(m => m.CLIENTE_ROUTES)
}
```

## Padrões Importantes
1.  **Breadcrumbs:**
    *   Sempre configure o `VBreadcrumbConfig` nas Pages para navegação correta.
2.  **Imports:**
    *   Use os path aliases (`@domain`, `@core`, `@libs`) para imports mais limpos.
    *   Evite `../../..`.
