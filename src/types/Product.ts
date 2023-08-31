export type Brand = {
  name: string;
  image: string;
};

export type Instance = {
  id: number;
  image: string;
  name: string;
  status: 'available' | 'sold_out';
  type: string;
  quantity: number;
  brand: Brand;
  price: number;
};

export type ProductWithoutId = Omit<Instance, 'id'>;

export type Searchs = {
  name: string;
  type: string;
  brand: string;
  status: string;
  price: string;
};
