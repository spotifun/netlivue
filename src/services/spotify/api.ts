import axios from 'axios';

import { refreshAccessToken } from './accounts';
import {
  PrivateUser,
  RecommendationRequest,
  RecommendationResponse,
} from '../../models/spotify/api';
import { accessToken, setAccessToken } from '../../store/auth';
import { API_BASE_URL } from '../../constants';

export const getUserInfo = async () => {
  const response = await api.get('me');
  return (await response.data) as PrivateUser;
};

export const getRecommendations = async (data: RecommendationRequest) => {
  const seeds = {
    seed_artists: data.seed_artists.join(','),
    seed_genres: data.seed_genres.join(','),
    seed_tracks: data.seed_tracks.join(','),
  };
  const response = await api.get('recommendations', {
    params: { ...data, ...seeds },
  });
  return (await response.data) as RecommendationResponse;
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
