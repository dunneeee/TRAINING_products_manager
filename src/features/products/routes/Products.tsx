import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components';
import { ProductTypes } from '@/types';
import { useGlobalNotification, useToggle } from '@/hooks';

import { useUpdateProduct } from '../api/updateProduct';
import { ProductFormModal, ProductsTable } from '../components';
import { useCreateProduct, useDeleteProduct, useFeatchProducts } from '../api';

export const Products = () => {
  const { showNotification } = useGlobalNotification();
  const {
    isOpen: isProductFormOpen,
    open: openForm,
    close: closeForm,
  } = useToggle();

  const [productEdit, setProductEdit] = useState<
    ProductTypes.Instance | undefined
  >(undefined);

  const {
    products,
    setData: setProductData,
    featchProducts,
  } = useFeatchProducts();

  const { createProduct, isPeading: isCreateProductPeading } =
    useCreateProduct();

  const { isUpdatedProductPeading, updateProduct } = useUpdateProduct();

  const { deleteProduct } = useDeleteProduct();

  const isFormProcessing = isCreateProductPeading || isUpdatedProductPeading;

  const handleAddNewBtnClick = () => {
    setProductEdit(undefined);
    openForm();
  };

  const handleEditBtnClick = useCallback((product: ProductTypes.Instance) => {
    setProductEdit(product);
    openForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteProduct = useCallback((product: ProductTypes.Instance) => {
    showNotification({
      message: 'Are you sure you want to delete this product?',
      title: 'Delete product',
      type: 'error',
      isConfirm: true,
      onConfirm: async () => {
        const { data, error } = await deleteProduct(product.id);

        if (error)
          showNotification({
            message: 'Delete product failed!',
            title: 'Oops!',
            type: 'error',
          });
        else if (data) {
          setProductData((prev) => {
            if (prev) {
              return prev.filter((item) => item.id !== product.id);
            }
          });
          showNotification({
            message: 'Delete product successfully!',
            title: 'Success!',
            type: 'success',
          });
        }
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitEditProduct = useCallback(
    async (product: Omit<ProductTypes.Instance, 'id'>) => {
      const { data, error } = await updateProduct({
        ...product,
        id: productEdit?.id,
      });
      if (error)
        showNotification({
          message: 'Update product failed!',
          title: 'Oops!',
          type: 'error',
        });
      else if (data) {
        setProductData((prev) => {
          if (prev) {
            return prev.map((item) => {
              if (item.id === productEdit?.id) {
                return data;
              }
              return item;
            });
          }
        });
        showNotification({
          message: 'Update product successfully!',
          title: 'Success!',
          type: 'success',
        });
      }
      closeForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productEdit]
  );

  const handleSubmitCreateProduct = useCallback(
    async (product: Omit<ProductTypes.Instance, 'id'>) => {
      const { data, error } = await createProduct(product);
      if (error)
        showNotification({
          message: 'Create product failed!',
          title: 'Oops!',
          type: 'error',
        });
      else if (data) {
        setProductData((prev) => {
          if (prev) {
            return [data, ...prev];
          }
        });
        showNotification({
          message: 'Create product successfully!',
          title: 'Success!',
          type: 'success',
        });
      }
      closeForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmitForm = useMemo(
    () => (productEdit ? handleSubmitEditProduct : handleSubmitCreateProduct),
    [handleSubmitCreateProduct, handleSubmitEditProduct, productEdit]
  );

  useEffect(() => {
    featchProducts().then(({ data, error }) => {
      if (error) {
        showNotification({
          message: 'Featch products failed!',
          title: 'Oops!',
          type: 'error',
        });
      } else if (data) {
        setProductData(data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="wrapper">
      <ProductFormModal
        show={isProductFormOpen}
        isFormProcessing={isFormProcessing}
        onClose={closeForm}
        onSubmitProduct={handleSubmitForm}
        productEdit={productEdit}
      />
      <h1 className="my-10 text-6xl font-bold">Management</h1>
      <div className="flex">
        <Button
          className="ml-auto justify-self-end"
          variant="reverse"
          onClick={handleAddNewBtnClick}
        >
          Add New Product
        </Button>
      </div>
      <ProductsTable
        className="mt-4"
        onEditProduct={handleEditBtnClick}
        onDeleteProduct={handleDeleteProduct}
        products={products}
      />
    </section>
  );
};
