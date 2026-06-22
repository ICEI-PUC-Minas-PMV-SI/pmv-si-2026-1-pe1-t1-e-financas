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

test("reports page exposes a CSV export button", async () => {
  const page = await read("src/relatorios.html");

  assert.match(page, /<button[^>]+id="btnExportarCsv"[^>]*>/);
  assert.match(page, />\s*Exportar CSV\s*<\/button>/);
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
  assert.match(styles, /\.sidebar\s*,\s*#btnExportarCsv\s*,\s*#btnExportarPdf/);
});

test("topbar actions can wrap multiple export buttons", async () => {
  const styles = await read("src/styles.css");

  assert.match(styles, /\.topbar-actions\s*\{[^}]*flex-wrap:\s*wrap;/);
});

test("creates report CSV with summary and category rows", async () => {
  const { createReportCsv } = await import("../src/js/pages/report-export.js");

  const csv = createReportCsv({
    receitas: 3500,
    despesas: 1200,
    saldo: 2300,
    economia: 66,
    categorias: {
      Moradia: 900,
      "Alimentação, mercado": 300,
    },
  });

  assert.match(csv, /^Secao,Item,Valor,Percentual/m);
  assert.match(csv, /Resumo,Receitas,"R\$ 3\.500,00",/);
  assert.match(csv, /Resumo,Economia,,66%/);
  assert.match(csv, /Categoria,Moradia,"R\$ 900,00",75%/);
  assert.match(csv, /Categoria,"Alimentação, mercado","R\$ 300,00",25%/);
});

test("CSV export button downloads the generated report file", async () => {
  const { bindCsvExport } = await import("../src/js/pages/report-export.js");
  let listener;
  let blobParts;
  let clickedDownload = "";

  const button = {
    addEventListener(eventName, handler) {
      assert.equal(eventName, "click");
      listener = handler;
    },
  };

  const documentRef = {
    createElement(tagName) {
      assert.equal(tagName, "a");
      return {
        href: "",
        download: "",
        click() {
          clickedDownload = this.download;
        },
      };
    },
  };

  class FakeBlob {
    constructor(parts, options) {
      blobParts = parts;
      assert.equal(options.type, "text/csv;charset=utf-8");
    }
  }

  const urlRef = {
    createObjectURL() {
      return "blob:report";
    },
    revokeObjectURL(url) {
      assert.equal(url, "blob:report");
    },
  };

  bindCsvExport(button, () => "Secao,Item,Valor,Percentual", {
    BlobRef: FakeBlob,
    documentRef,
    urlRef,
  });

  listener();

  assert.deepEqual(blobParts, ["\ufeff", "Secao,Item,Valor,Percentual"]);
  assert.equal(clickedDownload, "relatorio-financeiro.csv");
});
