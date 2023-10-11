export type TUser = {
  user_metadata: {
    role: string
  }
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  categoryIds: string[];
  images: string[];
  price: number;
  isFavorite: boolean;
};
