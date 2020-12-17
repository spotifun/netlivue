import axios from 'axios';

import { refreshAccessToken } from './accounts';
import { PrivateUser } from '../../models/spotify/api';
import { accessToken, setAccessToken } from '../../store/auth';
import { API_BASE_URL } from '../../constants';

export const getUserInfo = async (): Promise<PrivateUser> => {
  const response = await api.get('me');
  return await response.data;
};

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    if (accessToken.value) {
      const token = accessToken.value.access_token;
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.error.message == 'The access token expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!accessToken.value) {
        return Promise.reject(error);
      }

      const refreshToken = accessToken.value.refresh_token;
      const newAccessToken = await refreshAccessToken(refreshToken);
      setAccessToken(newAccessToken);
      const token = newAccessToken.access_token;

      originalRequest.headers['Authorization'] = `Bearer ${token}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);
