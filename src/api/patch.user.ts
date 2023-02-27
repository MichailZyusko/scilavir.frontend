import axios from '@/api/axios';

export const patchUser = async ({ id, ...user }: any) => {
  const { data } = await axios({
    method: 'PATCH',
    url: `/users/${id}`,
    data: user,
  });

  return data;
};
