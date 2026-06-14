import { clearSession, getActiveUser } from "./session.js";

export function requireUser({
  storage = localStorage,
  location = window.location
} = {}) {
  const user = getActiveUser(storage);

  if (!user) {
    location.assign("index.html");
    return null;
  }

  return user;
}

export function redirectAuthenticatedUser({
  storage = localStorage,
  location = window.location
} = {}) {
  if (!getActiveUser(storage)) return false;

  location.assign("dashboard.html");
  return true;
}

export function logout({
  storage = localStorage,
  location = window.location
} = {}) {
  clearSession(storage);
  location.assign("index.html");
}
