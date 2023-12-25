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
  quantity?: number;
  isFavorite?: boolean;
};

export type TCategory = {
  id: string;
  name: string;
  image: string;
  description?: string;
  subCategories: TCategory[];
};

export type PaginatedResponse<T> = {
  data: T[];
  count: number;
};
