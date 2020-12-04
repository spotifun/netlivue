import axios from 'axios';

import { loadAccessToken } from './accounts';
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

export default api;
