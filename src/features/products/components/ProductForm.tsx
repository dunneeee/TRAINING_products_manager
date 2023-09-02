import { useEffect } from 'react';

import { ProductTypes } from '@/types';
import { useFormValidator } from '@/hooks';
import { FieldInput, FieldSelect } from '@/components';

import { validateFormRules } from '../helppers';

type ProdcutFormProps = React.HTMLAttributes<HTMLFormElement> & {
  product?: ProductTypes.Instance;
  onSubmitProduct?: (product: Omit<ProductTypes.Instance, 'id'>) => void;
};

export const ProductForm = ({
  product,
  onSubmitProduct,
  ...formProps
}: ProdcutFormProps) => {
  const {
    getInputProps,
    getSetFieldFunc,
    setFieldValues,
    getFormValidationResult,
  } = useFormValidator(validateFormRules);

  useEffect(() => {
    if (product) {
      setFieldValues({
        image: product.image,
        name: product.name,
        brand: product.brand.name,
        brandImage: product.brand.image,
        quantity: product.quantity,
        price: product.price,
        status: product.status,
        type: product.type,
      });
    } else {
      setFieldValues({
        status: 'available',
        type: 'shoes',
      });
    }
  }, [product, setFieldValues]);

  return (
    <form
      {...formProps}
      onSubmit={(e) => {
        e.preventDefault();
        const validationResult = getFormValidationResult();
        const value = validationResult.fields;
        validationResult.isValid &&
          onSubmitProduct &&
          onSubmitProduct({
            image: value.image,
            name: value.name,
            brand: {
              name: value.brand,
              image: value.brandImage,
            },
            quantity: value.quantity,
            price: value.price,
            status: value.status as ProductTypes.Instance['status'],
            type: value.type,
          });
      }}
    >
      <ul className="flex flex-wrap">
        <li className="w-full">
          <FieldInput
            label="Image"
            placeholder="Enter image url..."
            {...getInputProps('image')}
          />
        </li>
        <li className="w-full">
          <FieldInput
            label="Name"
            placeholder="Enter name..."
            {...getInputProps('name')}
          />
        </li>
        <li className="w-full">
          <FieldInput
            label="Quantity"
            placeholder="0"
            {...getInputProps('quantity')}
          />
        </li>
        <li className="w-full">
          <FieldInput
            label="Price"
            placeholder="0"
            {...getInputProps('price')}
          />
        </li>
        <li className="w-1/2 pr-2">
          <FieldSelect
            label="Status"
            error={getInputProps('status').error}
            value={getInputProps('status').value}
            onChange={(e) => getSetFieldFunc('status')(e.target.value)}
          >
            <option value="available">Available</option>
            <option value="sold_out">Sold Out</option>
          </FieldSelect>
        </li>
        <li className="w-1/2 pl-2">
          <FieldSelect
            label="Type"
            error={getInputProps('type').error}
            value={getInputProps('type').value}
            onChange={(e) => getSetFieldFunc('type')(e.target.value)}
          >
            <option value="shoes">Shoes</option>
            <option value="clothes">Clothes</option>
            <option value="accessories">Accessories</option>
            <option value="ring">Ring</option>
          </FieldSelect>
        </li>
        <li className="w-1/2 pr-2">
          <FieldInput
            label="Brand"
            placeholder="Enter Brand..."
            {...getInputProps('brand')}
          />
        </li>
        <li className="w-1/2 pl-2">
          <FieldInput
            label="Brand Image"
            placeholder="Enter Brand Image Url..."
            {...getInputProps('brandImage')}
          />
        </li>
      </ul>
    </form>
  );
};
