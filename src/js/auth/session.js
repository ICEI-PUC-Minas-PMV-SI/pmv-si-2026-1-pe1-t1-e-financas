import { readJson, writeJson } from "../core/storage.js";
import { findUserById } from "./account-repository.js";

const SESSION_KEY = "efinancas:session";

export function createSession(storage, userId) {
  writeJson(storage, SESSION_KEY, { userId });
}

export function getActiveUser(storage) {
  const session = readJson(storage, SESSION_KEY);

  return session?.userId ? findUserById(storage, session.userId) : null;
}

export function clearSession(storage) {
  storage.removeItem(SESSION_KEY);
}
