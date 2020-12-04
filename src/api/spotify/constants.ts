const env = import.meta.env;

export const SPOTIFY_CLIENT_ID = env.VITE_SPOTIFY_CLIENT_ID as string;
export const SPOTIFY_REDIRECT_URI = env.VITE_SPOTIFY_REDIRECT_URI as string;
export const SPOTIFY_SCOPE = env.VITE_SPOTIFY_SCOPE as string;
