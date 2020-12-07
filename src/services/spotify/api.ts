import axios from 'axios';

import { loadAccessToken, refreshAccessToken, saveAccessToken } from './accounts';
import { PrivateUser } from '../../models/spotify/api';

export const getUserInfo = async (): Promise<PrivateUser> => {
  const response = await api.get('me');
  return await response.data;
};

const api = axios.create({
    baseURL: 'https://api.spotify.com/v1/',
    headers: {
      Authorization: `Bearer ${loadAccessToken().access_token}`,
    }
});

api.interceptors.response.use(
  response => (response),
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.response.data.error.message == "The access token expired" && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const auth = loadAccessToken();
      const newAccessToken = await refreshAccessToken(auth.refresh_token);
      saveAccessToken(newAccessToken);

      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken.access_token}`
      return api(originalRequest);
    }
    return Promise.reject(error);
})

export default api;
