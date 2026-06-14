import { readJson, writeJson } from "./storage.js";

export function userStorageKey(userId, logicalKey) {
  return `efinancas:user:${userId}:${logicalKey}`;
}

export function createUserStorage(storage, userId) {
  const resolveKey = logicalKey => userStorageKey(userId, logicalKey);

  return {
    getItem(logicalKey) {
      return storage.getItem(resolveKey(logicalKey));
    },
    setItem(logicalKey, value) {
      storage.setItem(resolveKey(logicalKey), value);
    },
    removeItem(logicalKey) {
      storage.removeItem(resolveKey(logicalKey));
    },
    read(logicalKey, fallback = null) {
      return readJson(storage, resolveKey(logicalKey), fallback);
    },
    write(logicalKey, value) {
      writeJson(storage, resolveKey(logicalKey), value);
    },
    remove(logicalKey) {
      storage.removeItem(resolveKey(logicalKey));
    }
  };
}
