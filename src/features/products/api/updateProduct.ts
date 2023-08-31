import { api } from '@/api';
import { useApi } from '@/hooks';
import { ProductTypes } from '@/types';

export const updateProduct = (product: ProductTypes.Instance) =>
  api.put<ProductTypes.Instance>(`/products/${product.id}`, {
    ...product,
    price: Number(product.price),
  });

export const useUpdateProduct = () => {
  const { data, isError, isPeading, execute, ...statuses } = useApi((product) =>
    updateProduct(product as ProductTypes.Instance).then((res) => res.data)
  );

  return {
    updateProduct: execute,
    updatedProduct: data || null,
    isUpdatedProductError: isError,
    isUpdatedProductPeading: isPeading,
    ...statuses,
  };
};
