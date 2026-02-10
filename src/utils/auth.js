const KEY = "nanny-auth";

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return Boolean(getUser());
}

export function logout() {
  localStorage.removeItem(KEY);
}
