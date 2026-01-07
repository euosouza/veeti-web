# Skeleton

O componente `app-skeleton` é usado para criar um efeito de placeholder de carregamento, muitas vezes chamado de efeito "shimmer". É útil para indicar que o conteúdo está sendo carregado, melhorando a experiência do usuário.

## Uso

Aqui está um exemplo básico de como usar o componente skeleton:

```html
<app-skeleton height="20px" width="80%"></app-skeleton>
<app-skeleton height="20px" width="60%"></app-skeleton>
<app-skeleton shape="circle" height="50px" width="50px"></app-skeleton>
```

## API

### Entradas (Inputs)

O componente aceita as seguintes entradas:

| Entrada  | Tipo                         | Padrão      | Descrição                                                                                                                                       |
|----------|------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| `height` | `string`                     | `'1rem'`    | Define a altura do skeleton. Requer uma string com uma unidade CSS válida (ex: `'1rem'`, `'20px'`, `'100%'`).                                       |
| `width`  | `string`                     | `'100%'`    | Define a largura do skeleton. Requer uma string com uma unidade CSS válida (ex: `'10rem'`, `'80px'`, `'100%'`).                                        |
| `shape`  | `'square'` │ `'circle'`     | `'square'`  | Define o formato do skeleton. `'square'` aplica um leve arredondamento de borda, e `'circle'` o torna perfeitamente redondo (se altura e largura forem iguais). |
