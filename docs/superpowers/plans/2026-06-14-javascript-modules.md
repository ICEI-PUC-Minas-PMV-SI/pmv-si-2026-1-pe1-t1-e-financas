# JavaScript Modules Refactor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract inline application JavaScript into ES modules without changing current behavior.

**Architecture:** Interactive HTML pages each load one page entry module. Shared core modules contain only behavior that is identical across pages; page-specific parsing and rendering semantics remain in page modules.

**Tech Stack:** HTML5, native browser ES modules, JavaScript, Node.js built-in test runner, local static web server

---

### Task 1: Establish the Regression Harness

**Files:**
- Create: `package.json`
- Create: `tests/javascript-modules.test.js`

- [ ] Write failing structural tests requiring each interactive HTML page to use its expected `type="module"` script and contain no inline application script.
- [ ] Write failing tests for the planned shared currency, storage, and profile helpers.
- [ ] Run `npm test` and confirm failure because the modules do not exist and inline scripts remain.
- [ ] Add the minimal package test command using Node's built-in test runner.
- [ ] Run `npm test` and keep the expected module/extraction failures as the red baseline.

### Task 2: Add Shared Core Modules

**Files:**
- Create: `src/js/core/currency.js`
- Create: `src/js/core/storage.js`
- Create: `src/js/core/profile-ui.js`
- Modify: `tests/javascript-modules.test.js`

- [ ] Implement BRL formatting without value parsing.
- [ ] Implement explicit JSON storage read/write helpers with caller-provided fallback.
- [ ] Implement profile name and initials rendering using the existing selectors and `perfilUsuario` key.
- [ ] Run `npm test` and confirm all core helper tests pass while page extraction tests remain red.

### Task 3: Extract Transaction Pages

**Files:**
- Create: `src/js/pages/nova-transacao.js`
- Create: `src/js/pages/transacoes.js`
- Modify: `src/nova-transacao.html`
- Modify: `src/transacoes.html`

- [ ] Move each inline script unchanged into its page module.
- [ ] Replace each inline script with its page module reference.
- [ ] Reuse core helpers only where semantics are identical.
- [ ] Preserve existing transaction parsing, storage shapes, alert, and redirect behavior.
- [ ] Run `npm test` and confirm transaction-page structural tests pass.

### Task 4: Extract Goals and Profile Pages

**Files:**
- Create: `src/js/pages/metas.js`
- Create: `src/js/pages/perfil.js`
- Modify: `src/metas.html`
- Modify: `src/perfil.html`

- [ ] Move each inline script into its page module.
- [ ] Replace inline scripts with page module references.
- [ ] Reuse shared storage, currency, and profile UI helpers without altering behavior.
- [ ] Run `npm test` and confirm goals/profile structural tests pass.

### Task 5: Extract Dashboard and Reports Pages

**Files:**
- Create: `src/js/pages/dashboard.js`
- Create: `src/js/pages/relatorios.js`
- Modify: `src/dashboard.html`
- Modify: `src/relatorios.html`

- [ ] Move each inline script into its page module.
- [ ] Replace inline scripts with page module references while retaining Chart.js global script loading.
- [ ] Preserve each page's existing transaction parsing semantics and chart configuration.
- [ ] Run `npm test` and confirm all tests pass.

### Task 6: Browser Regression Verification

**Files:**
- Modify only if a regression is found.

- [ ] Serve `src/` through a local static web server.
- [ ] Load all six interactive pages and verify there are no module-load or console errors.
- [ ] Exercise transaction creation, transaction filtering/deletion, goal creation/update, and profile save workflows.
- [ ] Verify dashboard and reports render from stored data.
- [ ] Run `npm test` and `git diff --check`.
