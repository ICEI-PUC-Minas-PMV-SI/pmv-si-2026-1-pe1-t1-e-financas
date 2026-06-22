import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("public authentication pages use the full E-financas logo", async () => {
  const pages = await Promise.all([
    read("src/index.html"),
    read("src/cadastro.html"),
  ]);

  for (const page of pages) {
    assert.match(
      page,
      /<img class="brand__logo" src="assets\/images\/e-financas-logo\.svg" alt="E-Finanças">/,
    );
  }
});

test("application sidebars use the E-financas icon", async () => {
  const pages = await Promise.all(
    [
      "dashboard.html",
      "transacoes.html",
      "nova-transacao.html",
      "metas.html",
      "relatorios.html",
      "perfil.html",
    ].map((page) => read(`src/${page}`)),
  );

  for (const page of pages) {
    assert.match(
      page,
      /<img class="brand__icon" src="assets\/images\/e-financas-icon\.svg" alt="">/,
    );
    assert.doesNotMatch(page, /class="brand__mark"/);
  }
});

test("brand image styles constrain full logos and sidebar icons", async () => {
  const styles = await read("src/styles.css");

  assert.match(styles, /\.brand__logo\s*\{/);
  assert.match(styles, /\.brand__icon\s*\{/);
});
