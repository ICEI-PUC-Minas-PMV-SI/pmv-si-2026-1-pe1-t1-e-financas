import assert from "node:assert/strict";
import test from "node:test";

import { parseCurrency } from "../src/js/core/currency.js";

test("converts Brazilian decimal values to numbers", () => {
  assert.equal(parseCurrency("3500,00"), 3500);
});

test("converts Brazilian values with thousands separator to numbers", () => {
  assert.equal(parseCurrency("3.500,00"), 3500);
});

test("preserves numeric values", () => {
  assert.equal(parseCurrency(3500), 3500);
});

test("converts normalized decimal strings to numbers", () => {
  assert.equal(parseCurrency("3500.00"), 3500);
});
