import { formatCurrency } from "../core/currency.js";

export function bindPdfExport(button, printDocument = () => window.print()) {
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    printDocument();
  });
}

export function createReportCsv({
  receitas,
  despesas,
  saldo,
  economia,
  categorias,
}) {
  const totalCategorias = Object.values(categorias).reduce(
    (total, valor) => total + valor,
    0,
  );

  const rows = [
    ["Secao", "Item", "Valor", "Percentual"],
    ["Resumo", "Receitas", formatCsvCurrency(receitas), ""],
    ["Resumo", "Despesas", formatCsvCurrency(despesas), ""],
    ["Resumo", "Saldo projetado", formatCsvCurrency(saldo), ""],
    ["Resumo", "Economia", "", `${economia}%`],
  ];

  Object.entries(categorias).forEach(([nome, valor]) => {
    const percentual =
      totalCategorias > 0
        ? Math.round((valor / totalCategorias) * 100)
        : 0;

    rows.push(["Categoria", nome, formatCsvCurrency(valor), `${percentual}%`]);
  });

  return rows.map(row => row.map(escapeCsvValue).join(",")).join("\n");
}

export function bindCsvExport(
  button,
  getCsv,
  {
    BlobRef = Blob,
    documentRef = document,
    urlRef = URL,
  } = {},
) {
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    const blob = new BlobRef(["\ufeff", getCsv()], {
      type: "text/csv;charset=utf-8",
    });
    const url = urlRef.createObjectURL(blob);
    const link = documentRef.createElement("a");

    link.href = url;
    link.download = "relatorio-financeiro.csv";
    link.click();
    urlRef.revokeObjectURL(url);
  });
}

function escapeCsvValue(value) {
  const text = String(value);

  return /[",\n]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
}

function formatCsvCurrency(value) {
  return formatCurrency(value).replaceAll("\u00a0", " ");
}
