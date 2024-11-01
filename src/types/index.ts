export type User = {
  id: string;
  passwordEnabled: boolean;
  totpEnabled: boolean;
  backupCodeEnabled: boolean;
  twoFactorEnabled: boolean;
  banned: boolean;
  locked: boolean;
  createdAt: number;
  updatedAt: number;
  imageUrl: string;
  hasImage: boolean;
  primaryEmailAddressId: string | null;
  primaryPhoneNumberId: string | null;
  primaryWeb3WalletId: string | null;
  lastSignInAt: number | null;
  externalId: string | null;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  publicMetadata: UserPublicMetadata;
  privateMetadata: UserPrivateMetadata;
  unsafeMetadata: UserUnsafeMetadata;
  emailAddresses: {
    id: string;
    emailAddress: string;
  }[];
  phoneNumbers: {
    id: string;
    phoneNumber: string;
    reservedForSecondFactor: boolean;
    defaultSecondFactor: boolean;
  }[];
  lastActiveAt: number | null;
  createOrganizationEnabled: boolean;
  createOrganizationsLimit: number | null;
  deleteSelfEnabled: boolean;
  legalAcceptedAt: number | null;
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
