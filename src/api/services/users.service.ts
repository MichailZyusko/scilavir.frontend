import axios from '../axios';

export const UserService = {
  self: async () => {
    const { data } = await axios({
      method: 'GET',
      url: '/users/self',
    });

    return data;
  },

  patch: async ({ id, ...user }: any) => {
    const { data } = await axios({
      method: 'PATCH',
      url: `/users/${id}`,
      data: user,
    });

    return data;
  },
};
