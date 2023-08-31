import { api } from '@/api';
import { useApi } from '@/hooks';
import { ProductTypes } from '@/types';

export const getProducts = () =>
  api
    .get<ProductTypes.Instance[]>('/products')
    .then((res) => res.data.reverse() || []);

export const useFeatchProducts = () => {
  const { data, error, isError, execute, ...statuses } = useApi(getProducts);
  return {
    products: data,
    isGetProductsError: isError,
    error: error ? 'Error fetching products! Please try again later.' : null,
    ...statuses,
    featchProducts: execute,
  };
};
