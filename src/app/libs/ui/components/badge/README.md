# Badge Component

**Selector:** `app-badge`
**Status:** 🟢 Estável

## Descrição

O componente `Badge` é usado para destacar informações curtas e importantes, como status, contagens ou categorias. É altamente configurável, suportando diferentes variantes de cor, tamanhos e estados interativos, como remoção e clique.

## Tipos de Badges

Existem dois tipos principais de badges, que se diferenciam visualmente pela borda:

1.  **Badges Semânticos**: Usados para comunicar status (ex: sucesso, erro, aviso). Possuem fundo sólido e não têm borda visível.
    -   Variantes: `primary`, `success`, `danger`, `warning`, `info`.

2.  **Tags de Categorização**: Usados para classificar ou filtrar conteúdo. Possuem uma borda visível para se destacarem como elementos de agrupamento.
    -   Variantes: `secondary`, `outline`, `dark`.

## API (Inputs & Outputs)

| Propriedade | Tipo                                                              | Padrão      | Descrição                                                                         |
| ----------- | ----------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'dark' \| 'outline'` | `'primary'` | Define o estilo visual do badge.                                                  |
| `size`      | `'sm' \| 'md' \| 'lg'`                                            | `'sm'`      | Define o tamanho do badge.                                                        |
| `removable` | `boolean`                                                         | `false`     | Se `true`, exibe um ícone que permite ao usuário remover o badge.                   |
| `class`     | `string`                                                          | `''`        | Classes CSS customizadas para serem aplicadas ao badge.                             |
| `remove`    | `EventEmitter<void>`                                              | -           | Evento emitido quando o ícone de remoção é clicado (requer `removable="true"`).     |
| `badgeClick`| `EventEmitter<void>`                                              | -           | Evento emitido quando o badge é clicado. Habilita o comportamento de "botão".       |

## Como Usar

### Badge Simples

Use para exibir um status simples ou informação.

```html
<!-- Badge de Sucesso -->
<app-badge variant="success">Completo</app-badge>

<!-- Badge de Aviso (tamanho médio) -->
<app-badge variant="warning" size="md">Pendente</app-badge>
```

### Badge Removível

Ideal para tags que o usuário pode descartar (ex: filtros selecionados).

```typescript
import { BadgeComponent } from 'src/app/libs/ui/components/badge/badge.component';

@Component({
  standalone: true,
  imports: [BadgeComponent],
  template: `
    @for(tag of tags; track tag) {
      <app-badge 
        variant="outline" 
        size="md" 
        [removable]="true" 
        (remove)="removeTag(tag)">
        {{ tag }}
      </app-badge>
    }
  `
})
export class MyComponent {
  tags = ['Rock', 'Pop', 'Jazz'];

  removeTag(tagToRemove: string) {
    this.tags = this.tags.filter(tag => tag !== tagToRemove);
  }
}
```

### Badge Clicável

Pode funcionar como um botão ou link. O comportamento de clique só é ativado se houver um listener para o evento `(badgeClick)`.

```typescript
import { BadgeComponent } from 'src/app/libs/ui/components/badge/badge.component';

@Component({
  standalone: true,
  imports: [BadgeComponent],
  template: `
    <app-badge variant="primary" (badgeClick)="onBadgeClick()">
      Clique aqui
    </app-badge>
  `
})
export class MyComponent {
  onBadgeClick() {
    console.log('Badge foi clicado!');
    // Lógica para navegação, abrir um modal, etc.
  }
}
```

## Acessibilidade (A11y)

-   **Badges Não Interativos**: Renderizam como `<span>` e servem para exibir informação. Certifique-se de que a cor não seja o único meio de transmitir o significado.
-   **Badges Clicáveis**: Quando o evento `(badgeClick)` é usado, o badge ganha `role="button"` (implicitamente pelo `cursor-pointer` e eventos de clique/teclado) e `tabindex="0"`, tornando-o focável e acionável pelo teclado (Enter/Espaço).
-   **Badges Removíveis**: O botão de remoção é um `<button>` com `aria-label="Remove"`, garantindo que leitores de tela anunciem sua função.

## Diretrizes de Uso

### ✅ Faça

-   Use badges para informações concisas e de relance.
-   Escolha a variante (`semantic` vs. `tag`) apropriada para o caso de uso.
-   Mantenha o texto do badge curto e direto.
-   Use o estado `removable` para filtros ou seleções que o usuário pode descartar.
-   Use o evento `(badgeClick)` para navegação simples ou para acionar pequenas ações.

### ❌ Não Faça

-   Não use badges para textos longos.
-   Não adicione outros elementos interativos dentro de um badge.
-   Não dependa apenas da cor para transmitir significado. Forneça texto ou ícones de suporte quando necessário.
-   Evite usar `(badgeClick)` e `removable` no mesmo badge, pois isso cria duas áreas de clique com ações conflitantes, o que pode confundir o usuário.
