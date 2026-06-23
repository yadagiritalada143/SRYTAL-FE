import { atom, AtomEffect } from 'recoil';

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch {
        /* ignore malformed value */
      }
    }
    onSet((newValue, _, isReset) => {
      if (isReset) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

// Desktop-only: whether the persistent sidebar is collapsed (hidden). Persisted
// so the user's choice survives reloads. Mobile uses its own drawer state.
export const sidebarCollapsedAtom = atom<boolean>({
  key: 'sidebarCollapsed',
  default: false,
  effects: [localStorageEffect<boolean>('sidebarCollapsed')]
});
