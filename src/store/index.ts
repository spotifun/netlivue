import { readonly, ref } from 'vue';

export const createStore = <T>(key: string) => {
  const state = ref<T>();
  const stored = localStorage.getItem(key);
  if (stored) {
    state.value = JSON.parse(stored) as T;
  }
  const setState = (val: T) => {
    state.value = val;
    localStorage.setItem(key, JSON.stringify(val));
  };
  const deleteState = () => {
    state.value = undefined;
    delete localStorage[key];
  };
  return { state: readonly(state), setState, deleteState };
};
