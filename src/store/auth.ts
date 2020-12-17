import { readonly, ref, watch } from 'vue';
import { createStore } from '.';
import { AccessToken } from '../models/spotify/accounts';

export const {
  state: accessToken,
  setState: setAccessToken,
  deleteState: deleteAccessToken,
} = createStore<AccessToken>('spotifyAuth');

export const {
  state: codeVerifier,
  setState: setCodeVerifier,
} = createStore<string>('spotifyCodeVerifier');

export const { state: state, setState: setState } = createStore<string>(
  'spotifyState',
);

const _loggedIn = ref(!!accessToken.value);
watch(accessToken, (val) => (_loggedIn.value = !!val));
export const loggedIn = readonly(_loggedIn);
