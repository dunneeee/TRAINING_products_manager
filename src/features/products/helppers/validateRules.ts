import { ValidateRules } from '@/hooks';

export type ProductFormValues = {
  image: string;
  name: string;
  quantity: number;
  price: number;
  status: string;
  type: string;
  brand: string;
  brandImage: string;
};

export const validateFormRules: ValidateRules<ProductFormValues> = [
  {
    field: 'image',
    validate: (value) => {
      value = value + '';
      if (!value) return 'Image is required';
      const isUrlEndWithImage = /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|webp))$/g;

      const isUrl = isUrlEndWithImage.test(value);
      if (!isUrl) return 'Image must be a valid url';
      return null;
    },
  },
  {
    field: 'name',
    validate: (value) => {
      if (!value) return 'Name is required';
      return null;
    },
  },
  {
    field: 'quantity',
    validate: (value) => {
      value = value + '';
      if (!value) return 'Quantity is required';
      const isNumber = !isNaN(Number(value));
      if (!isNumber) return 'Quantity must be a number';
      if (Number(value) < 0) return 'Quantity must be greater than 0';
      return null;
    },
  },
  {
    field: 'price',
    validate: (value) => {
      value = value + '';
      if (!value) return 'Price is required';
      const isNumber = !isNaN(Number(value));
      if (!isNumber) return 'Price must be a number';
      if (Number(value) < 0) return 'Price must be greater than 0';
      return null;
    },
  },
  {
    field: 'status',
    validate: (value) => {
      value = value + '';
      if (!value) return 'Status is required';
      return null;
    },
  },
  {
    field: 'type',
    validate: (value) => {
      value = value + '';
      if (!value) return 'Type is required';
      return null;
    },
  },
  {
    field: 'brand',
    validate: (value) => {
      if (!value) return 'Brand is required';
      return null;
    },
  },
  {
    field: 'brandImage',
    validate: (value) => {
      value = value + '';
      if (!value) return 'Brand Image is required';
      const isUrlEndWithImage = /^(https?:\/\/.*\.(?:jpg|jpeg|png|gif|webp))$/g;
      const isUrl = isUrlEndWithImage.test(value);
      if (!isUrl) return 'Brand Image must be a valid url';
      return null;
    },
  },
];
