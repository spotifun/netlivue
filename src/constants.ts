import { getHost } from './utils';

const env = import.meta.env;

export const SPOTIFY_CLIENT_ID = env.VITE_SPOTIFY_CLIENT_ID as string;
export const SPOTIFY_SCOPE = env.VITE_SPOTIFY_SCOPE as string;
export const SPOTIFY_REDIRECT_URI = getHost() + '/auth';
export const ACCOUNTS_HOST = 'https://accounts.spotify.com/';
export const ACCOUNTS_BASE_URL = ACCOUNTS_HOST + 'api/';
export const ACCOUNTS_AUTHORIZE_URL = ACCOUNTS_HOST + 'authorize?';
export const API_HOST = 'https://api.spotify.com/';
export const API_BASE_URL = API_HOST + 'v1/';
export const FUNIX_HOST = env.VITE_FUNIX_HOST as string;
export const FUNIX_BASE_URL = FUNIX_HOST + 'api/';
