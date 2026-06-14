export function readJson(storage, key, fallback = null) {
  const storedValue = storage.getItem(key);

  return storedValue === null ? fallback : JSON.parse(storedValue);
}

export function writeJson(storage, key, value) {
  storage.setItem(key, JSON.stringify(value));
}
