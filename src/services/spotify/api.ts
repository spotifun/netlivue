import axios from 'axios';

import { loadAccessToken, refreshAccessToken, saveAccessToken } from './accounts';
import { PrivateUser } from '../../models/spotify/api';

export const getUserInfo = async (): Promise<PrivateUser> => {
  const auth = loadAccessToken();
  const response = await api.get('me', {
    headers: {
      Authorization: `Bearer ${auth.access_token}`,
    },
  });

  return await response.data;
};

const api = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
});

api.interceptors.response.use(
  response => (response),
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.message == "The access token expired" && !originalRequest._retry) {
      originalRequest._retry = true;
      const auth = loadAccessToken();
      const newAccessToken = await refreshAccessToken(auth.refresh_token);
      saveAccessToken(newAccessToken);
      return api(originalRequest);
    }
    return Promise.reject(error);
})

export default api;
