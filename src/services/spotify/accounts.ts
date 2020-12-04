import type {} from 'vite';

import axios from 'axios';
import { nanoid } from 'nanoid';

import { AccessToken, RedirectQueryParams } from '../../models/spotify/auth';
import * as env from './constants';
import { sha256, b64urlsafe } from '../../utils';

const ACCOUNTS_HOST = 'https://accounts.spotify.com/';
const ACCOUNTS_BASE_URL = ACCOUNTS_HOST + 'api/';

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
    client_id: env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: env.SPOTIFY_REDIRECT_URI,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    state: state,
    scope: env.SPOTIFY_SCOPE,
  });
  return ACCOUNTS_HOST + 'authorize?' + params;
};

export const getAccessToken = async (code: string, codeVerifier: string) => {
  const body = new URLSearchParams({
    client_id: env.SPOTIFY_CLIENT_ID,
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: env.SPOTIFY_REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  const response = await accounts.post('token', body);
  return response.data;
};

export const getParams = (url: URL): RedirectQueryParams => {
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  return { code, state, error };
};

export const saveAccessToken = (result: AccessToken) =>
  localStorage.setItem('spotifyAuth', JSON.stringify(result));

export const loadAccessToken = (): AccessToken =>
  JSON.parse(localStorage.getItem('spotifyAuth'));

export const authenticate = async (params: RedirectQueryParams) => {
  const { code, state, error } = params;
  const codeVerifier = localStorage.getItem('spotifyCodeVerifier');
  const savedState = localStorage.getItem('spotifyState');

  if (error || state !== savedState) {
    return false;
  }

  const result = await getAccessToken(code, codeVerifier);
  saveAccessToken(result);
  return true;
};

export const accounts = axios.create({
  baseURL: ACCOUNTS_BASE_URL,
});

export default accounts;
