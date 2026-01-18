
# Avatar Component

O componente `v-avatar` é utilizado para exibir a representação visual de um usuário ou entidade, geralmente uma imagem de perfil ou iniciais.

## Status
🟢 **Estável**

## API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :--- |
| `src` | `string` | `null` | URL da imagem do avatar. |
| `alt` | `string` | `''` | Texto alternativo para acessibilidade. |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho do avatar. |
| `shape` | `'circle' \| 'square'` | `'circle'` | Formato do avatar. |
| `class` | `string` | `''` | Classes CSS adicionais para customização. |

## Uso

### Básico com Imagem

```html
<v-avatar src="https://github.com/shadcn.png" alt="@shadcn"></v-avatar>
```

### Com Fallback (Iniciais)

Se a imagem não carregar ou não for fornecida, o conteúdo projetado será exibido.

```html
<v-avatar fallback>JD</v-avatar>
```

### Tamanhos

```html
<v-avatar size="sm">SM</v-avatar>
<v-avatar size="md">MD</v-avatar>
<v-avatar size="lg">LG</v-avatar>
<v-avatar size="xl">XL</v-avatar>
```

### Formatos

```html
<v-avatar shape="square">SQ</v-avatar>
<v-avatar shape="circle">CI</v-avatar>
```
