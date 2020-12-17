import { readonly, ref } from 'vue';
import { createStore } from '.';
import { AccessToken } from '../models/spotify/auth';

export const {
  state: accessToken,
  setState: setAccessToken,
} = createStore<AccessToken>('spotifyAuth');

export const {
  state: codeVerifier,
  setState: setCodeVerifier,
} = createStore<String>('spotifyCodeVerifier');

export const { state: state, setState: setState } = createStore<String>(
  'spotifyState',
);
