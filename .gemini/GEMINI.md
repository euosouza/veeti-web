You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- For any manual `Observable.subscribe()`, you **MUST** use `takeUntilDestroyed()

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

## Form Integration

- **ControlValueAccessor:** When creating components that integrate with forms (require `formControl`), you **MUST** implement the `ControlValueAccessor` interface.
  - Follow the pattern used in [`VInputDirective`](src/app/libs/ui/components/input/v-input.directive.ts) for handling touched/dirty states and validation.
  - Do NOT pass `formControl` as a plain input unless absolutely necessary.


## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- **Services (`.service.ts`):** Contain business logic. They can be injected into Pages but NOT into dumb components.
- **APIs (`.api.ts`):** Contain only the code related to making HTTP requests. They are typically injected into Services.
- **Signals for State:**
  - Use signals for all local and page-level state.
  - Use `computed()` for derived state.
  - Do **NOT** use `signal.mutate()`. Use `set()` or `update()`.

## Directory Structure

- **`app/core`**
  - Global layouts and structural components (e.g., main header/footer).
- **`app/domain/<feature>`**
  - Represents a specific business domain (e.g., `users`, `products`).
  - **`.../apis`**: HTTP service classes.
  - **`.../components`**: "Dumb" components specific to this domain (presentation only).
  - **`.../pages`**: "Smart" components representing a complete screen/route (data fetching and state management).
  - **`.../services`**: Business logic services for the domain.
- **`app/widget/components`**
  - Generic and reusable components without business logic.
- **`app/libs/ui/components`**
  - The core Design System components.

```
  app/
  ├── core/                        # Global layouts and structural components
  │                                # (e.g., Main Header, Footer, Sidebar)
  │
  ├── domain/                      # Specific business domains
  │   └── <feature>/               # e.g., 'users', 'products'
  │       ├── apis/                # HTTP service classes for API integration
  │       ├── components/          # Domain-specific "Dumb" components
  │       ├── pages/               # "Smart" components (Screens/Routes)
  │       └── services/            # Business logic and state management
  │
  ├── widget/
  │   └── components/              # Generic, reusable components without business logic
  │
  └── libs/
      └── ui/
          └── components/          # Core Design System components (Buttons, Inputs, etc.)
```

### Naming Conventions

Consistency is key. Please adhere to the following rules when creating new files and classes.

### File Naming

- Use **`kebab-case`** for all file names.
  - _Example:_ `user-profile.component.ts`

### Class Naming and Suffixes

| Type              | Naming Convention          | Example File                | Example Class          |
| :---------------- | :------------------------- | :-------------------------- | :--------------------- |
| **Components**    | `PascalCase` + `Component` | `user-profile.component.ts` | `UserProfileComponent` |
| **Services**      | `PascalCase` + `Service`   | `user.service.ts`           | `UserService`          |
| **APIs**          | `PascalCase` + `Api`       | `user.api.ts`               | `UserApi`              |
| **Interfaces**    | Prefix `I` + `PascalCase`  | `user.interface.ts`         | `IUser`                |
| **Pages**         | `PascalCase` + `Page`      | `users.page.ts`             | `UsersPage`            |
| **Design System** | Prefix `V` + `PascalCase`  | `card.component.ts`         | `VCardComponent`       |

## Code Style & Best Practices

- **Dumb vs. Smart Components:**
  - **Dumb Components** (`.../components`) should receive data via inputs and emit events via outputs. They should not inject services or make API calls directly.
  - **Smart Components** (`.../pages`) are responsible for talking to Services/APIs and passing data down to dumb components.
- **Design System:**
  - Always check `app/libs/ui/components` before creating a custom UI element. Use the `V` prefixed components whenever possible.

## Documentação de Desenvolvimento

- [Guia para Criação de Novos Componentes do Design System](src/app/libs/ui/components/NEW_COMPONENT_GUIDE.md)
- [Guia para Criação de Páginas de Demonstração de Componentes](src/app/domain/design-system/COMPONENT_DEMO_GUIDE.md)
