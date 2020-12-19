import { readonly, ref, watch } from 'vue';
import { createPersistedStore } from '.';
import { AccessToken } from '../models/spotify/accounts';

export const {
  state: accessToken,
  setState: setAccessToken,
  deleteState: deleteAccessToken,
} = createPersistedStore<AccessToken>('spotifyAuth');

export const {
  state: codeVerifier,
  setState: setCodeVerifier,
} = createPersistedStore<string>('spotifyCodeVerifier');

export const {
  state: state,
  setState: setState,
} = createPersistedStore<string>('spotifyState');

const _loggedIn = ref(!!accessToken.value);
watch(accessToken, (val) => (_loggedIn.value = !!val));
export const loggedIn = readonly(_loggedIn);
