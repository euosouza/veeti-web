# VCardComponent

O `VCardComponent` é um contêiner versátil para agrupar conteúdo relacionado. Ele suporta cabeçalhos, rodapés, conteúdo principal e ações opcionais, com estilo consistente via CVA.

## Uso Básico

```html
<v-card vTitle="Título do Card" vDescription="Descrição opcional">
  <p>Conteúdo principal do card.</p>
  <div v-card-footer>
    <v-button>Confirmar</v-button>
  </div>
</v-card>
```

## API

### Inputs

| Input          | Tipo                       | Padrão  | Descrição |
| :------------- | :------------------------- | :------ | :-------- |
| `class`        | `ClassValue`               | `''`    | Classes CSS adicionais para o contêiner do card. |
| `vTitle`       | `string \| TemplateRef`    | `undefined` | Título do card. |
| `vDescription` | `string \| TemplateRef`    | `undefined` | Descrição logo abaixo do título. |
| `vAction`      | `string`                   | `''`    | Texto para um botão de ação no cabeçalho (ex: "Editar"). |
| `vHeaderBorder`| `boolean`                  | `false` | Se verdadeiro, adiciona uma borda inferior ao cabeçalho. |
| `vFooterBorder`| `boolean`                  | `false` | Se verdadeiro, adiciona uma borda superior ao rodapé. |

### Outputs

| Output         | Tipo   | Descrição |
| :------------- | :----- | :-------- |
| `vActionClick` | `void` | Emitido quando o botão de ação (se `vAction` for definido) é clicado. |

## Slots de Conteúdo

- **Conteúdo Padrão**: O conteúdo inserido diretamente dentro do componente será renderizado no corpo do card.
- **`[v-card-footer]`**: Conteúdo marcado com este atributo será renderizado na área de rodapé.

## Exemplo com TemplateRef

```html
<ng-template #customTitle>
  <span class="text-primary">Título Personalizado</span>
</ng-template>

<v-card [vTitle]="customTitle">
    ...
</v-card>
```
