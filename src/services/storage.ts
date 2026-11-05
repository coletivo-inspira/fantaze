/** Acesso seguro ao localStorage (falha silenciosa em modo privado/SSR). */
export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignora: o site continua funcionando sem persistência */
  }
}

export const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
