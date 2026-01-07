# ThemeService

## Visão Geral

O `ThemeService` é um serviço Angular responsável por gerenciar o tema da aplicação (modo claro ou escuro). Ele utiliza o sistema de Signals do Angular para manter o estado reativo do tema, permitindo persistência no `localStorage` e detecção automática da preferência do sistema operacional. O tema é aplicado ao DOM via atributo `data-theme` no elemento raiz, facilitando estilização CSS.

Este serviço é injetável globalmente (`providedIn: "root"`), garantindo uma única instância compartilhada em toda a aplicação. Ele segue boas práticas do Angular, priorizando tipagem forte com TypeScript e separação de responsabilidades.

## Funcionalidades Principais

- **Persistência**: Salva o tema no `localStorage` para manter a escolha do usuário entre sessões.
- **Detecção de Preferência do Sistema**: Se nenhum tema estiver salvo, verifica a preferência do sistema via `window.matchMedia("(prefers-color-scheme: dark)")`.
- **Aplicação no DOM**: Define o atributo `data-theme` no `document.documentElement` para permitir estilização CSS baseada em seletores como `[data-theme="dark"]`.
- **Toggle Simples**: Permite alternar entre "light" e "dark" com um método dedicado.
- **Reatividade**: Usa Signals para atualizações eficientes, evitando detecção de mudanças manual.

## Exemplo de Uso

### 1. Injeção e Inicialização

Injete o serviço em um componente (ex.: `AppComponent`) e chame `load()` no `ngOnInit` para carregar o tema salvo ou do sistema.

```typescript
import { Component, OnInit, inject } from "@angular/core";
import { ThemeService } from "./core/services/theme/theme.service";

@Component({
  selector: "app-root",
  template: `
    <button (click)="toggleTheme()">Alternar Tema</button>
    <!-- Outros elementos da aplicação -->
  `
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  ngOnInit(): void {
    this.themeService.load(); // Carrega e aplica o tema
  }

  toggleTheme(): void {
    this.themeService.toggle(); // Alterna o tema
  }
}
```

### 2. Uso Avançado

Para reagir a mudanças de tema em tempo real (ex.: atualizar componentes filhos), acesse o Signal diretamente:

```typescript
import { effect } from '@angular/core';

// Em um componente
constructor(private themeService: ThemeService) {
  effect(() => {
    const currentTheme = this.themeService.get();
    console.log('Tema atual:', currentTheme);
    // Lógica adicional, como atualizar estilos dinâmicos
  });
}
```

## API do Serviço

### Métodos Públicos

- **`get(): Theme`**
  Retorna o tema atual.
  _Retorno_: O tema atual ("light" ou "dark").

- **`load(): void`**
  Carrega o tema do `localStorage` ou detecta a preferência do sistema, então aplica ao DOM.

- **`toggle(): void`**
  Alterna entre "light" e "dark", salva e aplica a mudança.

### Tipos

- **`Theme`**: Tipo union `"light" | "dark"`.
