import { readonly, Ref, ref } from 'vue';

export const createDefinitePersistedStore = <T>(
  key: string,
  defaultValue: T,
) => {
  const state = ref(defaultValue) as Ref<T>;

  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      state.value = JSON.parse(stored) as T;
    } catch (err) {
      localStorage.removeItem(key);
    }
  }
  const setState = (val: T) => {
    state.value = val;
    localStorage.setItem(key, JSON.stringify(val));
  };
  const deleteState = () => {
    state.value = defaultValue;
    delete localStorage[key];
  };
  return { state: readonly(state), setState, deleteState };
};

export const createPersistedStore = <T>(key: string) =>
  createDefinitePersistedStore<T | undefined>(key, undefined);
