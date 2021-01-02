import { createDefinitePersistedStore } from '.';

export const {
  state: dark,
  setState: setDark,
} = createDefinitePersistedStore<boolean>(
  'dark',
  window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches,
);
