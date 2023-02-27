/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

const refreshTokens = async () => {
  const rToken = window.localStorage.getItem('r-token');

  const { data } = await axios<{ accessToken: string, refreshToken: string }>({
    method: 'POST',
    url: 'http://localhost:3001/auth/refresh',
    headers: {
      Authorization: `Bearer ${rToken}`,
    },
  });

  window.localStorage.setItem('a-token', data.accessToken);
  window.localStorage.setItem('r-token', data.refreshToken);

  return data;
};

instance.interceptors.request.use((config) => {
  const aToken = window.localStorage.getItem('a-token');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = aToken ? `Bearer ${aToken}` : '';

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (error.response) {
      if (error.response.status === 401 && !config._retry) {
        config._retry = true;

        const { accessToken } = await refreshTokens();
        config.headers.Authorization = `Bearer ${accessToken}`;

        return instance(config);
      }
    }

    throw error;
  },
);

export default instance;
