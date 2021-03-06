export function handleTextAreaHeight(textArea: HTMLTextAreaElement) {
  textArea.style.height = `${getTextareaHeight(textArea.scrollHeight)}px`;
  const handler = () => {
    // textArea.style.height = "auto";
    textArea.style.height = `${getTextareaHeight(textArea.scrollHeight)}px`;
  };
  textArea.addEventListener("input", handler);
  return () => {
    textArea.removeEventListener("input", handler);
  };
}

function getTextareaHeight(scrollHeight: number) {
  const maxHeight = window.innerHeight;
  const lineHeight = 1.15 * 20;
  const minTextareaHeight = lineHeight * 2 + 8;
  return Math.max(Math.min(maxHeight, scrollHeight), minTextareaHeight);
}

export function getIsSmallScreen(): boolean {
  return window.matchMedia("(max-width: 1000px)").matches;
}
export function getIsVerySmallScreen(): boolean {
  return window.matchMedia("(max-width: 650px)").matches;
}
