const KEY = "favorite-nannies";

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function isFavorite(name) {
  return getFavorites().some((n) => n?.name === name);
}

export function toggleFavorite(nanny) {
  const favorites = getFavorites();
  const exists = favorites.some((n) => n?.name === nanny?.name);

  const updated = exists
    ? favorites.filter((n) => n?.name !== nanny?.name)
    : [...favorites, nanny];

  try {
    localStorage.setItem(KEY, JSON.stringify(updated));
  } catch {
  }

  return updated;
}
