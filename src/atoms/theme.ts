import { atom, AtomEffect } from 'recoil';

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    // Get initial value from localStorage
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      try {
        setSelf(JSON.parse(savedValue));
      } catch (error) {
        console.warn(
          `Failed to parse localStorage value for key "${key}":`,
          error
        );
      }
    }

    // Subscribe to state changes and update localStorage
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        try {
          localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
          console.error(
            `Failed to save to localStorage for key "${key}":`,
            error
          );
        }
      }
    });
  };

export const themeAtom = atom<boolean>({
  key: 'theme',
  default: false,
  effects: [localStorageEffect<boolean>('theme')]
});
