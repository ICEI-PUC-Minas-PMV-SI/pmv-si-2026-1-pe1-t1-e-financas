import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("reports page exposes a PDF export button", async () => {
  const page = await read("src/relatorios.html");

  assert.match(page, /<button[^>]+id="btnExportarPdf"[^>]*>/);
  assert.match(page, />\s*Exportar PDF\s*<\/button>/);
});

test("PDF export button calls the browser print dialog", async () => {
  const { bindPdfExport } = await import("../src/js/pages/report-export.js");
  let listener;
  let printed = false;

  const button = {
    addEventListener(eventName, handler) {
      assert.equal(eventName, "click");
      listener = handler;
    },
  };

  bindPdfExport(button, () => {
    printed = true;
  });

  listener();

  assert.equal(printed, true);
});

test("print stylesheet keeps exported reports focused on report content", async () => {
  const styles = await read("src/styles.css");

  assert.match(styles, /@media print\s*\{/);
  assert.match(styles, /\.sidebar\s*,\s*#btnExportarPdf/);
});
