import {
  findUserByEmail,
  saveUser
} from "./account-repository.js";
import {
  createSalt,
  hashPassword,
  normalizeEmail
} from "./password.js";
import { createSession } from "./session.js";
import { writeJson } from "../core/storage.js";

const INVALID_CREDENTIALS = "E-mail ou senha inválidos.";

export async function signup({
  storage,
  nome,
  email,
  password,
  passwordConfirmation,
  cryptoApi = globalThis.crypto
}) {
  const normalizedName = nome.trim();
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedName || !normalizedEmail) {
    return { ok: false, message: "Preencha nome e e-mail." };
  }

  if (password.length < 8) {
    return { ok: false, message: "A senha deve ter pelo menos 8 caracteres." };
  }

  if (password !== passwordConfirmation) {
    return { ok: false, message: "As senhas não coincidem." };
  }

  if (findUserByEmail(storage, normalizedEmail)) {
    return { ok: false, message: "E-mail já cadastrado." };
  }

  const passwordSalt = createSalt(cryptoApi);
  const user = saveUser(storage, {
    id: cryptoApi.randomUUID(),
    nome: normalizedName,
    email: normalizedEmail,
    passwordSalt,
    passwordHash: await hashPassword(password, passwordSalt, cryptoApi),
    createdAt: new Date().toISOString()
  });

  writeJson(storage, `efinancas:user:${user.id}:perfilUsuario`, {
    nome: user.nome,
    email: user.email,
    telefone: ""
  });
  createSession(storage, user.id);

  return { ok: true, user };
}

export async function login({
  storage,
  email,
  password,
  cryptoApi = globalThis.crypto
}) {
  const user = findUserByEmail(storage, email);

  if (!user) {
    return { ok: false, message: INVALID_CREDENTIALS };
  }

  const passwordHash = await hashPassword(password, user.passwordSalt, cryptoApi);

  if (passwordHash !== user.passwordHash) {
    return { ok: false, message: INVALID_CREDENTIALS };
  }

  createSession(storage, user.id);

  return { ok: true, user };
}
