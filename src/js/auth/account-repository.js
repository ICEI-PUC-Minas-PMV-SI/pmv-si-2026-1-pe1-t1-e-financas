import { readJson, writeJson } from "../core/storage.js";
import { normalizeEmail } from "./password.js";

const USERS_KEY = "efinancas:users";

export function listUsers(storage) {
  return readJson(storage, USERS_KEY, []) || [];
}

export function findUserByEmail(storage, email) {
  const normalizedEmail = normalizeEmail(email);

  return listUsers(storage).find(user => user.email === normalizedEmail) || null;
}

export function findUserById(storage, userId) {
  return listUsers(storage).find(user => user.id === userId) || null;
}

export function saveUser(storage, user) {
  const users = listUsers(storage);
  const normalizedEmail = normalizeEmail(user.email);
  const duplicate = users.some(
    savedUser =>
      savedUser.id !== user.id &&
      normalizeEmail(savedUser.email) === normalizedEmail
  );

  if (duplicate) {
    throw new Error("E-mail já cadastrado.");
  }

  const normalizedUser = { ...user, email: normalizedEmail };
  const existingIndex = users.findIndex(savedUser => savedUser.id === user.id);

  if (existingIndex >= 0) {
    users[existingIndex] = normalizedUser;
  } else {
    users.push(normalizedUser);
  }

  writeJson(storage, USERS_KEY, users);

  return normalizedUser;
}
