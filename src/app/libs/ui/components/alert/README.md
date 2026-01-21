# Alert

**Status:** 🟢 Estável

## Descrição
O componente Alert exibe uma chamada para atenção do usuário, comunicando informações importantes, sucesso, avisos ou erros.

## Instalação

```typescript
import { Component } from '@angular/core';
import { VAlertComponent } from '@libs/ui/components/alert/v-alert.component';

@Component({
  standalone: true,
  imports: [VAlertComponent],
  // ...
})
export class Page {}
```

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `variant` | `'default' \| 'destructive' \| 'info' \| 'warning' \| 'success'` | `'default'` | Define o estilo visual e o ícone padrão do alerta. |
| `vTitle` | `string \| TemplateRef<void>` | - | O título do alerta. |
| `vDescription` | `string \| TemplateRef<void>` | - | A descrição do alerta (opcional se usar projeção de conteúdo). |
| `vIcon` | `string \| TemplateRef<void>` | - | Ícone personalizado. Se não fornecido, usa o ícone padrão da variante. |
| `class` | `ClassValue` | `''` | Classes CSS adicionais. |

## Exemplos de Uso

**Básico (Info):**
```html
<v-alert variant="info" vTitle="Nova atualização" vDescription="Uma nova versão está disponível."></v-alert>
```

**Erro (Destructive):**
```html
<v-alert variant="destructive" vTitle="Erro" vDescription="Não foi possível salvar as alterações."></v-alert>
```

**Customizado com Template:**
```html
<v-alert variant="warning">
  <h5 class="font-bold">Atenção!</h5>
  <p>Verifique seus dados antes de continuar.</p>
</v-alert>
```

## Acessibilidade (A11y)
- O componente possui `role="alert"` para anunciar automaticamente aos leitores de tela quando aparece.
