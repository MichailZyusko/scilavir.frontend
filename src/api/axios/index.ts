/* eslint-disable no-underscore-dangle */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

const refreshTokens = async () => {
  const rToken = window.localStorage.getItem('r-token');

  const { data } = await axios<{ accessToken: string, refreshToken: string }>({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh`,
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
  config.headers.Authorization = aToken ? `Bearer ${aToken}` : undefined;

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
