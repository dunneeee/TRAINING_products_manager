import { api } from '@/api';
import { useApi } from '@/hooks';
import { ProductTypes } from '@/types';

export const createProduct = (product: Omit<ProductTypes.Instance, 'id'>) =>
  api.post<ProductTypes.Instance>(`/products`, {
    ...product,
    price: Number(product.price),
  });

export const useCreateProduct = () => {
  const { execute, data, isError, ...statuses } = useApi((product) =>
    createProduct(product as Omit<ProductTypes.Instance, 'id'>).then(
      (res) => res.data
    )
  );

  return {
    createProduct: execute,
    newProduct: data || null,
    isCreatedProductError: isError,
    ...statuses,
  };
};
