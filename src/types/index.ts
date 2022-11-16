export type Products = {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type Cart = Products & { quantity: number };

export type User = {
  username: string;
  password: string;
};

export type UserResponse = {
  token: string | null;
};
