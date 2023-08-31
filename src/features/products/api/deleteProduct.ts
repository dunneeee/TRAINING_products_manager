import { api } from '@/api';
import { useApi } from '@/hooks';

export const deleteProduct = (id: number | string) =>
  api.delete(`/products/${id}`);

export const useDeleteProduct = () => {
  const { execute, data, isError, isPeading, ...statuses } = useApi((id) =>
    deleteProduct(id as number | string).then((res) => res.data)
  );
  return {
    deleteProduct: execute,
    deletedProduct: data || null,
    isDeletedProductError: isError,
    isDeletedProductPeading: isPeading,
    ...statuses,
  };
};
