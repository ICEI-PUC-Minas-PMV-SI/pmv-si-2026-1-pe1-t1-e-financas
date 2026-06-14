import { createUserStorage } from "./user-storage.js";

const MIGRATION_OWNER_KEY = "efinancas:legacyMigrationOwner";
const FINANCIAL_KEYS = ["transacoes", "metas", "categorias"];

export function migrateLegacyData(storage, userId) {
  if (storage.getItem(MIGRATION_OWNER_KEY)) return false;

  const userStorage = createUserStorage(storage, userId);

  FINANCIAL_KEYS.forEach(key => {
    const legacyValue = storage.getItem(key);

    if (legacyValue !== null && userStorage.getItem(key) === null) {
      userStorage.setItem(key, legacyValue);
    }

    storage.removeItem(key);
  });

  storage.removeItem("perfilUsuario");
  storage.setItem(MIGRATION_OWNER_KEY, userId);

  return true;
}
