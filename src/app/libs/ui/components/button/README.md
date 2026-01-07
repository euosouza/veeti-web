# Veeti Button (Botão)

**Seletor:** `<app-button>`
**Status:** 🟢 Estável (v1.0)
**Pacote:** `src/app/libs/ui/components/button`

## 📝 Descrição
O componente `ButtonComponent` é um botão reutilizável e acessível, construído com Angular standalone. Ele suporta múltiplas variantes visuais, tamanhos e estados, facilitando a criação de interfaces consistentes. Utiliza `class-variance-authority` para gerenciamento de estilos e `clsx` para combinação de classes CSS.

## ⚙️ API (Inputs & Outputs)

### Inputs
- `disabled` (boolean, opcional, padrão: `false`): Desabilita o botão, impedindo cliques e aplicando estilos de desabilitado.
- `loading` (boolean, opcional, padrão: `false`): Ativa o estado de carregamento, desabilitando o botão e mostrando um indicador de carregamento.
- `class` (ClassValue, opcional, padrão: `""`): Permite adicionar classes CSS personalizadas ao botão.
- `variant` ('primary' | 'secondary' | 'destructive' | 'outline' | 'icon' | 'link', opcional, padrão: `'primary'`): Define a variante visual do botão.
- `size` ('sm' | 'md' | 'lg', opcional, padrão: `'md'`): Define o tamanho do botão.

### Outputs
- `onClick` (EventEmitter<void>): Emitido quando o botão é clicado (não emitido se desabilitado).

## 🎨 Variantes e Estilos

### Variantes
- **primary**: Fundo azul primário, texto branco. Ideal para ações principais.
- **secondary**: Fundo cinza secundário, texto branco. Para ações secundárias.
- **destructive**: Fundo vermelho, texto branco. Para ações de exclusão ou perigo.
- **outline**: Borda e texto neutro, fundo transparente. Para ações menos proeminentes.
- **icon**: Apenas texto, sem fundo. Para botões de ícone.
- **link**: Texto azul sublinhado, sem fundo. Para ações de navegação.

### Tamanhos
- **sm**: Altura 36px, padding pequeno, texto pequeno.
- **md**: Altura 40px, padding médio, texto padrão (padrão).
- **lg**: Altura 44px, padding grande, texto maior.

O componente inclui estilos para estados hover, focus e disabled automaticamente.

## 💻 Como Usar

### 1. Importação (Standalone)
```typescript
import { ButtonComponent } from 'src/app/libs/ui/components/button/button.component';
```

### 2. Uso no Template
```html
<!-- Botão básico -->
<app-button>Salvar</app-button>

<!-- Com variante e tamanho -->
<app-button variant="destructive" size="lg">Excluir</app-button>

<!-- Desabilitado -->
<app-button [disabled]="true">Carregando...</app-button>

<!-- Em estado de carregamento -->
<app-button [loading]="true">Salvar</app-button>

<!-- Com evento -->
<app-button (onClick)="handleSave()">Salvar</app-button>

<!-- Com classes personalizadas -->
<app-button class="my-custom-class">Personalizado</app-button>
```
## 💻 Acessibilidade (A11y)
- Usa o elemento `<button>` nativo, garantindo suporte completo a leitores de tela e navegação por teclado.
- O atributo `disabled` é aplicado diretamente ao botão, desabilitando interações.
- Estados de foco são visíveis com anéis de foco (focus rings) para navegação por teclado.
- Suporte a `aria-*` atributos via `class` input se necessário.
- Contraste de cores atende aos padrões WCAG para texto e fundos.

## 💻 Diretrizes (Do's & Don'ts)

### ✅ Do's
- Use variantes apropriadas para o contexto (ex.: `destructive` para exclusões).
- Sempre forneça texto descritivo ou ícones com `aria-label`.
- Teste interações em dispositivos móveis e com teclado.
- Use `disabled` para estados de carregamento ou indisponibilidade.

### ❌ Don'ts
- Não use como link; use `<a>` ou `routerLink` para navegação.
- Evite sobrescrever estilos essenciais com `class` (ex.: cores de fundo).
- Não remova estados de foco para acessibilidade.
- Não use para ações que não sejam botões (ex.: dropdowns sem trigger).

**Mantenedor:** Time de Frontend Veeti
**Última Atualização:** 07/01/2026
