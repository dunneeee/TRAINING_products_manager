import {
  AvatarText,
  Button,
  DropDown,
  FieldInput,
  FieldSelect,
  Product,
  Table,
} from '@/components';
import clsx from 'clsx';
import { Icons } from '@/constants';
import { ProductTypes } from '@/types';
import { useSearch, useSortProduct } from '../hooks';
import { useEffect } from 'react';

type ProoductsTableProps = React.HTMLAttributes<HTMLDivElement> & {
  onEditProduct?: (product: ProductTypes.Instance) => void;
  onDeleteProduct?: (product: ProductTypes.Instance) => void;
  products?: ProductTypes.Instance[];
  isLoading?: boolean;
};
export const ProductsTable = ({
  className,
  onEditProduct,
  onDeleteProduct,
  products = [],
  ...tableProps
}: ProoductsTableProps) => {
  const {
    getInputProps,
    data: innerProducts,
    setOriginalData,
    setData,
  } = useSearch();
  const { changeSortField, toggleSort, sortProducts } = useSortProduct();

  useEffect(() => {
    if (products.length > 0) {
      setOriginalData(products);
    }
  }, [products, setOriginalData]);

  const handleSortClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.name as keyof ProductTypes.Instance;
    changeSortField(key);
    toggleSort();
    setData(sortProducts(innerProducts));
  };

  return (
    <Table className={clsx('overflow-y-auto', className)} {...tableProps}>
      <Table.Head>
        <Table.Row className="border-b border-b-gray-300">
          <Table.HeadCell>
            <DropDown className="w-full" label="PRODUCT" variant="ghost">
              <div className="px-2">
                <FieldInput
                  placeholder="Search..."
                  className="mx-2"
                  {...getInputProps('name')}
                />
              </div>
            </DropDown>
          </Table.HeadCell>
          <Table.HeadCell>
            <DropDown className="w-full" label="STATUS" variant="ghost">
              <div className="px-2">
                <FieldSelect {...getInputProps('status')}>
                  <option value="all">All</option>
                  <option value="available">Available</option>
                  <option value="sold_out">Sold Out</option>
                </FieldSelect>
              </div>
            </DropDown>
          </Table.HeadCell>
          <Table.HeadCell>
            <DropDown className="w-full" label="TYPES" variant="ghost">
              <div className="px-2">
                <FieldInput
                  placeholder="Search..."
                  className="mx-2"
                  {...getInputProps('type')}
                />
              </div>
              <div className="w-28"></div>
            </DropDown>
          </Table.HeadCell>
          <Table.HeadCell>
            <Button
              variant="ghost"
              className="w-full uppercase"
              onClick={handleSortClick}
              name="quantity"
            >
              Quantity
            </Button>
          </Table.HeadCell>
          <Table.HeadCell>
            <DropDown className="w-full" label="BRAND" variant="ghost">
              <div className="px-2">
                <FieldInput
                  placeholder="Search..."
                  className="mx-2"
                  {...getInputProps('brand')}
                />
              </div>
            </DropDown>
          </Table.HeadCell>
          <Table.HeadCell>
            <Button
              variant="ghost"
              className="w-full uppercase"
              onClick={handleSortClick}
              name="price"
            >
              Price
            </Button>
          </Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {innerProducts.map((product) => (
          <Table.Row key={product.id} className="border-b">
            <Table.Cell>
              <Product
                href={'/detail/' + product.id}
                image={product.image}
                name={product.name}
              />
            </Table.Cell>
            <Table.Cell>
              <Product.Status status={product.status} />
            </Table.Cell>
            <Table.Cell>
              <Product.Type>{product.type}</Product.Type>
            </Table.Cell>
            <Table.Cell>
              <Product.Quantity>{product.quantity}</Product.Quantity>
            </Table.Cell>
            <Table.Cell>
              <AvatarText src={product.brand.image} text={product.brand.name} />
            </Table.Cell>
            <Table.Cell>
              <Product.Price price={product.price} />
            </Table.Cell>
            <Table.Cell>
              <DropDown
                label={<Icons.More />}
                className="w-full"
                position="leftCenter"
                variant="ghost"
                buttonClasses="block flex justify-center"
              >
                <DropDown.Item
                  className=""
                  onClick={() => onEditProduct && onEditProduct(product)}
                >
                  Edit
                </DropDown.Item>
                <DropDown.Item
                  className="text-red"
                  onClick={() => onDeleteProduct && onDeleteProduct(product)}
                >
                  Delete
                </DropDown.Item>
              </DropDown>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
