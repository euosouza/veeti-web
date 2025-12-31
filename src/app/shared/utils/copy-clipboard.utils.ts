export function copyClipboard(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    alert("Conteúdo copiado para a área de transferência!");
  });
}
