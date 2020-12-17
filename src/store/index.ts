import { readonly, ref } from 'vue';

export const createStore = <T>(key: string) => {
  const stored = localStorage.getItem(key);
  const state = ref(stored ? JSON.parse(stored) : undefined);
  const setState = (val: T) => {
    state.value = val;
    localStorage.setItem(key, JSON.stringify(val));
  };
  return { state: readonly(state), setState };
};
