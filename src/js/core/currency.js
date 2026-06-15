export function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

export function parseCurrency(value) {
  if (typeof value === "number") {
    return value;
  }

  const text = String(value).trim();
  const normalizedValue = text.includes(",")
    ? text.replaceAll(".", "").replace(",", ".")
    : text;

  return Number(normalizedValue);
}
