import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageModules = {
  "dashboard.html": "js/pages/dashboard.js",
  "metas.html": "js/pages/metas.js",
  "nova-transacao.html": "js/pages/nova-transacao.js",
  "perfil.html": "js/pages/perfil.js",
  "relatorios.html": "js/pages/relatorios.js",
  "transacoes.html": "js/pages/transacoes.js"
};

for (const [page, modulePath] of Object.entries(pageModules)) {
  test(`${page} loads its page module without inline application scripts`, async () => {
    const html = await readFile(new URL(`../src/${page}`, import.meta.url), "utf8");

    assert.match(
      html,
      new RegExp(`<script type="module" src="${modulePath}"></script>`)
    );
    assert.doesNotMatch(html, /<script>\s*document\.addEventListener/);
  });
}

test("formatCurrency preserves BRL formatting behavior", async () => {
  const { formatCurrency } = await import("../src/js/core/currency.js");

  assert.equal(formatCurrency(1234.5), "R$ 1.234,50");
});

test("JSON storage helpers preserve explicit keys, values, and fallbacks", async () => {
  const { readJson, writeJson } = await import("../src/js/core/storage.js");
  const values = new Map();
  const storage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value)
  };
  const fallback = [];

  assert.equal(readJson(storage, "transacoes", fallback), fallback);

  const transactions = [{ id: 1, valor: "10,00" }];
  writeJson(storage, "transacoes", transactions);

  assert.deepEqual(readJson(storage, "transacoes", fallback), transactions);
});

test("profile UI helper preserves name and initials rendering", async () => {
  const { renderProfileUi } = await import("../src/js/core/profile-ui.js");
  const sidebarName = { textContent: "Usuário" };
  const avatar = { textContent: "MC" };
  const root = {
    querySelector(selector) {
      if (selector === ".sidebar-profile strong") return sidebarName;
      if (selector === ".avatar") return avatar;
      return null;
    }
  };

  renderProfileUi({ nome: "Maria Clara Silva" }, root);

  assert.equal(sidebarName.textContent, "Maria Clara Silva");
  assert.equal(avatar.textContent, "MC");
});

test("dashboard module retains chart and goals responsibilities", async () => {
  const source = await readFile(
    new URL("../src/js/pages/dashboard.js", import.meta.url),
    "utf8"
  );

  assert.match(source, /new Chart/);
  assert.match(source, /metasPrioritarias/);
  assert.match(source, /proximasAcoes/);
});
