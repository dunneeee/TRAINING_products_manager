import { useEffect, useState } from 'react';

import { ProductTypes } from '@/types';

const useSearch = () => {
  const [originalData, setOriginalData] = useState<ProductTypes.Instance[]>([]);
  const [data, setData] = useState(originalData);
  const [keywords, setKeywords] = useState<ProductTypes.Searchs>({
    name: '',
    type: '',
    brand: '',
    status: '',
    price: '',
  });

  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setKeywords((prev) => ({ ...prev, [name]: value }));
  };

  const getInputProps = (name: keyof ProductTypes.Searchs) => ({
    name,
    value: keywords[name],
    onChange: handleSearchChange,
  });

  const handleSearch = () => {
    const filteredData = originalData.filter((product) => {
      const { name, type, brand, status, price } = keywords;
      const isNameMatched = product.name
        .toLowerCase()
        .includes(name.toLowerCase());
      const isTypeMatched = product.type
        .toLowerCase()
        .includes(type.toLowerCase());
      const isBrandMatched = product.brand.name
        .toLowerCase()
        .includes(brand.toLowerCase());
      const isStatusMatched =
        status.toLowerCase() === 'all'
          ? true
          : product.status.toLowerCase().includes(status.toLowerCase());

      const isPriceMatched = product.price
        .toString()
        .includes(price.toLowerCase());

      return (
        isNameMatched &&
        isTypeMatched &&
        isBrandMatched &&
        isStatusMatched &&
        isPriceMatched
      );
    });

    return filteredData;
  };

  useEffect(() => {
    if (originalData.length === 0) return;
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      setData(handleSearch());
    }, 500);

    setTimer(newTimer);

    return () => {
      clearTimeout(newTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, originalData]);

  return {
    data,
    getInputProps,
    handleSearch,
    setOriginalData,
    setData,
  };
};

export default useSearch;
