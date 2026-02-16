function key(uid) {
  return `favorite-nannies:${uid}`;
}

export function getFavorites(uid) {
  if (!uid) return [];
  try {
    return JSON.parse(localStorage.getItem(key(uid))) || [];
  } catch {
    return [];
  }
}

export function isFavorite(uid, name) {
  if (!uid || !name) return false;
  return getFavorites(uid).some((n) => n?.name === name);
}

export function toggleFavorite(uid, nanny) {
  if (!uid || !nanny) return [];

  const favorites = getFavorites(uid);
  const exists = favorites.some((n) => n?.name === nanny?.name);

  const updated = exists
    ? favorites.filter((n) => n?.name !== nanny?.name)
    : [...favorites, nanny];

  try {
    localStorage.setItem(key(uid), JSON.stringify(updated));
    window.dispatchEvent(new Event("favorites-changed"));
  } catch {}

  return updated;
}
