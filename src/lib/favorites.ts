const STORAGE_KEY = "free-traveler:favorites";

function readAll(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? new Set(parsed) : new Set();
  } catch {
    return new Set();
  }
}

function writeAll(ids: Set<string>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  window.dispatchEvent(new Event("free-traveler:favorites-change"));
}

export function subscribeFavorites(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("free-traveler:favorites-change", callback);
  return () =>
    window.removeEventListener("free-traveler:favorites-change", callback);
}

export function isFavorite(destinationId: string): boolean {
  return readAll().has(destinationId);
}

export function toggleFavorite(destinationId: string): boolean {
  const ids = readAll();
  const next = !ids.has(destinationId);
  if (next) {
    ids.add(destinationId);
  } else {
    ids.delete(destinationId);
  }
  writeAll(ids);
  return next;
}

export function listFavorites(): string[] {
  return Array.from(readAll());
}
