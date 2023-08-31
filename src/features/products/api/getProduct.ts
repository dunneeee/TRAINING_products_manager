import { api } from '@/api';
import { ProductTypes } from '@/types';

export const getProduct = (id: string | number) =>
  api.get<ProductTypes.Instance>(`/products/${id}`).then((res) => res.data);
