export function bindPdfExport(button, printDocument = () => window.print()) {
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    printDocument();
  });
}
