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
  parentId?: string;
  description?: string;
  minPrice?: number | null;
  subCategories: TCategory[];
};

export type TGroup = {
  id: string;
  name: string;
  minPrice: number | null;
  image: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  count: number;
};
