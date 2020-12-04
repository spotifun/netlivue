import type {} from 'vite';

import axios from 'axios';
import { nanoid } from 'nanoid';

import { sha256, b64urlsafe } from '../../utils';

const ACCOUNTS_BASE_URL = 'https://accounts.spotify.com/';

const env = import.meta.env;
const SPOTIFY_CLIENT_ID = env.VITE_SPOTIFY_CLIENT_ID as string;
const SPOTIFY_REDIRECT_URI = env.VITE_SPOTIFY_REDIRECT_URI as string;
const SPOTIFY_SCOPE = env.VITE_SPOTIFY_SCOPE as string;

export const genCodeVerifier = () => nanoid(64);

export const genState = () => nanoid(16);

export const genCodeChallenge = async (codeVerifier: string) => {
  const hash = await sha256(codeVerifier);
  return await b64urlsafe(hash);
};

export const genAuthURI = async () => {
  const codeVerifier = genCodeVerifier();
  const codeChallenge = await genCodeChallenge(codeVerifier);
  const state = genState();

  localStorage.setItem('spotifyCodeVerifier', codeVerifier);
  localStorage.setItem('spotifyState', state);

  return _authURI(codeChallenge, state);
};

export const _authURI = (codeChallenge: string, state: string) => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: SPOTIFY_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    state: state,
    scope: SPOTIFY_SCOPE,
  });
  return ACCOUNTS_BASE_URL + 'authorize?' + params;
};

export const accounts = axios.create({
  baseURL: ACCOUNTS_BASE_URL,
});

export default accounts;
