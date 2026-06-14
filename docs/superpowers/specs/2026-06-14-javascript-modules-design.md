# JavaScript Modules Refactor Design

## Goal

Move the application's inline JavaScript into focused ES module files while preserving all current user-visible behavior and data compatibility.

## Constraints

- The application may require a local or static web server.
- Existing behavior must be preserved, including current DOM selectors, event timing, redirects, alerts, `localStorage` keys, stored object shapes, and Chart.js usage.
- Existing parsing differences between pages must remain unchanged. For example, dashboard, transaction history, and reports currently interpret transaction values differently.
- The refactor must not redesign the interface or add features.

## Architecture

Each interactive page imports one page-specific entry module:

```text
src/js/
├── core/
│   ├── currency.js
│   ├── profile-ui.js
│   └── storage.js
└── pages/
    ├── dashboard.js
    ├── metas.js
    ├── nova-transacao.js
    ├── perfil.js
    ├── relatorios.js
    └── transacoes.js
```

HTML pages load their entry point with a module script near the end of the body:

```html
<script type="module" src="js/pages/dashboard.js"></script>
```

Page modules own page-specific DOM queries, rendering, validation, parsing, and event handlers. Core modules contain only behavior that is demonstrably shared without changing semantics.

## Module Responsibilities

### `core/storage.js`

Provide small JSON read/write helpers around the supplied `Storage` instance. Preserve current fallback behavior and keys by requiring callers to pass both explicitly.

### `core/currency.js`

Provide the shared BRL `toLocaleString` formatting used by pages that currently format values identically. It must not parse or normalize values.

### `core/profile-ui.js`

Load and render the saved `perfilUsuario` name and initials into the existing sidebar and avatar elements. Missing elements and missing profile data remain harmless.

### Page Modules

Each page module contains the exact logic currently embedded in its HTML. It imports shared helpers only where behavior is identical. Page-specific transaction parsing remains in the relevant page module.

## Data Flow

1. The browser loads an HTML page through a web server.
2. The page's ES module executes after the document is parsed.
3. The page module reads the same `localStorage` keys used today.
4. It renders into the same DOM elements and attaches the same event handlers.
5. User actions write the same data shapes and perform the same redirects or alerts.

## Error Handling

The refactor preserves current error behavior. Shared helpers remain defensive around missing DOM elements and absent storage values, but do not introduce new recovery behavior that could hide or alter existing outcomes.

## Regression Strategy

- Add Node built-in tests for shared pure/helper behavior.
- Add structural tests that verify interactive HTML pages reference their expected module and contain no inline application scripts.
- Run tests after each extraction step.
- Serve `src/` locally and browser-check all six interactive pages for load errors.
- Exercise representative workflows: create a transaction, filter/delete transactions, create/update a goal, save a profile, and load dashboard/reports.

## Out of Scope

- Fixing existing business-logic bugs.
- Changing transaction value parsing.
- Introducing a framework, bundler, or backend.
- Redesigning HTML or CSS.
