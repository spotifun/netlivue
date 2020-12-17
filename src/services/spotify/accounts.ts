import type {} from 'vite';

import axios from 'axios';
import { nanoid } from 'nanoid';

import { AccessToken, RedirectQueryParams } from '../../models/spotify/auth';
import * as env from './constants';
import { sha256, b64urlsafe } from '../../utils';
import {
  codeVerifier,
  setAccessToken,
  setCodeVerifier,
  setState,
  state as authState,
} from '../../store/auth';

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

  setCodeVerifier(codeVerifier);
  setState(state);

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
  return env.ACCOUNTS_AUTHORIZE_URL + params;
};

export const requestAccessToken = async (
  code: string,
  codeVerifier: string,
): Promise<AccessToken> => {
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

export const refreshAccessToken = async (
  refreshToken: string,
): Promise<AccessToken> => {
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
    client_id: env.SPOTIFY_CLIENT_ID,
  });

  const response = await accounts.post('token', body);
  return response.data;
};

export const getParams = (url: URL): RedirectQueryParams => {
  const code = url.searchParams.get('code') || undefined;
  const state = url.searchParams.get('state') || undefined;
  const error = url.searchParams.get('error') || undefined;
  return { code, state, error };
};

export const authenticate = async (params: RedirectQueryParams) => {
  const { code, state, error } = params;
  const savedCodeVerifier = codeVerifier.value;
  const savedState = authState.value;

  if (error || state !== savedState || !code) {
    return false;
  }

  const result = await requestAccessToken(code, savedCodeVerifier);
  setAccessToken(result);
  return true;
};

export const accounts = axios.create({
  baseURL: env.ACCOUNTS_BASE_URL,
});
