import { getHost } from '../../utils';

const env = import.meta.env;

export const SPOTIFY_CLIENT_ID = env.VITE_SPOTIFY_CLIENT_ID as string;
export const SPOTIFY_SCOPE = env.VITE_SPOTIFY_SCOPE as string;
export const SPOTIFY_REDIRECT_URI = getHost() + '/auth';
