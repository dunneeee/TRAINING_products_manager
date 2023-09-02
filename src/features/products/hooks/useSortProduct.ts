import { useState } from 'react';

import { ProductTypes } from '@/types';

type Sort = 'asc' | 'desc';

const useSortProduct = (
  initialField: {
    field: keyof ProductTypes.Instance;
    sort: Sort;
  } = {
    field: 'quantity',
    sort: 'asc',
  }
) => {
  const [fields, setFields] = useState(initialField);

  const toggleSort = () => {
    setFields((prev) => ({
      field: prev.field,
      sort: prev.sort === 'asc' ? 'desc' : 'asc',
    }));
  };

  const changeSortField = (field: keyof ProductTypes.Instance) => {
    setFields((prev) => ({
      field,
      sort: prev.field === field ? prev.sort : 'asc',
    }));
  };

  const sortProducts = (products: ProductTypes.Instance[]) => {
    return products.sort((a, b) => {
      const fieldA = Number(a[fields.field]);
      const fieldB = Number(b[fields.field]);

      if (fields.sort === 'asc') {
        if (fieldA < fieldB) return -1;
        if (fieldA > fieldB) return 1;
        return 0;
      }
      if (fieldA > fieldB) return -1;
      if (fieldA < fieldB) return 1;
      return 0;
    });
  };

  return {
    fields,
    toggleSort,
    sortProducts,
    changeSortField,
  };
};

export default useSortProduct;
